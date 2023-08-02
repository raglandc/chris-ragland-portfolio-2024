"use client"

import { useEffect } from "react"
import { 
  Variants,
  motion,
  useAnimationControls, 
  useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const isBrowser = () => typeof window !== "undefined";

function scrollToTop()
{
  if (!isBrowser) return;
  window.scrollTo({top: 0, behavior: "smooth"});
}

const ScrollToTopContainerVariants: Variants = 
{
  hide: { opacity: 0, y: 0 },
  show: { opacity: .75, y: 0 },
}

export default function ScrollToTop()
{
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => 
  {
    return scrollYProgress.on("change", (latestValue) => {
      if (latestValue > 0.30)
      {
        controls.start("show");
      }
      else
      {
        controls.start("hide");
      }
    })
  })

  return (
    <motion.button 
      aria-label="Scroll to top button"
      title="Scroll to top button"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={() => scrollToTop()} 
      className='fixed flex flex-col items-center text-white bottom-2 right-2 rounded-full p-4 bg-custom-colorPrimary'
    >
      <FaArrowUp className="text-xl"/>
    </motion.button>
  )
}