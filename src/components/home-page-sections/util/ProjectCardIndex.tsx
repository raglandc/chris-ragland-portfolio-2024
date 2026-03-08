import Image from "next/image"
import Link from "next/link"

type ProjectCardIndexProps = {
  title: string;
  link: string;
  image: string;
  projectType: string;
}

export default function ProjectCardIndex({ title, link, image, projectType }: ProjectCardIndexProps) {
  return (
    <Link href={link} className='group mx-auto w-full max-w-sm md:max-w-none flex-none snap-start lg:px-2'>
      <div className='rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700/50 group-hover:border-custom-colorPrimary/50 transition-colors duration-200'>
        <div className='relative h-56 overflow-hidden'>
          <Image
            src={image}
            alt={`${title} personal project image`}
            layout='fill'
            objectFit='cover'
            className='group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='w-full py-3 px-3 border-t border-gray-200 dark:border-gray-700/50'>
          <h3 className='font-bold'>{title}</h3>
          <p className='text-custom-textSecondary text-sm mt-0.5'>{projectType}</p>
        </div>
      </div>
    </Link>
  )
}