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
    <Link href={link}  className='mx-auto w-full max-w-sm md:max-w-none flex-none snap-start s lg:px-2'>
      <div className='relative h-48 overflow-hidden rounded-t-md'>
        <Image
          src={image}
          alt={`${title} personal project image`}
          layout='fill'
          objectFit='cover'
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