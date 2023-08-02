"use client"

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import ProjectCardIndex from './util/ProjectCardIndex'
import { workArrayIndexPage } from "../../../public/info/project-card-data"

export default function ProjectCardsSection() {
  const headerRef = useRef(null)
  const groupRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })
  const groupInView = useInView(groupRef, { once: true, margin: '-150px' })

  return (
    <section className='mt-14 pb-12 md:mt-20 md:pb-16 lg:px-0 lg:pb-32'>
      <div className='flex flex-col max-w-7xl mx-auto px-4 md:px-6'>
        <h1
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transition: 'all 2s ease-in-out',
          }}
          className='w-full my-5 font-semibold text-xl md:text-2xl lg:my-8'
        >
            Projects Galore
        </h1>
        <div className='my-7 justify-center flex flex-col md:grid md:grid-cols-3 md:gap-3'>
          {workArrayIndexPage.map((item: any, index: number) => (
            <ProjectCardIndex
              key={index}
              title={item.title}
              link={item.link}
              image={item.image}
              projectType={item.projectType}
            />
          ))}
        </div>
        <div
          ref={groupRef}
          style={{
            opacity: groupInView ? 1 : 0,
            transition: 'opacity 2s ease-out',
          }}
          className='flex flex-col items-center mx-auto'
        >
          <p className='text-custom-textSecondary text-center'>
            If you would like to see more of my work, check out my github or the projects page of this website for more projects. 👨‍💻
          </p>
          <div className='flex items-center md:flex-row flex-col gap-2 w-full mt-10 lg:w-8/12 justify-center'>
            <button className='hover:shadow-md p-2 w-full text-center rounded-md bg-custom-colorSecondary text-white hover:bg-custom-colorPrimary max-w-xs'>
              <a
                target='_blank'
                href='https://www.github.com/raglandc'
                rel='noreferrer'
                className='flex items-center justify-center w-full h-full px-6 py-2 text-sm'
              >
                Visit GitHub <SiGithub className='inline ml-2' />
              </a>
            </button>
            <button className='w-full p-2 ease-in text-center rounded-md bg-custom-background border border-custom-textPrimary hover:bg-custom-textPrimary hover:text-custom-background text-custom-textPrimary max-w-xs'>
              <a
                href='/projects'
                rel='noreferrer'
                className='flex items-center justify-center w-full h-full px-6 py-2 text-sm'
              >
                See More Projects
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}