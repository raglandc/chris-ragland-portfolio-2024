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
    offset: ["end start", "-20% end"],
  });
  let y = useTransform(scrollYProgress, [0,1], ["0%", "50%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["100%", "0%"]);

  return (
      <section ref={ref} className="overflow-hidden py-20 relative flex flex-col items-center justify-center h-screen">
        <motion.div 
          style={{opacity}}
          className="px-4 md:px-6 w-full xl:w-2/4 translate-y-20"
        >
          <h2 className="font-bold rounded-md text-5xl">2022</h2>
          <p className="text-4xl font-semibold">I continue working on side projects and learning.</p>
          <p className="text-4xl font-semibold">In August, I transfer to USF, leaving behind my days as an EMT.</p>
        </motion.div>
        {/* Myself working in the covid ICU */}
        <motion.div style={{ y, opacity }} className="absolute xl:rounded-xl w-full h-full -z-20 bg-[url('https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80')] bg-cover bg-no-repeat bg-center">
        <div className="w-full h-full bg-black/30"/>
        </motion.div> 
      </section>
  )
}