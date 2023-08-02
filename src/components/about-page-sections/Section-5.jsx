"use client"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"


export default function SectionFive()
{
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "-20% end"],
  });
  let y = useTransform(scrollYProgress, [0,1], ["0%", "10%"]);
  let opacity = useTransform(scrollYProgress, [0,1], ["100%", "0%"]);

  return (
      <section ref={ref} className="overflow-hidden flex flex-col items-center justify-center h-screen relative">
        <motion.div 
          className="px-4 md:px-6 w-full xl:w-2/4 translate-y-10"
        >
          <h2 className="font-bold rounded-md text-5xl">Whats Next?</h2>
          <p className="text-4xl font-semibold">I plan to continue to learn and grow as a computer scientist.</p>
          <p className="text-4xl font-semibold">Everyday is an opportunity, perhaps an opportunity to change the world.</p>
        </motion.div>
        {/* Myself working in the covid ICU */}
        <motion.div style={{ y, opacity }} className="absolute w-full h-full -z-20 bg-[url('https://images.unsplash.com/photo-1596496638641-e240fd67b4c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtYXRofGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')] bg-cover bg-center">
        </motion.div> 
      </section>
  )
}