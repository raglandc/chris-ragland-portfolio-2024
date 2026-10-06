import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { HiDownload } from "react-icons/hi";
import PageProgressBar from "@/components/PageProgressBar";
import { mdxComponents } from "@/components/MDXComponents";
import { renderMdx } from "@/lib/mdx";
import { listDecks } from "./lib";

// Unlisted page: not in the nav, and kept out of search engines.
const ARTICLE = path.join(process.cwd(), "src/app/orgo/article.mdx");

function readArticle() {
    return matter(fs.readFileSync(ARTICLE, "utf8"));
}

export const generateMetadata = (): Metadata => ({
    title: readArticle().data.title,
    robots: { index: false, follow: false },
});

function formatSize(bytes: number) {
    return bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(0)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Decks() {
    const decks = listDecks();
    if (decks.length === 0) return <p><em>Decks coming soon!</em></p>;
    return (
        <ul className="not-prose grid gap-3 sm:grid-cols-2 p-0 my-6">
            {decks.map((deck) => (
                <li key={deck.file} className="list-none">
                    <a
                        href={deck.href}
                        download
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span>
                            <span className="block font-semibold capitalize">{deck.name}</span>
                            <span className="block text-sm opacity-70">
                                {deck.file} · {formatSize(deck.size)}
                            </span>
                        </span>
                        <HiDownload className="h-5 w-5 shrink-0" />
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default async function OrgoPage() {
    const { data, content } = readArticle();
    const mdx = await renderMdx(content, { ...mdxComponents, Decks });
    return (
        <main className="max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14">
            <PageProgressBar />
            <article className="prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32">
                <h1 className="text-3xl md:text-4xl mt-0">{data.title}</h1>
                {data.date && <p className="m-0 opacity-70">{data.date}</p>}
                {mdx}
            </article>
        </main>
    );
}
