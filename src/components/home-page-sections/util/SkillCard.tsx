import { useRef } from 'react'
import { useInView } from 'framer-motion'

type SkillCardProps = {
  key: number;
  title: string;
  logo: React.ReactNode
}

export default function SkillCard({ title, logo }: SkillCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <span
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(100px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
    >
      <div className='flex flex-col items-center justify-center px-4 py-5 text-center'>
        <h1 className='mb-3'>{title}</h1>
        <span className='text-2xl'>{logo}</span>
      </div>
    </span>
  )
}
