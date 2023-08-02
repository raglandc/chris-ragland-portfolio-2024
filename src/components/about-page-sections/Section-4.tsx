"use client"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"


export default function SectionFour()
{
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "-20% end"],
  });
  let y = useTransform(scrollYProgress, [0,1], ["-20%", "50%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["90%", "70%"]);

  return (
      <section ref={ref} className="overflow-hidden relative flex flex-col items-center justify-center h-screen">
        <motion.div 
          style={{opacity}}
          className="px-4 md:px-6 w-full xl:w-2/4 translate-y-20"
        >
          <h2 className="font-bold rounded-md text-5xl">2023</h2>
          <p className="text-4xl font-semibold">Currently I am studying Computer Science at the University of South Florida</p>
          <p className="text-4xl font-semibold">My planned graduation date is December of 2024.</p>
        </motion.div>
        {/* Myself working in the covid ICU */}
        <motion.div style={{ y, opacity }} className="absolute top-0 left-0 right-0 bottom-0 -z-20 bg-[url('https://www.commonapp.org/static/1e1926c8853882a335b0fdff90743885/university-south-florida_1108.jpg')] bg-cover bg-center">
        <div className="w-full h-full bg-black/30"/>
        </motion.div> 
      </section>
  )
}