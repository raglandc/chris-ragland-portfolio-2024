"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typewriter from "typewriter-effect";
import ScrambleText from "@/components/animation/ScrambleText";
import NetworkBackground from "./NetworkBackground";

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

export default function HeroSection() {
    const ref = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={ref}
            className="flex flex-col relative pb-8 bg-custom-background -z-10"
        >
            <motion.div
                style={{ y, opacity }}
                className="absolute -top-14 bg-custom-background -z-10 inset-0 will-change-transform"
            >
                <div className="absolute inset-x-0 top-0 max-w-[1280px] h-full overflow-hidden lg:bottom-auto lg:right-0 lg:left-auto lg:w-[80%]">
                    <video
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="hidden md:block w-full md:aspect-video object-cover object-center absolute opacity-80"
                    >
                        <source
                            src="/img/landing-page-video.webm"
                            type="video/webm"
                        />
                    </video>

                    <div className='md:hidden w-full aspect-square bg-[url("/img/banner.webp")] bg-contain bg-no-repeat bg-center' />

                    <div className="absolute -inset-px hidden lg:block bg-gradient-to-l from-transparent via-transparent to-custom-background" />
                    <div className="absolute -inset-px bg-gradient-to-b from-transparent via-transparent to-custom-background" />
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
