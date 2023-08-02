"use client"

import { useRef } from "react"
import { useInView } from 'framer-motion'

import SlideShow from "./util/SlideShow";

export default function SlideShowSection()
{
  const headerRef = useRef<any>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className='my-14 pb-12 md:pt-24 md:pb-16 lg:px-0 lg:pb-32 '>
      <div className="mx-auto px-4 md:px-6 max-w-7xl">
        <h2 
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transition: 'all 2s ease-in-out',
          }}
          className='w-full my-5 lg:my-8 font-semibold text-xl md:text-2xl'>
              A look at Chris&apos; life
              👀
        </h2>
        <SlideShow />
      </div>
    </section>
  )
}