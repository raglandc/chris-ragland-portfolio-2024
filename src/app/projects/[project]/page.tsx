import { format, parseISO } from "date-fns"
import { getMDXComponent } from "next-contentlayer/hooks"
import { allProjects } from "contentlayer/generated" 
import { notFound } from "next/navigation"
import TableOfContents from "../../../components/util/TableOfContents"
import { mdxComponents } from "@/components/MDXComponents"
import PageProgressBar from "@/components/PageProgressBar"


export const generateStaticParams = async () => allProjects.map((project) => ({ slug: project._raw.flattenedPath.split('/')[1]}))


export const generateMetadata = ({ params }: { params: { project: string } }) => {
  const project = allProjects.find((project) => {
    const targetPath = project._raw.flattenedPath.split("/")[1];
    return targetPath === params.project
})
  if (!project) notFound();
  return { title: project.title }
}

export default function ProjectPage({ params }: { params: {project: string}})
{
  const project = allProjects.find((project) => {
    const targetPath = project._raw.flattenedPath.split("/")[1];
    return targetPath === params.project
  })

  if (!project) 
    notFound();

  const ContentMDX = getMDXComponent(project.body.code);

  return (
    <main className='max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14'>
      <PageProgressBar />
      <article className='prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32'>
        <h1 className="text-3xl md:text-4xl mt-0">{project.title}</h1>
        <div>
          <div>
            <p className="m-0">
              <span className="font-semibold">Project Type: </span> 
              {project.projectType}
            </p>
          </div>
          <div>
            <p className="m-0">
              <span className="font-semibold">Project Members: </span>
              {project.groupMembers}
            </p>
          </div>
          <div>
            <time dateTime={project.date} className="block">
              <span className="font-semibold">Published: </span>
              {format(parseISO(project.date), "LLLL d, yyyy")}
            </time>
          </div>
        </div>
        <TableOfContents/>
        <div className="js-toc-content">
          <ContentMDX components={mdxComponents}/>
        </div>
      </article>
    </main>
  )
}