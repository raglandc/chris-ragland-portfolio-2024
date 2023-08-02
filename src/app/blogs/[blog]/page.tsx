import { format, parseISO } from "date-fns"
import { getMDXComponent } from "next-contentlayer/hooks"
import { allBlogs } from "contentlayer/generated" 
import { notFound } from "next/navigation"
import TableOfContents from "@/components/util/TableOfContents"
import { mdxComponents } from "@/components/MDXComponents"
import PageProgressBar from "@/components/PageProgressBar"


export const generateStaticParams = async () => allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath.split('/')[2]}))


export const generateMetadata = ({ params }: { params: { blog: string } }) => {
  const blog = allBlogs.find((blog) => {
    const targetPath = blog._raw.flattenedPath.split("/")[2];
    return targetPath === params.blog
})
  if (!blog)
  {
    notFound();
  }
  return { title: blog.title }
}

interface BlogProps {
  params: { blog: string };
}

export default function Blog({ params }: BlogProps)
{
  const blog = allBlogs.find((blog) => {
    const targetPath = blog._raw.flattenedPath.split("/")[2];
    return targetPath === params.blog;
  })

  if (!blog)
  {
    notFound();
  }

  const ContentMDX = getMDXComponent(blog.body.code);

  return (
    <main className='max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14'>
      <PageProgressBar />
      <article className='prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32'>
        <h1 className="text-3xl md:text-4xl mt-0">{blog.title}</h1>
        <div>
          <div>
            <p className="m-0">
              <span className="font-semibold">Category: </span> 
              {blog.postCategory}
            </p>
          </div>
          <div>
            <p className="m-0">
              <span className="font-semibold">Author: </span>
              {blog.author}
            </p>
          </div>
          <div>
            <time dateTime={blog.date} className="block">
              <span className="font-semibold">Published: </span>
              {format(parseISO(blog.date), "LLLL d, yyyy")}
            </time>
          </div>
          <div>
            <p className="m-0">
              <span className="font-semibold">Read Time: </span>
              {blog.readTime} minutes
            </p> 
          </div>
        </div>
        <TableOfContents/>
        <div
          className="mx-auto h-96 w-full rounded-xl mt-4 hidden sm:block"
          style={{
            backgroundImage: `url(${blog.image})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center"
          }}
        />
        <div className="js-toc-content mt-5">
          <ContentMDX components={mdxComponents}/>
        </div>
      </article>
    </main>
  )
}