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
      <div className='flex flex-col items-center justify-center px-4 py-5 text-center rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-custom-colorPrimary/50 transition-colors duration-200'>
        <span className='text-2xl mb-3'>{logo}</span>
        <p className='text-xs font-medium font-mono'>{title}</p>
      </div>
    </span>
  )
}
