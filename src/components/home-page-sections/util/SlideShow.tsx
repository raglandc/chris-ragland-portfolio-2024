"use client"

import { useState, useEffect } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "popmotion"
import { photos } from "../../../../public/info/slide-show-data"

/***
 * variants define the animations of our slide show image
 */
const variants = {
  enter: (direction: number) => {
    return {
      opacity: 0
    };
  },
  center: {
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      opacity: 0
    };
  }
};



export default function SlideShow()
{
  const [isPaused, setIsPaused] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  
  useEffect(() =>
  {
    const intervalId = setInterval(() =>
    {
      if(!isPaused) 
        setImageIndex(wrap(0, photos.length, imageIndex + 1))
    }, 5000);
  
    return () => { clearInterval(intervalId) }
  }, [isPaused, imageIndex]);

  return (
    <div
    className="relative flex justify-center items-center aspect-video min-h-[200px]"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        <motion.img
          src={photos[imageIndex].photoLink} 
          key={photos[imageIndex].photoLink}
          alt={photos[imageIndex].description} 
          variants={variants}
           className="rounded-lg absolute w-full h-full object-cover"
          initial="enter"
          animate="center"
          transition={{duration: .20}}
          exit="exit"
        />
      </AnimatePresence>
      <div className="absolute px-3 place-items-center grid-cols-3 grid -bottom-12">
        <button onClick={() => setImageIndex(wrap(0, photos.length, imageIndex - 1))}>
          <BsArrowLeft className="text-3xl hover:fill-custom-colorPrimary hover:scale-105" />
        </button>
        <div className="mx-3 text-xl">
          {/* The ...toString(2).padStart(3, '0') ensures that the binary is always 3 bits */}
          <p>{(imageIndex + 1).toString(2).padStart(3, '0')} : {imageIndex + 1}</p>
        </div>
        <button onClick={() => setImageIndex(wrap(0, photos.length, imageIndex + 1))}>
          <BsArrowRight className="text-3xl hover:fill-custom-colorPrimary hover:scale-105" />
        </button>
      </div>
    </div>
  )
}
