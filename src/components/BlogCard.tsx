import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  image: string;
  link: string;
  readTime: string;
  title: string;
}

export default function BlogCard({ title, link, image, readTime }: BlogCardProps) {
  return (
    <Link href={link}  className='w-[85%] max-w-sm flex-none snap-start scroll-ml-4 md:max-w-xs md:scroll-ml-6 lg:w-auto lg:max-w-none lg:px-2'>
      <div 
        className="relative h-48 overflow-hidden rounded-t-md"
        style={{
          backgroundImage: `url(${image})`, 
          backgroundPosition: "center",
          backgroundSize: 'cover'
        }}
      />
      <div className='w-full h-24 py-3'>
        <h3 className='font-bold '>{title}</h3>
        <p className='text-custom-textSecondary'>{readTime} min read</p>
      </div>
    </Link>
  )
}