"use client";
import Image from "next/image";
import TimeLineCard from "@/components/about-page-sections/util/TimeLineCard";

export default function AboutPage() {
    return (
        <main className="max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14">
            {/* Hero */}
            <section className="max-w-5xl mx-auto my-8 md:my-16">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                        <Image
                            className="rounded-2xl shadow-xl"
                            src="/img/about-images/headshot.jpg"
                            alt="Photo head-shot of Chris Ragland"
                            width={280}
                            height={380}
                            priority
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="text-custom-colorPrimary font-semibold text-xs uppercase tracking-widest mb-3">
                                Software Engineer · Tampa, FL
                            </p>
                            <h1 className="font-bold text-4xl md:text-5xl leading-tight">
                                From EMT to{" "}
                                <span className="text-custom-colorPrimary">
                                    Software Engineering
                                </span>
                            </h1>
                        </div>

                        <p className="text-custom-textSecondary text-lg leading-relaxed">
                            I&apos;m Chris — a software engineer with a B.S. in
                            Computer Science from the University of South
                            Florida. My path here wasn&apos;t a straight line: I
                            spent years as an EMT on the front lines of the
                            Covid pandemic before pivoting to tech. That
                            experience taught me how to stay sharp under
                            pressure, think clearly through complexity, and care
                            deeply about the people I&apos;m building for.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-2 border-t border-gray-200 dark:border-gray-800">
                            <div>
                                <p className="text-2xl font-bold text-custom-colorPrimary">
                                    Fortune 100
                                </p>
                                <p className="text-sm text-custom-textSecondary">
                                    Current Employer
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-custom-colorPrimary">
                                    B.S. CS
                                </p>
                                <p className="text-sm text-custom-textSecondary">
                                    Univ. of South Florida
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-custom-colorPrimary">
                                    4+ yrs
                                </p>
                                <p className="text-sm text-custom-textSecondary">
                                    Coding Experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey header */}
            <div className="max-w-3xl mx-auto px-4 mb-12">
                <div className="border-t border-gray-200 dark:border-gray-800 mb-10" />
                <h2 className="text-2xl font-bold mb-1">My Journey</h2>
                <p className="text-custom-textSecondary">
                    The road that brought me here — in reverse chronological
                    order.
                </p>
            </div>

            {/* Timeline */}
            <section className="max-w-3xl mx-auto px-4 pb-20">
                <TimeLineCard year="Current">
                    <p>
                        I am currently working as a software engineer at a
                        Fortune 100 company, building production systems that
                        serve millions of users.
                    </p>
                </TimeLineCard>

                <TimeLineCard year="2022 - 2024">
                    <p>
                        I attended the University of South Florida, earning my
                        Bachelor of Science in Computer Science. These two years
                        deepened my understanding of the theory that underpins
                        modern software — algorithms, data structures, systems
                        design — and gave me the vocabulary to tackle hard
                        problems with rigor.
                    </p>
                    <p>
                        I was selected for two competitive scholarship programs:
                        the NSF S-STEM initiative and Flit-Gap. Both connected
                        me with a network of STEM peers, faculty mentors, and
                        alumni — and in 2023, I had the opportunity to represent
                        USF at the SHPE National Conference in Salt Lake City,
                        Utah.
                    </p>
                    <Image
                        className="mx-auto rounded-xl"
                        width={325}
                        height={475}
                        src="/img/about-images/shpe-2023.webp"
                        alt="SHPE 2023 conference logo"
                    />
                </TimeLineCard>

                <TimeLineCard year="2020 - 2022">
                    <p>
                        The Covid pandemic was at its peak. I was working
                        full-time as an EMT at Sarasota Memorial Hospital,
                        including shifts in the Covid ICU during the Delta wave.
                        I saw the human cost of the crisis up close — and it
                        forced me to honestly reconsider whether medicine was
                        the right long-term path.
                    </p>
                    <Image
                        className="mx-auto rounded-xl"
                        width={300}
                        height={375}
                        src="/img/about-images/emt-covid.webp"
                        alt="Working in the ICU during the height of the Covid pandemic"
                    />
                    <p>
                        While still working full-time, I completed my Associate
                        of Arts at the State College of Florida. Then I took a
                        deliberate detour: a one-year web development program. I
                        didn&apos;t want to commit to a four-year degree in
                        something I hadn&apos;t tried yet. As it turned out, I
                        loved it — and by fall 2022, I had transferred to USF.
                    </p>
                </TimeLineCard>

                <TimeLineCard year="2016 - 2020">
                    <p>
                        Shortly after high school, I started working on an
                        ambulance as an EMT and then relocated from Indiana to
                        Florida in late 2016. To make ends meet while studying
                        for my national licensure exam, I worked as a movie
                        theater usher, a table busser, and a food runner —
                        sometimes holding multiple jobs at once.
                    </p>
                    <Image
                        className="mx-auto rounded-xl"
                        width={300}
                        height={375}
                        src="/img/about-images/emt-2016.webp"
                        alt="Posing in front of a plane at Purdue University Airport"
                    />
                    <p>
                        That period of figuring it out on my own — in a new
                        state, from scratch — gave me a resilience and
                        adaptability I still rely on today.
                    </p>
                </TimeLineCard>

                <TimeLineCard year="2012 - 2016">
                    <p>
                        I grew up in Lafayette, Indiana and graduated from
                        Jefferson High School in 2016. Through a dual-enrollment
                        program, I earned my EMT certification at 18 — the
                        decision that would set the next chapter of my life in
                        motion.
                    </p>
                    <Image
                        className="mx-auto rounded-xl"
                        width={300}
                        height={375}
                        src="/img/about-images/highschool-grad.webp"
                        alt="High school graduation with brother and father, 2016"
                    />
                    <Image
                        className="mx-auto rounded-xl"
                        width={300}
                        height={375}
                        src="/img/about-images/emt-grad.webp"
                        alt="EMT graduating class after passing scenario testing"
                    />
                    <p>
                        Everyone in that EMT graduation photo went on to become
                        a licensed paramedic in Indiana. They are still out
                        there saving lives, and I could not be more proud to
                        call them friends.
                    </p>
                </TimeLineCard>
            </section>
        </main>
    );
}
