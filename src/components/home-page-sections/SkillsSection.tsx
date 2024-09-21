import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  SiReact,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiLinux,
  SiPython,
  SiDocker,
  SiGnubash,
} from 'react-icons/si'
import { BiLogoSpringBoot } from "react-icons/bi";
import { FaGit, FaJava } from 'react-icons/fa'
import { TbSql } from "react-icons/tb";
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
          I started my programming journey during the COVID-19 pandemic. My introduction into programming was through web-development with technologies like HTML, CSS & JavaScript. I was so inspired by everything that I was learning that I decided to major in Computer Science. This is where I would begin to learn the magic behind computers. 
        </p>
        <p
          ref={quoteRef}
          style={{
            opacity: quoteInView ? 1 : 0,
            transition: 'all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
          className='relative my-5 max-w-xl text-custom-textSecondary'
        >
          Here are a few of the technologies I have been able to work with over the years.
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
  { title: 'C/C++', logo: <SiCplusplus /> },
  { title: 'Python', logo: <SiPython /> },
  { title: 'TypeScript', logo: <SiTypescript /> },
  { title: 'Java', logo: <FaJava /> },
  { title: 'SQL', logo: <TbSql/> },
  { title: 'Git', logo: <FaGit />},
  { title: 'Bash', logo: <SiGnubash />},
  { title: 'Linux', logo: <SiLinux /> },
  { title: 'Docker', logo: <SiDocker />},
  { title: 'Spring', logo: <BiLogoSpringBoot /> },
  { title: 'React', logo: <SiReact /> },
  { title: 'NextJs', logo: <SiNextdotjs /> },
]
