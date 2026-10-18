"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { clamp } from "@/lib/math";

type PeerNode = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    // When a broadcast reached this node (performance.now() ms).
    activatedAt: number;
};

// A broadcast traveling along one link, from a node to its neighbor.
type Hop = {
    from: number;
    to: number;
    start: number;
};

const NODES_PER_PX = 1 / 16000;
const MIN_NODES = 24;
const MAX_NODES = 90;
const LINK_DISTANCE = 130;
const CURSOR_DISTANCE = 180;
// Drift speed range in px per ms.
const MIN_SPEED = 0.006;
const MAX_SPEED = 0.018;
const HOP_DURATION = 140;
const PULSE_DURATION = 700;
// Avoids a big jump after the tab was in the background.
const MAX_FRAME_DELTA = 50;
// Primary is the same in light and dark mode, so it is read once.
const FALLBACK_RGB = "59, 130, 246";

// A drifting peer-to-peer network drawn on a canvas. Nearby peers link to the
// cursor, and a click broadcasts a pulse hop by hop from the peer closest to
// it. The loop only runs while the canvas is on screen; with reduced motion a
// single static frame is drawn instead.
export default function NetworkBackground({ className = "" }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const rgb =
            getComputedStyle(document.documentElement)
                .getPropertyValue("--primary-color")
                .trim() || FALLBACK_RGB;
        const color = (alpha: number) => `rgba(${rgb}, ${alpha})`;

        let width = 0;
        let height = 0;
        let nodes: PeerNode[] = [];
        let hops: Hop[] = [];
        // Pointer position in viewport (client) coordinates.
        let pointer: { x: number; y: number } | null = null;
        let frame = 0;
        let lastTime = 0;
        let isOnScreen = false;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Keep existing peers so mobile toolbar resizes don't reshuffle
            // the whole network; just match the count to the new area.
            const target = clamp(
                Math.round(width * height * NODES_PER_PX),
                MIN_NODES,
                MAX_NODES
            );
            nodes = nodes.slice(0, target);
            for (const node of nodes) {
                node.x = Math.min(node.x, width);
                node.y = Math.min(node.y, height);
            }
            while (nodes.length < target) nodes.push(createNode(width, height));
            hops = [];

            if (reduceMotion) draw(performance.now());
        };

        const step = (delta: number) => {
            for (const node of nodes) {
                node.x += node.vx * delta;
                node.y += node.vy * delta;
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
                node.x = clamp(node.x, 0, width);
                node.y = clamp(node.y, 0, height);
            }
        };

        const draw = (now: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = distance(nodes[i], nodes[j]);
                    if (d > LINK_DISTANCE) continue;
                    ctx.strokeStyle = color((1 - d / LINK_DISTANCE) * 0.18);
                    line(ctx, nodes[i], nodes[j]);
                }
            }

            const rect = canvas.getBoundingClientRect();
            const cursor = pointer && {
                x: pointer.x - rect.left,
                y: pointer.y - rect.top,
            };

            for (const node of nodes) {
                const cursorDistance = cursor ? distance(node, cursor) : Infinity;
                const nearCursor = cursorDistance < CURSOR_DISTANCE;
                if (cursor && nearCursor) {
                    ctx.strokeStyle = color(
                        (1 - cursorDistance / CURSOR_DISTANCE) * 0.45
                    );
                    line(ctx, node, cursor);
                }

                const pulse = 1 - (now - node.activatedAt) / PULSE_DURATION;
                const isPulsing = pulse > 0 && pulse <= 1;
                const radius = 1.5 + (nearCursor ? 1 : 0) + (isPulsing ? pulse * 2.5 : 0);
                ctx.fillStyle = color(0.5 + (isPulsing ? pulse * 0.5 : 0));
                circle(ctx, node, radius);
                ctx.fill();

                if (isPulsing) {
                    ctx.strokeStyle = color(pulse * 0.5);
                    circle(ctx, node, 4 + (1 - pulse) * 8);
                    ctx.stroke();
                }
            }

            hops = hops.filter((hop) => now < hop.start + HOP_DURATION);
            for (const hop of hops) {
                const progress = (now - hop.start) / HOP_DURATION;
                if (progress < 0) continue;
                const from = nodes[hop.from];
                const to = nodes[hop.to];
                if (!from || !to) continue;
                ctx.strokeStyle = color(0.5);
                line(ctx, from, to);
                ctx.fillStyle = color(0.9);
                circle(ctx, {
                    x: from.x + (to.x - from.x) * progress,
                    y: from.y + (to.y - from.y) * progress,
                }, 2);
                ctx.fill();
            }
        };

        const tick = (now: number) => {
            step(Math.min(now - lastTime, MAX_FRAME_DELTA));
            lastTime = now;
            draw(now);
            frame = requestAnimationFrame(tick);
        };

        const start = () => {
            if (reduceMotion || frame) return;
            lastTime = performance.now();
            frame = requestAnimationFrame(tick);
        };

        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        // Breadth-first broadcast: each peer relays to its linked neighbors
        // one hop later, like a transaction gossiping across a network.
        const broadcast = (origin: number, now: number) => {
            const reachedAt = new Map([[origin, now]]);
            nodes[origin].activatedAt = now;
            const queue = [origin];
            while (queue.length > 0) {
                const from = queue.shift()!;
                const time = reachedAt.get(from)!;
                for (let to = 0; to < nodes.length; to++) {
                    if (reachedAt.has(to)) continue;
                    if (distance(nodes[from], nodes[to]) > LINK_DISTANCE) continue;
                    reachedAt.set(to, time + HOP_DURATION);
                    nodes[to].activatedAt = time + HOP_DURATION;
                    hops.push({ from, to, start: time });
                    queue.push(to);
                }
            }
        };

        const onClick = (event: MouseEvent) => {
            if (!isOnScreen || nodes.length === 0) return;
            const rect = canvas.getBoundingClientRect();
            const point = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            if (point.x < 0 || point.y < 0 || point.x > width || point.y > height) {
                return;
            }
            broadcast(nearestNode(nodes, point), performance.now());
        };

        const onPointerMove = (event: PointerEvent) => {
            // Touch has no hover, so only mouse and pen follow the pointer.
            if (event.pointerType === "touch") return;
            pointer = { x: event.clientX, y: event.clientY };
        };
        const onPointerLeave = () => {
            pointer = null;
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            isOnScreen = entry.isIntersecting;
            if (isOnScreen) start();
            else stop();
        });
        intersectionObserver.observe(canvas);

        if (!reduceMotion) {
            window.addEventListener("click", onClick);
            window.addEventListener("pointermove", onPointerMove, { passive: true });
            document.documentElement.addEventListener("pointerleave", onPointerLeave);
        }

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener("click", onClick);
            window.removeEventListener("pointermove", onPointerMove);
            document.documentElement.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [reduceMotion]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none ${className}`}
        />
    );
}

type Point = { x: number; y: number };

function createNode(width: number, height: number): PeerNode {
    const angle = Math.random() * Math.PI * 2;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        activatedAt: -Infinity,
    };
}

function nearestNode(nodes: PeerNode[], point: Point) {
    let nearest = 0;
    for (let i = 1; i < nodes.length; i++) {
        if (distance(nodes[i], point) < distance(nodes[nearest], point)) {
            nearest = i;
        }
    }
    return nearest;
}

function distance(a: Point, b: Point) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function line(ctx: CanvasRenderingContext2D, a: Point, b: Point) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function circle(ctx: CanvasRenderingContext2D, center: Point, radius: number) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
}
