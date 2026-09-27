import { getAllBlogs } from "@/lib/content";
import BlogCard from "./_components/BlogCard";

const CARD_ROW_CLASSES = 'mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'

type BlogCategory = {
    label: string;
    description: string;
    filter: (category: string | undefined) => boolean;
    accent?: string;
};

const BLOG_CATEGORIES: BlogCategory[] = [
    {
        label: "Newest",
        description: "Hot off the press, these are my most recent blogs",
        accent: "New Blogs",
        filter: () => true,
    },
    {
        label: "Algorithms",
        description: "Algorithms help us write efficient, correct and robust code. Learn how we use algorithm analysis to write code that can change the world",
        filter: (cat) => cat === "Algorithms",
    },
    {
        label: "Graphs",
        description: "Graphs are a data structure used to represent everything from networks to complicated systems. Learn more about the data structure that makes social networks possible",
        filter: (cat) => cat === "Graphs",
    },
];

export default function BlogsPage() {
    const allBlogs = getAllBlogs().sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return (
        <>
            <section className="max-w-7xl mx-auto flex items-center justify-center h-96">
                <div className="mx-auto space-y-8 text-center">
                    <h1 className="text-6xl md:text-9xl tracking-wide font-bold font-display">
                        Blog
                    </h1>
                </div>
            </section>

            <main className="mt-6 pb-8 md:mt-12 md:pb-16 lg:px-0 lg:pb-32">
                <div className="space-y-16">
                    {BLOG_CATEGORIES.map((category, i) => {
                        const blogs = category.filter === BLOG_CATEGORIES[0].filter
                            ? allBlogs.slice(0, 5)
                            : allBlogs.filter((b) => category.filter(b.postCategory));

                        return (
                            <div key={category.label}>
                                <div className="mx-auto max-w-7xl px-4 md:px-6">
                                    {category.accent && (
                                        <span className="text-sm font-semibold text-sky-400 lg:text-base">
                                            {category.accent}
                                        </span>
                                    )}
                                    <h2 className={`max-w-3xl text-xl font-semibold md:text-2xl ${i === 0 ? "mt-1 lg:mt-2" : "mt-4 lg:mt-5"}`}>
                                        {category.label}
                                    </h2>
                                    {category.description.split(". ").map((line) => (
                                        <p key={line} className="mt-1 block text-custom-textSecondary lg:text-lg">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                <div className={CARD_ROW_CLASSES}>
                                    {blogs.map((blog) => (
                                        <BlogCard
                                            key={blog.title}
                                            title={blog.title}
                                            link={blog.link}
                                            readTime={blog.readTime}
                                            image={blog.image}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );
}
