import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const remarkPlugins = [remarkGfm, remarkMath] as any[];
const rehypePlugins = [
    rehypeSlug,
    rehypeKatex,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
] as any[];

export async function renderMdx(source: string, components: any) {
    const { compileMDX } = await import("next-mdx-remote/rsc");
    const { content } = await compileMDX({
        source,
        components,
        options: {
            mdxOptions: { remarkPlugins, rehypePlugins },
        },
    });
    return content;
}
