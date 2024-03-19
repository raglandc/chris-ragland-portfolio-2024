"use client"
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

export default function AboutPage()
{
  const introductionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: introductionRef,
    offset: ["start start", "end 25%"],
  });
  let y = useTransform(scrollYProgress, [0,1], ["0%", "50%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["100%", "-20%"]);

  return (
    <main className="w-full relative">
      {/* introduction */}
      <section 
        ref={introductionRef}
        className="relative flex mb-32 flex-col items-center justify-center h-screen">

        <motion.div style={{ y, opacity }} className="w-full -z-20 -top-14 h-full absolute bg-[url('/img/about-images/computer-chip.webp')] bg-cover bg-center">
          <div className="w-full h-full bg-black/50"/>
        </motion.div>

        <h1 className="font-bold text-custom-colorPrimary text-4xl md:text-6xl">Hi, my names Chris</h1>
        <h2 className="font-bold text-custom-textSecondary text-xl md:text-2xl">and this is (part of) my story...</h2>

      </section>

      <section 
        className="px-4 md:px-6 max-w-7xl space-y-4 my-10 mx-auto"
      >
        <Image
          className="rounded-xl mx-auto"
          src="/img/about-images/headshot.jpg"
          alt="Photo head-shot of Chris Ragland"
          width={350}
          height={475}
        />
        <div className="space-y-3">
          <h1
            className="font-semibold text-2xl"
          >
            About <span className="text-custom-colorPrimary font-bold">Chris</span>
          </h1>
          <p>Chris was born and raised (for the most part) in Indiana. It was not until he turned 19, Chris moved to Florida where he would begin university working towards his dream of solving interesting problems, writing code, and spending his days learning.</p>
          <p>
            Chris is currently working towards his bachelors in Computer Science at the University of South Florida.
          </p>
        </div>
      </section>

      <section
        className="px-4 md:px-6 max-w-7xl space-y-4 mx-auto mb-20"
      >
        <h1 className="font-semibold text-2xl">Education</h1>
        <div className="flex justify-between">
          <p className="font-semibold">BS in Computer Science</p>
          <p>Aug 2022 - Dec 2024</p>
        </div>
        <p>University of South Florida - Tampa, Florida</p>
        <p><span className="font-semibold">GPA:</span> 4.0 / 4.0</p>
      </section>
    </main>
  )
}