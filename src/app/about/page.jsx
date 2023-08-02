"use client"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

import SectionOne from "@/components/about-page-sections/Section-1";
import SectionTwo from "@/components/about-page-sections/Section-2"
import SectionThree from "@/components/about-page-sections/Section-3"
import SectionFour from "@/components/about-page-sections/Section-4"
import SectionFive from "@/components/about-page-sections/Section-5"

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
    <main className="w-full relative text-white">
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 -z-40 bg-black"
      />
      {/* introduction */}
      <section 
        ref={introductionRef}
        className="relative flex mb-32 flex-col items-center justify-center h-screen">

        <motion.div style={{ y, opacity }} className="w-full -z-20 -top-14 h-full absolute bg-[url('/img/about-images/computer-chip.webp')] bg-cover bg-center">
          <div className="w-full h-full bg-black/50"/>
        </motion.div>

        <h1 className="font-bold text-custom-colorPrimary text-4xl">Hi, my names Chris</h1>
        <h2 className="font-bold text-custom-textSecondary text-xl">and this is (part of) my story...</h2>

      </section>

      {/* Begin Coding Journey */}
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </main>
  )
}