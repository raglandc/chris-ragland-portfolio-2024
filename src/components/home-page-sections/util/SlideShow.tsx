"use client";

import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { photos } from "../../../../public/info/slide-show-data";

const variants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
};

export default function SlideShow() {
    const [isPaused, setIsPaused] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isPaused)
                setImageIndex(wrap(0, photos.length, imageIndex + 1));
        }, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [isPaused, imageIndex]);

    return (
        <>
            <style>{`
        @keyframes slideshow-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

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
                        className="rounded-xl absolute w-full h-full object-cover"
                        initial="enter"
                        animate="center"
                        transition={{ duration: 0.3 }}
                        exit="exit"
                    />
                </AnimatePresence>

                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-white/20 rounded-t-xl overflow-hidden">
                    <div
                        key={imageIndex}
                        style={{
                            animation: "slideshow-progress 5s linear forwards",
                            animationPlayState: isPaused ? "paused" : "running",
                            transformOrigin: "left center",
                        }}
                        className="h-full bg-white/80"
                    />
                </div>

                {/* Left arrow */}
                <button
                    onClick={() =>
                        setImageIndex(wrap(0, photos.length, imageIndex - 1))
                    }
                    className="absolute left-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white backdrop-blur-sm transition-colors duration-150"
                    aria-label="Previous photo"
                >
                    <BsArrowLeft className="text-base" />
                </button>

                {/* Right arrow */}
                <button
                    onClick={() =>
                        setImageIndex(wrap(0, photos.length, imageIndex + 1))
                    }
                    className="absolute right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white backdrop-blur-sm transition-colors duration-150"
                    aria-label="Next photo"
                >
                    <BsArrowRight className="text-base" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 z-10 flex items-center gap-1.5">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setImageIndex(i)}
                            aria-label={`Go to photo ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === imageIndex
                                    ? "w-5 bg-white"
                                    : "w-1.5 bg-white/50 hover:bg-white/75"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
