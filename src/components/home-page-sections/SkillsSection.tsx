import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiBlender,
  SiCplusplus,
  SiC,
  SiNextdotjs,
  SiThreedotjs,
  SiMongodb,
  SiPostgresql,
  SiLinux,
  SiPython,
} from 'react-icons/si'
import SkillCard from './util/SkillCard'

export default function SkillsSection({ ...props }) {
  const headerRef = useRef(null)
  const quoteRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const quoteInView = useInView(quoteRef, { once: true })
  return (
    <section className='pt-14 pb-12 md:pt-24 md:pb-16 lg:px-0 lg:pb-32 bg-custom-background'>
    <div
      {...props}
      className='flex flex-col max-w-7xl mx-auto md:justify-between md:flex-row'
    >
      <div className='px-4 md:px-6'>
        <h2
          ref={headerRef}
          style={{
            transform: headerInView ? 'none' : 'translateY(50px)',
            opacity: headerInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
          className='w-full my-5 font-semibold text-xl md:text-2xl lg:my-8'
        >
          I like to learn
          📚
        </h2>
        <p
          ref={quoteRef}
          style={{
            opacity: quoteInView ? 1 : 0,
            transition: 'all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
          className='relative my-5 max-w-xl text-custom-textSecondary'
        >
          I started my programming journey in late 2020, during the covid-19 pandemic. My first real programming language was JavaScript. I still love JavaScript (it may have helped make this website), but it has only made me eager to learn more!
        </p>
        <p
          ref={quoteRef}
          style={{
            opacity: quoteInView ? 1 : 0,
            transition: 'all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
          className='relative my-5 max-w-xl text-custom-textSecondary'
        >
          Here are some of the tools I have worked with over the years.
        </p>
      </div>
      <div className='max-w-2xl grid place-content-stretch grid-cols-3 gap-2 md:gap-x-12 h-max'>
        {skillsArray.map((item, index) => {
          return (
            <SkillCard
              title={item.title}
              logo={item.logo}
              key={index}
            />
          )
        })}
      </div>
    </div>
    </section>
  )
}

const skillsArray = [
  { title: 'C', logo: <SiC /> },
  { title: 'C++', logo: <SiCplusplus /> },
  { title: 'Python', logo: <SiPython /> },
  { title: 'JavaScript', logo: <SiJavascript /> },
  { title: 'TypeScript', logo: <SiTypescript /> },
  { title: 'Linux', logo: <SiLinux /> },
  { title: 'React', logo: <SiReact /> },
  { title: 'NextJs', logo: <SiNextdotjs /> },
  { title: 'ThreeJs', logo: <SiThreedotjs /> },
  { title: 'PostgresSQL', logo: <SiPostgresql /> },
  { title: 'MongoDB', logo: <SiMongodb /> },
  { title: 'Blender', logo: <SiBlender /> },
]
