"use client"

import ProjectCard from '@/components/projects-page-sections/util/ProjectCard';
import { allProjects } from 'contentlayer/generated';

export default function ProjectsPage()
{
  return (
    <>
      <section className='max-w-7xl mx-auto flex items-center justify-center h-96'>
        <div className='mx-auto space-y-8 text-center'>
          <h1 className='text-6xl md:text-9xl tracking-wide font-bold'>Projects</h1>
          <p className='font-semibold text-custom-textSecondary text-lg md:text-2xl space-x-5 tracking-widest'>IMAGINATION UNLEASHED</p>
        </div>
      </section>
      
      <main className='mt-6 pb-8 md:mt-12 md:pb-16 lg:px-0 lg:pb-32'>
        {/* 2023 */}
        <div className='space-y-16'>
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <span className='text-sm font-semibold text-sky-400 lg:text-base'>
                New Projects
              </span>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>2023</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Here are some of the interesting projects I have worked on the during my junior year at USF</p>
            </div>
            <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
              {allProjects.sort((a, b) => {
                let dateA = new Date(a.date)
                let dateB = new Date(b.date)
                return dateB.getTime() - dateA.getTime()
              }).filter((project) => { 
                return project.date.split("-")[0] === "2023"
              })
              .map((project) => {
                return (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    link={project.link}
                    projectType={project.projectType}
                  />
                )
              })}
            </div>
          </div>
        </div>
        {/* 2022 */}
        <div className='space-y-16'>
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>2022</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>
                Before starting my Computer Science degree at USF, I thought it would be a good idea to get to programming experience beforehand.
              </p>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>
                I remember around this time is when I started getting into 3D web-development with tools like ThreeJS, Blender, and React-Three-Fiber. 
              </p>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>
                While working full time, these are some of the resulting projects of that I worked on.
              </p>
            </div>
            <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
            {allProjects.sort((a, b) => {
                let dateA = new Date(a.date)
                let dateB = new Date(b.date)
                return dateB.getTime() - dateA.getTime()
              })
              .filter((project) => project.date.split("-")[0] === "2022")
              .map((project) => {
                return (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    link={project.link}
                    projectType={project.projectType}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* 2021 */}
        <div className='space-y-16'>
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>2021</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>After completing my web development starter course, I took to learning React on my own and improving my JavaScript and CSS skills while building my first portfolio/freelance website.</p>
            </div>
            <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
            {allProjects.filter((project) => project.date.split("-")[0] === "2021").map((project) => {
                return (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    link={project.link}
                    projectType={project.projectType}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}