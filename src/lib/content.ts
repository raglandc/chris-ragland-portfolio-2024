import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time"; // TODO: REMOVE not used

const ROOT = process.cwd();

const BLOGS_DIR = path.join(ROOT, "posts/blogs");
const PROJECTS_DIR = path.join(ROOT, "posts/projects");

export type BlogMeta = {
    slug: string;
    categoryDir: string;
    title: string;
    date: string;
    author?: string;
    postCategory?: string;
    image: string;
    readTime: string;
    link: string;
};

export type ProjectMeta = {
    slug: string;
    title: string;
    date: string;
    projectType: string;
    groupMembers?: string;
    image: string;
    readTime: string;
    link: string;
};

function walkMdxFiles(dir: string): string[] {
    const out: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walkMdxFiles(full));
        else if (entry.isFile() && full.endsWith(".mdx")) out.push(full);
    }
    return out;
}

export function getAllBlogs(): BlogMeta[] {
    const files = walkMdxFiles(BLOGS_DIR);
    return files.map((file) => {
        const rel = path.relative(BLOGS_DIR, file).replaceAll("\\", "/");
        const [categoryDir, filename] = rel.split("/");
        const slug = filename.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(file, "utf8");
        const { data } = matter(raw);
        return {
            slug,
            categoryDir,
            title: data.title,
            date: data.date,
            author: data.author,
            postCategory: data.postCategory,
            image: data.image,
            readTime: data.readTime,
            link: `/blogs/${slug}`,
        };
    });
}

export function getAllProjects(): ProjectMeta[] {
    const files = fs
        .readdirSync(PROJECTS_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => path.join(PROJECTS_DIR, f));
    return files.map((file) => {
        const slug = path.basename(file).replace(/\.mdx$/, "");
        const raw = fs.readFileSync(file, "utf8");
        const { data } = matter(raw);
        return {
            slug,
            title: data.title,
            date: data.date,
            projectType: data.projectType,
            groupMembers: data.groupMembers,
            image: data.image,
            readTime: data.readTime,
            link: `/projects/${slug}`,
        };
    });
}

export function findBlogFileBySlug(slug: string): string | null {
    const files = walkMdxFiles(BLOGS_DIR);
    for (const f of files) {
        if (path.basename(f).replace(/\.mdx$/, "") === slug) return f;
    }
    return null;
}

export function projectFileBySlug(slug: string): string | null {
    const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
    return fs.existsSync(file) ? file : null;
}
