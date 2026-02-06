import fs from "node:fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/util/TableOfContents";
import PageProgressBar from "@/components/PageProgressBar";
import { mdxComponents } from "@/components/MDXComponents";
import { getAllBlogs, findBlogFileBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export const generateStaticParams = async () =>
    getAllBlogs().map((b) => ({ blog: b.slug }));

export const generateMetadata = ({ params }: { params: { blog: string } }) => {
    const meta = getAllBlogs().find((b) => b.slug === params.blog);
    if (!meta) notFound();
    return { title: meta.title };
};

export default async function Blog({ params }: { params: { blog: string } }) {
    const file = findBlogFileBySlug(params.blog);
    if (!file) notFound();
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const mdx = await renderMdx(content, mdxComponents);
    return (
        <main className="max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14">
            <PageProgressBar />
            <article className="prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32">
                <h1 className="text-3xl md:text-4xl mt-0">{data.title}</h1>
                <div>
                    <p className="m-0">
                        <span className="font-semibold">Category: </span>
                        {data.postCategory}
                    </p>
                    <p className="m-0">
                        <span className="font-semibold">Author: </span>
                        {data.author}
                    </p>
                    <time
                        dateTime={String(data.date)}
                        className="block"
                    >
                        <span className="font-semibold">Published: </span>
                        {data.date}
                    </time>
                </div>
                <TableOfContents />
                {data.image && (
                    <div
                        className="mx-auto h-96 w-full rounded-xl mt-4 hidden sm:block"
                        style={{
                            backgroundImage: `url(${data.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                )}
                <div className="js-toc-content mt-5">{mdx}</div>
            </article>
        </main>
    );
}
