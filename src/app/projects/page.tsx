import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/components/projects-page-sections/util/ProjectCard";

function yearOf(dateStr: string) {
    // expects YYYY-MM-DD
    return dateStr?.split("-")?.[0] ?? "";
}

export default function ProjectsPage() {
    const allProjects = getAllProjects()
        .slice()
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    const byYear = (year: string) =>
        allProjects.filter((p) => yearOf(p.date) === year);

    return (
        <>
            <section className="max-w-7xl mx-auto flex items-center justify-center h-96">
                <div className="mx-auto space-y-8 text-center">
                    <h1 className="text-6xl md:text-9xl tracking-wide font-bold">
                        Projects
                    </h1>
                    <p className="font-semibold text-custom-textSecondary text-lg md:text-2xl space-x-5 tracking-widest">
                        IMAGINATION UNLEASHED
                    </p>
                </div>
            </section>

            <main className="mt-6 pb-8 md:mt-12 md:pb-16 lg:px-0 lg:pb-32">
                {/* 2024 */}
                <div className="space-y-16">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 md:px-6">
                            <h2 className="mt-1 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-2">
                                2024
                            </h2>
                            <p className="mt-1 block text-custom-textSecondary lg:text-lg">
                                Senior year at the University of South Florida
                            </p>
                        </div>
                        <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
                            {byYear("2024").map((project) => (
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

                {/* 2023 */}
                <div className="space-y-16">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 md:px-6">
                            <h2 className="mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5">
                                2023
                            </h2>
                            <p className="mt-1 block text-custom-textSecondary lg:text-lg">
                                Junior year at the University of South Florida
                            </p>
                        </div>
                        <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
                            {byYear("2023").map((project) => (
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

                {/* 2022 */}
                <div className="space-y-16">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 md:px-6">
                            <h2 className="mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5">
                                2022
                            </h2>
                            <p className="mt-1 block text-custom-textSecondary lg:text-lg">
                                Before starting my Computer Science degree at
                                USF, I thought it would be a good idea to get
                                programming experience beforehand.
                            </p>
                            <p className="mt-1 block text-custom-textSecondary lg:text-lg">
                                I remember around this time is when I started
                                getting into 3D web-development with tools like
                                ThreeJS, Blender, and React-Three-Fiber.
                            </p>
                        </div>
                        <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
                            {byYear("2022").map((project) => (
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

                {/* 2021 */}
                <div className="space-y-16">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 md:px-6">
                            <h2 className="mt-4 max-w-3xl text-xl font-semibold md:text-2xl lg:mt-5">
                                2021
                            </h2>
                            <p className="mt-1 block text-custom-textSecondary lg:text-lg">
                                After completing my web development starter
                                course, I took to learning React on my own and
                                improving my JavaScript and CSS skills while
                                building my first portfolio/freelance website.
                            </p>
                        </div>
                        <div className='mx-auto mt-7 flex max-w-7xl snap-x snap-mandatory space-x-6 overflow-x-auto pb-6 lg:mt-8 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-x-3.5 lg:gap-y-12 lg:space-x-0 lg:px-4 before:flex-shrink-0 before:basis-4 before:content-[""] after:flex-shrink-0 after:basis-4 after:content-[""] md:before:basis-6 md:after:basis-6 lg:before:hidden lg:after:hidden'>
                            {byYear("2021").map((project) => (
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
            </main>
        </>
    );
}
