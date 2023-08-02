"use client"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"


export default function SectionOne()
{
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "end end"],
  });
  let y = useTransform(scrollYProgress, [0,1], ["0%", "50%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["0%", "90%"]);

  return (
      <section ref={ref} className="text-white flex flex-col justify-end h-screen mx-auto px-4 md:px-6 relative">

        {/* covid cell in background */}
        <motion.div style={{opacity}}>
          <h2 
            className="font-bold rounded-md w-max text-5xl"
          >
            October, 2020
          </h2>
          <p className="text-4xl font-semibold">
            The Covid-19 pandemic is on the rise.
          </p>
          <p className="text-4xl font-semibold">
            I begin my coding journey while working at the hospital. 
          </p>
        </motion.div>
        <motion.div 
          style={{ y, opacity }} 
          className="w-full h-full -z-20 absolute left-0 bg-[url('https://images.unsplash.com/flagged/photo-1584036561584-b03c19da874c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvdmlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')] bg-cover bg-center"
        >
          <div className="w-full h-full bg-black/40"/>
        </motion.div> 
      </section>
  )
}