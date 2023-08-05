import { allBlogs } from "contentlayer/generated" 
import BlogCard from "@/components/BlogCard";

export default function BlogsPage()
{
  return (
    <>
      <section className='max-w-7xl mx-auto flex items-center justify-center h-96'>
        <div className='mx-auto space-y-8 text-center'>
          <h1 className='text-6xl md:text-9xl tracking-wide font-bold'>Blog</h1>
        </div>
      </section>

      <main className='mt-6 pb-8 md:mt-12 md:pb-16 lg:px-0 lg:pb-32'>
        <div className="space-y-16">
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <span className='text-sm font-semibold text-sky-400 lg:text-base'>
                New Blogs
              </span>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>Newest</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Hot off the press, these are my most recent blogs</p>
            </div>
            <div 
              className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'
            >
              {allBlogs
              .sort(( a, b ) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              })
              .slice(0, 5)
              .map((blog) => {
                return (
                  <BlogCard 
                    key={blog.title}
                    title={blog.title}
                    link={blog.link}
                    readTime={blog.readTime}
                    image={blog.image}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Algorithms */}
        <div className="space-y-16">
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>Algorithms</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Algorithms help us write efficient, correct and robust code</p>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Learn how we use algorithm analysis to write code that can change the world</p>
            </div>
            <div 
              className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'
            >
              {allBlogs.filter((post) => {
                return post.postCategory === "Algorithms"
              }).map((blog) => {
                return (
                  <BlogCard 
                    key={blog.title}
                    title={blog.title}
                    link={blog.link}
                    readTime={blog.readTime}
                    image={blog.image}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="space-y-16">
          <div>
            <div className='mx-auto max-w-7xl px-4 md:px-6'>
              <h2 className='mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5'>Graphs</h2>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Graphs are a data structure used to represent everything from networks to complicated systems</p>
              <p className='mt-1 block text-custom-textSecondary lg:text-lg'>Learn more about the data structure that makes social networks possible</p>
            </div>
            <div 
              className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'
            >
              {allBlogs.filter((post) => {
                return post.postCategory === "Graphs"
              }).map((blog) => {
                return (
                  <BlogCard 
                    key={blog.title}
                    title={blog.title}
                    link={blog.link}
                    readTime={blog.readTime}
                    image={blog.image}
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