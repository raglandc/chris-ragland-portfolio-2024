"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Typewriter from 'typewriter-effect'

import SkillsSection from "@/components/home-page-sections/SkillsSection"
import ProjectCardsSection from '@/components/home-page-sections/ProjectCardsSection'
import SlideShowSection from "@/components/home-page-sections/SlideShowSection"

export default function Home() {
  let ref = useRef<HTMLElement | null>(null);
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"])
  let opacity = useTransform(scrollYProgress, [0, 1], [1, 0])


  return (
    <main className='w-full'>
      <section ref={ref} className='flex flex-col relative pb-8 bg-custom-background -z-10'>

        {/* trying to get video background banner playing */}
        <motion.div style={{ y, opacity }} className='absolute -top-14 bg-custom-background -z-10 inset-0'>
          <div className='absolute inset-x-0 top-0 max-w-[1280px] h-full overflow-hidden lg:bottom-auto lg:right-0 lg:left-auto lg:w-[80%]'>
            <video
              muted
              loop
              autoPlay
              className='hidden md:block w-full md:aspect-video object-cover object-center absolute opacity-80' 
            >
              <source src="/img/landing-page-video.webm" type='video/mp4'/>
            </video>

            <div
              className='md:hidden w-full aspect-square bg-[url("/img/banner.webp")] bg-contain bg-no-repeat bg-center'
            />

            <div 
              className='absolute -inset-px to-custom-background opacity-50'
            />
            <div 
              className='absolute -inset-px hidden lg:block bg-gradient-to-l from-transparent via-transparent to-custom-background'
            />
            <div 
              className='absolute -inset-px bg-gradient-to-b from-transparent via-transparent to-custom-background'
            />

          </div>
        </motion.div> 


        <div className='mb-12 mt-64 md:mt-28 lg:my-28 lg:py-2'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            className='mx-auto w-full max-w-7xl px-4 md:px-6'
          >
            <h1 className='text-4xl md:text-5xl font-semibold'>Hi,</h1>
            <h1 className='text-4xl md:text-5xl font-semibold'> my name is </h1>
            <h1 className='pb-1 text-5xl font-black text-transparent sm:text-6xl animate-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text'>
              Chris <span className='hidden sm:contents'>Ragland</span>
            </h1>
            <h1 className='w-10/12 pb-1 text-5xl font-black text-transparent sm:hidden sm:text-6xl animate-text bg-gradient-to-l from-blue-600 via-indigo-600 to-blue-600 bg-clip-text'>
              Ragland
            </h1>
            <h2 className='text-4xl my-8 sm:text-5xl text-custom-textSecondary'>
              <Typewriter
                options={{
                  strings: ['student.', 'developer.', "coffee ❤️'er."],
                  autoStart: true,
                  loop: true,
                  cursor: '_',
                }}
              />
            </h2>
            <p className='mt-8 max-w-lg space-y-6 text-lg md:max-w-xl lg:text-xl text-custom-textSecondary'>I am currently studying Computer Science at the University of South Florida. Welcome to my website, take a look around to learn more about me.</p>
          </motion.div>
        </div>
      </section>

      <SkillsSection />
      <ProjectCardsSection />
      <SlideShowSection />
    
    </main>
  )
}
