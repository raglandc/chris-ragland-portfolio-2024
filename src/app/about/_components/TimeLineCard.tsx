"use client";

import { ReactNode, useEffect, useRef } from "react";
import { animate, createDrawable, createScope, onScroll } from "animejs";
import ScrambleText from "@/components/animation/ScrambleText";
import { animeScopeMediaQueries } from "@/lib/animation";

interface TimeLineCardProps {
    year: string;
    children: ReactNode;
}

export default function TimeLineCard({ year, children }: TimeLineCardProps) {
    const isCurrent = year === "Current";
    const trackRef = useRef<HTMLDivElement>(null);

    // Draw this card's segment of the timeline as it scrolls past the middle
    // of the viewport, so the line "follows" the reader down the page.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const scope = createScope({
            root: trackRef,
            mediaQueries: animeScopeMediaQueries,
        }).add((self) => {
            if (self?.matches.reduceMotion) return;

            animate(createDrawable("line"), {
                draw: ["0 0", "0 1"],
                ease: "linear",
                autoplay: onScroll({
                    target: track,
                    enter: "center top",
                    leave: "center bottom",
                    sync: true,
                }),
            });
        });

        return () => scope.revert();
    }, []);

    return (
        <div className="relative flex gap-8 pb-16 last:pb-0">
            {/* Left: line + node */}
            <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative mt-1.5 w-3 h-3 rounded-full bg-custom-colorPrimary flex-shrink-0">
                    {isCurrent && (
                        <div className="absolute inset-0 rounded-full bg-custom-colorPrimary animate-ping opacity-60" />
                    )}
                </div>
                <div
                    ref={trackRef}
                    className="relative flex-1 w-px bg-custom-colorPrimary/25 mt-2"
                >
                    {/* No viewBox: percentage coords keep the SVG unscaled,
                        which createDrawable's dash math relies on. */}
                    <svg
                        className="absolute inset-0 h-full w-full overflow-visible text-custom-colorPrimary"
                        aria-hidden="true"
                    >
                        <line
                            x1="50%"
                            y1="0"
                            x2="50%"
                            y2="100%"
                            stroke="currentColor"
                            strokeWidth={1}
                        />
                    </svg>
                </div>
            </div>

            {/* Right: year + content */}
            <div className="flex-1 min-w-0">
                <span
                    className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                        isCurrent
                            ? "bg-custom-colorPrimary text-white"
                            : "bg-custom-colorPrimary/10 text-custom-colorPrimary"
                    }`}
                >
                    <ScrambleText
                        text={isCurrent ? "Present" : year}
                        trigger="inView"
                    />
                </span>
                <div className="prose dark:prose-invert max-w-none">{children}</div>
            </div>
        </div>
    );
}
