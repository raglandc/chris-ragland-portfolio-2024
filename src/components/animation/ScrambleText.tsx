"use client";

import { useEffect, useRef } from "react";
import {
    animate,
    createScope,
    onScroll,
    scrambleText,
    type JSAnimation,
} from "animejs";
import { animeScopeMediaQueries, HEX_CHARS } from "@/lib/animation";

type ScrambleTrigger = "mount" | "inView" | "hover";

interface ScrambleTextProps {
    text: string;
    // mount: plays once on load. inView: plays once when scrolled into view.
    // hover: replays whenever the closest link/button is hovered or focused.
    trigger?: ScrambleTrigger;
    // Shows the real text, waits, then scrambles. Use revealDelay instead to
    // keep the text scrambled from the first frame before it resolves.
    delay?: number;
    revealDelay?: number;
    // Characters resolved per second; lower is slower (anime.js default: 60).
    revealRate?: number;
    // Time in ms each character scrambles before settling (default: 300).
    settleDuration?: number;
    chars?: string;
    className?: string;
}

export default function ScrambleText({
    text,
    trigger = "mount",
    delay = 0,
    revealDelay,
    revealRate,
    settleDuration,
    chars = HEX_CHARS,
    className = "",
}: ScrambleTextProps) {
    const rootRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const el = textRef.current;
        if (!root || !el) return;

        const scope = createScope({
            root: rootRef,
            mediaQueries: animeScopeMediaQueries,
        }).add((self) => {
            if (self?.matches.reduceMotion) return;

            const params = {
                textContent: scrambleText({
                    chars,
                    delay,
                    revealDelay,
                    revealRate,
                    settleDuration,
                }),
            };

            if (trigger === "mount") {
                animate(el, params);
                return;
            }

            if (trigger === "inView") {
                animate(el, {
                    ...params,
                    autoplay: onScroll({
                        target: root,
                        enter: "85% top",
                        repeat: false,
                    }),
                });
                return;
            }

            const hoverTarget = root.closest("a, button") ?? root;
            let current: JSAnimation | null = null;
            const play = () => {
                if (current && !current.completed) return;
                current = animate(el, params);
            };
            hoverTarget.addEventListener("pointerenter", play);
            hoverTarget.addEventListener("focus", play);
            return () => {
                hoverTarget.removeEventListener("pointerenter", play);
                hoverTarget.removeEventListener("focus", play);
            };
        });

        return () => {
            scope.revert();
            // Never leave scrambled characters behind if we unmount mid-reveal.
            el.textContent = text;
        };
    }, [text, trigger, delay, revealDelay, revealRate, settleDuration, chars]);

    // The invisible pseudo-element reserves the final text's width so the
    // scrambled glyphs, which are a different width, never cause layout
    // shift. Using ::before keeps the copy out of the DOM text, so crawlers,
    // screen readers and copy/paste only ever see the text once.
    return (
        <span ref={rootRef} className={`inline-grid ${className}`}>
            <span
                aria-hidden="true"
                data-text={text}
                className="invisible whitespace-pre [grid-area:1/1] before:content-[attr(data-text)]"
            />
            <span
                key={text}
                ref={textRef}
                className="w-0 min-w-full whitespace-pre [grid-area:1/1]"
            >
                {text}
            </span>
        </span>
    );
}
