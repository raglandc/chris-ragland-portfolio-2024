"use client"

import { useScroll, motion, useSpring } from "framer-motion"
export default function PageProgressBar()
{
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="bg-custom-colorPrimary opacity-70 h-[5px] fixed top-0 left-0 right-0 origin-[0]"
      style={{ scaleX }}
    />
  )
}