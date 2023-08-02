"use client"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"


export default function SectionTwo()
{
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "-50% end"],
  });
  let x = useTransform(scrollYProgress, [0,1], ["0%", "50%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["40%", "100%"]);

  return (
      <section ref={ref} className="overflow-hidden my-20 flex flex-col items-center justify-center min-h-screen relative">
        <motion.div 
          className="px-4 md:px-6 w-full xl:w-2/4 translate-y-52"
        >
          <h2 className="font-bold rounded-md text-5xl">2021</h2>
          <p className="text-4xl font-semibold">Sarasota, Fl</p>
          <p className="text-4xl md:w-2/4 font-semibold">Working in the Covid ICU during the Delta variant.</p>
        </motion.div>
        {/* Myself working in the covid ICU */}
        <motion.div style={{ x, y : "30%", opacity }} className="absolute md:rounded-xl w-full md:w-2/4 h-full -z-20 bg-[url('/img/about-images/covid-icu.webp')] bg-cover bg-center">
        </motion.div> 
      </section>
  )
}