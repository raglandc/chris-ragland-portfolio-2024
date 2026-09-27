import Image from "next/image"
import Link from "next/link"

type ProjectCardProps = {
  title: string;
  link: string;
  image: string;
  projectType: string;
}

export default function ProjectCard({ title, link, image, projectType }: ProjectCardProps) {
  return (
    <Link href={link}  className='w-[85%] max-w-sm flex-none snap-start scroll-ml-4 md:max-w-xs md:scroll-ml-6 lg:w-auto lg:max-w-none lg:px-2'>
      <div className='relative h-48 overflow-hidden rounded-t-md'>
        <Image
          src={image}
          alt={`${title} personal project image`}
          fill
          style={{ borderTopRightRadius: '.15rem', borderTopLeftRadius: '.15rem' }}
        />
      </div>
      <div className='w-full h-24 py-3'>
        <h3 className='font-bold '>{title}</h3>
        <p className='text-custom-textSecondary'>{projectType}</p>
      </div>
    </Link>
  )
}