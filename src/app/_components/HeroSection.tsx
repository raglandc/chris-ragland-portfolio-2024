"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typewriter from "typewriter-effect";
import ScrambleText from "@/components/animation/ScrambleText";
import NetworkBackground from "@/components/animation/NetworkBackground";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Slow, deliberate reveal: the name cycles through hex while the hero fades
// in, then resolves left to right at a readable pace.
const HERO_SCRAMBLE = {
    revealDelay: 900,
    revealRate: 6,
    settleDuration: 700,
};
// Start "Ragland" once "Chris" has resolved so it reads as one wave.
const RAGLAND_REVEAL_DELAY =
    HERO_SCRAMBLE.revealDelay + ("Chris".length * 1000) / HERO_SCRAMBLE.revealRate;

// Matches Tailwind's `md` breakpoint, where the video replaces the banner.
const VIDEO_MEDIA_QUERY = "(min-width: 768px)";

// Only fetches and plays the video where it is visible, holds it still for
// reduced motion, pauses it once scrolled away, and fades it in on first frame.
function HeroVideo({ reduceMotion }: { reduceMotion: boolean }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const mediaQueryList = window.matchMedia(VIDEO_MEDIA_QUERY);
        let inView = true;

        const sync = () => {
            if (!mediaQueryList.matches) {
                video.pause();
                return;
            }
            // Load even under reduced motion so a still frame shows.
            if (video.preload === "none") video.preload = "auto";
            if (inView && !reduceMotion) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        };

        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            sync();
        });
        observer.observe(video);
        mediaQueryList.addEventListener("change", sync);
        sync();

        return () => {
            observer.disconnect();
            mediaQueryList.removeEventListener("change", sync);
        };
    }, [reduceMotion]);

    return (
        <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setReady(true)}
            className={`hidden md:block h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
                ready ? "opacity-80" : "opacity-0"
            }`}
        >
            <source src="/img/landing-page-video.webm" type="video/webm" />
        </video>
    );
}

export default function HeroSection() {
    const ref = useRef<HTMLElement | null>(null);
    const reduceMotion = usePrefersReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    // The video drifts down under the next section, so it has faded out
    // before its visible part reaches that section's opaque top edge.
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="flex flex-col relative pb-8 bg-custom-background -z-10"
        >
            <motion.div
                aria-hidden
                style={reduceMotion ? undefined : { y, opacity }}
                className="absolute -top-14 bg-custom-background -z-10 inset-0 will-change-transform"
            >
                {/* Pinned to the top-right corner and filled edge to edge, so
                    the mask fade always lands on the video's own edges. */}
                <div className="hero-media-mask absolute top-0 right-0 h-full w-full md:w-[60%]">
                    <HeroVideo reduceMotion={reduceMotion} />
                    <div className='md:hidden h-full w-full bg-[url("/img/banner.webp")] bg-contain bg-top bg-no-repeat' />
                </div>
            </motion.div>

            <NetworkBackground className="absolute inset-0 h-full w-full hero-network-mask" />

            <div className="relative mb-12 mt-64 md:mt-28 lg:my-28 lg:py-2">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}
                    className="mx-auto w-full max-w-7xl px-4 md:px-6"
                >
                    <h1 className="text-4xl md:text-5xl font-semibold font-display">
                        Hi,
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-semibold font-display">
                        {" "}
                        my name is{" "}
                    </h1>
                    <h1 className="pb-1 text-6xl font-black tracking-tighter text-transparent md:text-8xl animate-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text font-display">
                        <ScrambleText text="Chris" {...HERO_SCRAMBLE} />{" "}
                        <span className="hidden sm:contents">
                            <ScrambleText
                                text="Ragland"
                                {...HERO_SCRAMBLE}
                                revealDelay={RAGLAND_REVEAL_DELAY}
                            />
                        </span>
                    </h1>
                    <h1 className="w-10/12 pb-1 text-6xl font-black tracking-tighter text-transparent sm:hidden md:text-8xl animate-text bg-gradient-to-l from-blue-600 via-indigo-600 to-blue-600 bg-clip-text font-display">
                        <ScrambleText
                            text="Ragland"
                            {...HERO_SCRAMBLE}
                            revealDelay={RAGLAND_REVEAL_DELAY}
                        />
                    </h1>
                    <h2 className="text-4xl my-8 sm:text-5xl text-custom-textSecondary font-display">
                        <Typewriter
                            options={{
                                strings: [
                                    "scientist.",
                                    "engineer.",
                                    "coffee ❤️'er.",
                                ],
                                autoStart: true,
                                loop: true,
                                cursor: "_",
                            }}
                        />
                    </h2>
                    <p className="mt-8 max-w-lg space-y-6 text-lg md:max-w-xl lg:text-xl text-custom-textSecondary">
                        I am currently a software engineer based in Tampa
                        Florida. Welcome to my website, take a look around
                        to learn more about me.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
