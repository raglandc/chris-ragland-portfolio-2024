"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Pos = { x: number; y: number }; // percent 0..100

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function dist(a: Pos, b: Pos) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export default function ValentinesPage() {
    const [yesClicked, setYesClicked] = useState(false);

    // When false: "No" is a normal inline button next to "Yes"
    // When true: "No" becomes absolute and runs away
    const [noIsFree, setNoIsFree] = useState(false);

    // Start position doesn't matter until it becomes absolute
    const [noPos, setNoPos] = useState<Pos>({ x: 50, y: 55 });
    const noPosRef = useRef(noPos);
    useEffect(() => {
        noPosRef.current = noPos;
    }, [noPos]);

    // Hearts fixed positions so they don't reshuffle on every render
    const hearts = useMemo(() => {
        return Array.from({ length: 22 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 26 + 12,
            opacity: Math.random() * 0.35 + 0.25,
            pulseDelay: Math.random() * 1.5,
        }));
    }, []);

    const moveNoButtonFar = () => {
        // Once she "tries" No, it becomes free forever
        if (!noIsFree) setNoIsFree(true);

        const prev = noPosRef.current;

        // Keep it away from edges so it's clickable-ish (if she ever catches it)
        const MIN = 12;
        const MAX = 88;

        // Require it to jump far from previous spot.
        // This is in percentage units; ~45 is a big move on screen.
        const MIN_DISTANCE = 45;

        let next: Pos = prev;
        let tries = 0;

        while (tries < 60) {
            const candidate: Pos = {
                x: clamp(MIN + Math.random() * (MAX - MIN), MIN, MAX),
                y: clamp(MIN + Math.random() * (MAX - MIN), MIN, MAX),
            };

            if (dist(candidate, prev) >= MIN_DISTANCE) {
                next = candidate;
                break;
            }

            tries++;
        }

        // Fallback: if somehow we couldn't find a far point, flip to opposite quadrant
        if (next === prev) {
            next = {
                x: clamp(100 - prev.x, MIN, MAX),
                y: clamp(100 - prev.y, MIN, MAX),
            };
        }

        setNoPos(next);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-red-200 to-pink-300">
            {/* Background hearts (behind everything) */}
            <div className="absolute inset-0 pointer-events-none">
                {hearts.map((h, i) => (
                    <span
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            top: `${h.top}%`,
                            left: `${h.left}%`,
                            fontSize: `${h.size}px`,
                            opacity: h.opacity,
                            animationDelay: `${h.pulseDelay}s`,
                        }}
                    >
                        ❤️
                    </span>
                ))}
            </div>

            {/* Main card (no hearts inside; it’s opaque-ish so background stays background) */}
            <div className="min-h-screen flex items-center justify-center px-4 z-10">
                <div className="relative text-center bg-white/95 backdrop-blur-md rounded-3xl p-10 shadow-xl max-w-xl w-full">
                    {!yesClicked ? (
                        <>
                            <h1 className="text-4xl font-bold text-pink-600 mb-4">
                                Will you be my Valentine? 💘
                            </h1>

                            <p className="text-gray-600 mb-8">
                                Choose wisely. One option loves you forever.
                            </p>

                            {/* This wrapper is relative so the "No" button can go absolute within the card area */}
                            <div className="relative flex justify-center items-center gap-6 h-28">
                                <button
                                    onClick={() => setYesClicked(true)}
                                    className="px-8 py-3 rounded-full bg-pink-600 text-white font-semibold text-lg hover:bg-pink-700 transition"
                                >
                                    Yes 💖
                                </button>

                                {/* Inline version: starts next to Yes like a normal form */}
                                {!noIsFree ? (
                                    <button
                                        onMouseEnter={moveNoButtonFar}
                                        onMouseDown={moveNoButtonFar}
                                        onTouchStart={moveNoButtonFar}
                                        className="px-8 py-3 rounded-full bg-gray-300 text-gray-700 font-semibold text-lg"
                                    >
                                        No 🙃
                                    </button>
                                ) : (
                                    // Free version: runs away, and always jumps far
                                    <button
                                        onMouseEnter={moveNoButtonFar}
                                        onMouseDown={moveNoButtonFar}
                                        onTouchStart={moveNoButtonFar}
                                        style={{
                                            position: "absolute",
                                            top: `${noPos.y}%`,
                                            left: `${noPos.x}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                        className="px-8 py-3 rounded-full bg-gray-300 text-gray-700 font-semibold text-lg select-none"
                                    >
                                        No 🙃
                                    </button>
                                )}
                            </div>

                            <p className="mt-6 text-sm text-gray-500">
                                P.S. “No” is experiencing… technical
                                difficulties.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold text-pink-600 mb-4">
                                Best decision ever 💞
                            </h2>
                            <p className="text-gray-700 text-lg">
                                I can’t wait to spend Valentine’s Day with you
                                pookie ❤️
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
