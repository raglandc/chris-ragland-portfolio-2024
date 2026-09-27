import { getAllProjects } from "@/lib/content";
import ProjectCard from "./_components/ProjectCard";

const YEAR_DESCRIPTIONS: Record<string, string[]> = {
    "2024": ["Senior year at the University of South Florida"],
    "2023": ["Junior year at the University of South Florida"],
    "2022": [
        "Before starting my Computer Science degree at USF, I thought it would be a good idea to get programming experience beforehand.",
        "I remember around this time is when I started getting into 3D web-development with tools like ThreeJS, Blender, and React-Three-Fiber.",
    ],
    "2021": [
        "After completing my web development starter course, I took to learning React on my own and improving my JavaScript and CSS skills while building my first portfolio/freelance website.",
    ],
};

function yearOf(dateStr: string) {
    return dateStr?.split("-")?.[0] ?? "";
}

export default function ProjectsPage() {
    const allProjects = getAllProjects()
        .slice()
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    const years = Array.from(new Set(allProjects.map((p) => yearOf(p.date))));

    return (
        <>
            <section className="max-w-7xl mx-auto flex items-center justify-center h-96">
                <div className="mx-auto space-y-8 text-center">
                    <h1 className="text-6xl md:text-9xl tracking-wide font-bold font-display">
                        Projects
                    </h1>
                    <p className="font-semibold text-custom-textSecondary text-lg md:text-2xl space-x-5 tracking-widest">
                        IMAGINATION UNLEASHED
                    </p>
                </div>
            </section>

            <main className="mt-6 pb-8 md:mt-12 md:pb-16 lg:px-0 lg:pb-32">
                {years.map((year, i) => (
                    <div key={year} className="space-y-16">
                        <div>
                            <div className="mx-auto max-w-7xl px-4 md:px-6">
                                <h2 className={`max-w-3xl text-xl font-semibold md:text-2xl ${i === 0 ? "mt-1 lg:mt-2" : "mt-4 lg:mt-5"}`}>
                                    {year}
                                </h2>
                                {(YEAR_DESCRIPTIONS[year] ?? []).map((line) => (
                                    <p key={line} className="mt-1 block text-custom-textSecondary lg:text-lg">
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
                                {allProjects
                                    .filter((p) => yearOf(p.date) === year)
                                    .map((project) => (
                                        <ProjectCard
                                            key={project.slug}
                                            title={project.title}
                                            image={project.image}
                                            link={project.link}
                                            projectType={project.projectType}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}
