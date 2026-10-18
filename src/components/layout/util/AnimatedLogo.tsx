"use client";

import { useEffect, useRef } from "react";
import { animate, createDrawable, createScope, stagger } from "animejs";
import { animeScopeMediaQueries } from "@/lib/animation";

// Monoline trace of /icons/cr-favicon.png so the letters can be drawn as
// strokes. Rendered fully drawn on the server, then animated on first load.
export default function AnimatedLogo() {
    const rootRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const scope = createScope({
            root: rootRef,
            mediaQueries: animeScopeMediaQueries,
        }).add((self) => {
            if (self?.matches.reduceMotion) return;

            animate(createDrawable(".logo-stroke"), {
                draw: ["0 0", "0 1"],
                duration: 900,
                delay: stagger(450, { start: 200 }),
                ease: "inOutQuad",
            });
        });

        return () => scope.revert();
    }, []);

    return (
        <svg
            ref={rootRef}
            viewBox="0 0 512 500"
            width={27}
            height={27}
            fill="none"
            stroke="currentColor"
            strokeWidth={40}
            strokeLinejoin="miter"
            className="text-blue-700"
            role="img"
            aria-label="the letters c and r"
        >
            <path className="logo-stroke" d="M256 93 A120 132 0 1 0 242 240" />
            <path
                className="logo-stroke"
                d="M275 510 V227 H395 C440 227 455 255 455 288 C455 322 440 350 395 350 H275 M372 350 L478 510"
            />
        </svg>
    );
}
