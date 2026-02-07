import fs from "node:fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/util/TableOfContents";
import { mdxComponents } from "@/components/MDXComponents";
import PageProgressBar from "@/components/PageProgressBar";
import { getAllProjects, projectFileBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export const generateStaticParams = async () =>
    getAllProjects().map((p) => ({ project: p.slug }));

export const generateMetadata = ({
    params,
}: {
    params: { project: string };
}) => {
    const meta = getAllProjects().find((p) => p.slug === params.project);
    if (!meta) notFound();
    return { title: meta.title };
};

export default async function ProjectPage({
    params,
}: {
    params: { project: string };
}) {
    const file = projectFileBySlug(params.project);
    if (!file) notFound();

    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const mdx = await renderMdx(content, mdxComponents);

    if (!data.title || !data.date) {
        notFound();
    }

    return (
        <main className="max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14">
            <PageProgressBar />
            <article className="prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32">
                <h1 className="text-3xl md:text-4xl mt-0">{data.title}</h1>
                <div>
                    <p className="m-0">
                        <span className="font-semibold">Project Type: </span>
                        {data.projectType}
                    </p>
                    <p className="m-0">
                        <span className="font-semibold">Project Members: </span>
                        {data.groupMembers}
                    </p>
                    <p className="m-0">
                        <span className="font-semibold">Published: </span>
                        {data.date}
                    </p>
                </div>
                <TableOfContents />
                <div className="js-toc-content">{mdx}</div>
            </article>
        </main>
    );
}
