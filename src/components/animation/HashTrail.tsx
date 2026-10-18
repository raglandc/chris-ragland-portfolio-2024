"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, scrambleText } from "animejs";
import { animeScopeMediaQueries, HEX_CHARS } from "@/lib/animation";
import { createHashFragment } from "@/lib/hex";

// Fixed pool of reusable fragments, so moving the mouse never creates DOM
// nodes or re-renders React; the oldest fragment is recycled first.
const POOL_SIZE = 24;
// Distance the cursor must travel before dropping the next fragment.
const SPAWN_DISTANCE = 48;
const JITTER = 10;
const FALL_DISTANCE = 36;
const DURATION = 1000;

const mediaQueries = {
    ...animeScopeMediaQueries,
    // Only devices with a real hovering cursor (no touch screens).
    finePointer: "(hover: hover) and (pointer: fine)",
};

// Small hex fragments drop off behind the cursor as it moves, scrambling as
// they fall and fade. Purely decorative: hidden from assistive tech, never
// intercepts clicks, and disabled for touch or reduced motion.
export default function HashTrail() {
    const rootRef = useRef<HTMLDivElement>(null);
    const fragmentRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const scope = createScope({ root: rootRef, mediaQueries }).add(
            (self) => {
                if (!self) return;
                if (self.matches.reduceMotion || !self.matches.finePointer) {
                    return;
                }

                // Registered on the scope so every animation it starts is
                // reverted along with the scope.
                self.add("drop", (fragment: HTMLSpanElement, x: number, y: number) => {
                    const text = createHashFragment();
                    const startX = x + random(-JITTER, JITTER);
                    const startY = y + random(4, JITTER + 4);
                    animate(fragment, {
                        x: [startX, startX + random(-JITTER, JITTER)],
                        y: [startY, startY + FALL_DISTANCE],
                        opacity: [0.85, 0],
                        textContent: scrambleText({
                            text,
                            chars: HEX_CHARS,
                            duration: DURATION * 0.6,
                        }),
                        duration: DURATION,
                        ease: "inQuad",
                    });
                });

                let last: { x: number; y: number } | null = null;
                let next = 0;

                const onPointerMove = (event: PointerEvent) => {
                    if (event.pointerType === "touch") return;
                    const { clientX: x, clientY: y } = event;
                    if (last && Math.hypot(x - last.x, y - last.y) < SPAWN_DISTANCE) {
                        return;
                    }
                    last = { x, y };

                    const fragment = fragmentRefs.current[next];
                    next = (next + 1) % POOL_SIZE;
                    if (fragment) self.methods.drop(fragment, x, y);
                };

                window.addEventListener("pointermove", onPointerMove, {
                    passive: true,
                });
                return () =>
                    window.removeEventListener("pointermove", onPointerMove);
            }
        );

        return () => scope.revert();
    }, []);

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
            {Array.from({ length: POOL_SIZE }, (_, index) => (
                <span
                    key={index}
                    ref={(el) => {
                        fragmentRefs.current[index] = el;
                    }}
                    className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] text-blue-500 opacity-0"
                />
            ))}
        </div>
    );
}

function random(min: number, max: number) {
    return min + Math.random() * (max - min);
}
