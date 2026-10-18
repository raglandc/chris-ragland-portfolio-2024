"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import LogoMarquee from "./LogoMarquee";
import { skillsArray } from "@/data/skills-data";

export default function SkillsSection() {
    const headerRef = useRef(null);
    const quoteRef = useRef(null);
    const marqueeRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });
    const quoteInView = useInView(quoteRef, { once: true });
    const marqueeInView = useInView(marqueeRef, { once: true });
    return (
        <section className="pt-14 pb-12 md:pt-24 md:pb-16 lg:px-0 lg:pb-32 bg-custom-background">
            <div className="flex flex-col items-center max-w-7xl mx-auto px-4 md:px-6 text-center">
                <h2
                    ref={headerRef}
                    style={{
                        transform: headerInView ? "none" : "translateY(50px)",
                        opacity: headerInView ? 1 : 0,
                        transition:
                            "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                    className="my-5 font-semibold text-xl md:text-2xl lg:my-8 font-display"
                >
                    I like to learn 📚
                </h2>
                <p
                    ref={quoteRef}
                    style={{
                        opacity: quoteInView ? 1 : 0,
                        transition:
                            "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                    className="mb-16 md:mb-24 max-w-xl text-custom-textSecondary"
                >
                    I am just a guy that truly enjoys learning. Computer
                    science, math, chemistry, physics, and what it means to be
                    human. My major interests are blockchain and reinforcement
                    learning.
                </p>
                <div
                    ref={marqueeRef}
                    style={{
                        opacity: marqueeInView ? 1 : 0,
                        transition:
                            "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                    className="w-full"
                >
                    <LogoMarquee
                        items={skillsArray}
                        label="Technologies I work with"
                    />
                </div>
            </div>
        </section>
    );
}
