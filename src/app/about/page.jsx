"use client"
import Image from "next/image";
import TimeLineCard from "@/components/about-page-sections/util/TimeLineCard";

export default function AboutPage()
{

  return (
    <main className="max-w-7xl pt-8 mx-auto px-4 md:px-6 md:pt-14">
      {/* Introduction */}
      <section 
        className="p-4 md:p-6 max-w-5xl mx-auto my-4 shadow-lg border rounded-xl"
      >
        <h1 className="font-semibold text-3xl ml-2 mb-6">
          About  
          <span className="ml-2 text-custom-colorPrimary font-bold">
            Chris
          </span>
        </h1>
        <div className="px-2 md:px-6 flex flex-col md:flex-row">
          <Image
            className="rounded-2xl mx-auto mb-4 md:mr-2"
            src="/img/about-images/headshot.jpg"
            alt="Photo head-shot of Chris Ragland"
            width={325}
            height={475}
          />
          <p className="md: px-4">
            My name is Chris and I am a computer scientist based in the vibrant city of Tampa, Florida. I received my Bachelors of Science in Computer Science from the University of South Florida. I enjoy working on interesting problems with the use of computer algorithms. In my free time, I enjoy exercising and playing the guitar.       
          </p>
        </div>
      </section>
      {/* Time line begins here */}
      <section className="prose dark:prose-invert mx-auto pb-8 md:pb-16 lg:pb-32">
        <TimeLineCard year="Current">
          <p>I am currently working as a Technology Analyst Intern at Citi Bank located in Tampa, Florida.</p>
        </TimeLineCard>
        <TimeLineCard year="2022 - 2024">
          <p>
            Throughout these two years I attended the University of South Florida working towards a Bachelors of Science in Computer Science.
          </p>
          <p>
            I was involved in two separate scholarship programs, NSF (National Science Foundation) SSTEM and Flit-Gap. Through these programs I was able to make connections with fellow STEM students, faculty, and alum. Additionally, I was able to attend the 2023 SHPE conference in Salt Lake City, Utah.
          </p>
          <Image
            className="mx-auto rounded-lg"
            width={300}
            height={375}
            src="/img/about-images/shpe-2023.webp"
            alt="SHPE 2023 conference logo"
          />
          <p>
           I made a ton of friends and memories during this time. I also took my basic understanding of programming to a more professional and engineering perspective by learning the theory behind computers i.e. algorithms. After my time at USF, I felt more capable/excited to tackle more advanced problems in the realm of computer science. 
          </p>

        </TimeLineCard>

        <TimeLineCard year="2020 - 2022">
          <p>
            During this time, the Covid Pandemic was at an all time high. I was working full time as an EMT at Sarasota Memorial Hospital.
          </p>
          <Image
            className="mx-auto rounded-lg"
            width={300}
            height={375}
            src="/img/about-images/emt-covid.webp"
            alt="Myself posing while working in the ICU during the height of the covid pandemic"
          />
          <p>
            I saw firsthand the havoc caused by the virus. It was during this time that I decided that maybe medicine was not the career path I wanted to pursue after all.
          </p>
          <p>
            While working full time, I received my Associates of Arts from the State College of Florida (Bradenton, Florida). After receiving my AA, I decided to take a 1 year program about web development. I decided it would be best to experience something before I committed an entire Bachelors to an area of study that I might not be interested in. However, as it turned out, I loved it.
          </p>
          <p>
            It was shortly after completing this course that I transferred to USF, located in Tampa, during the fall of 2022. 
          </p>
        </TimeLineCard>

        <TimeLineCard year="2016 - 2020">
          <p>
            Shortly after graduating from high school, I began working on the ambulance as an EMT. After a few months, I then moved to Florida in late 2016. I worked several jobs while studying to take my national EMT license exam including, an usher at a movie theater, a table busser at a breakfast cafe, and even a food runner/host at a sports bar.
          </p>
          <Image
            className="mx-auto rounded-lg"
            width={300}
            height={375}
            src="/img/about-images/emt-2016.webp"
            alt="Myself posing in front of a private solo plane at Purdue University Airport"
          />
        </TimeLineCard>

        <TimeLineCard year="2012 - 2016">
          <p>
            I attended and graduated from Lafayette Jefferson High School (Lafayette, Indiana). Below is a picture of my brother (left) and my father (right).
          </p>
          <Image
            className="mx-auto rounded-lg"
            width={300}
            height={375}
            src="/img/about-images/highschool-grad.webp"
            alt="Highschool graduation photo 2016 with brother and father"
          />
          <p>
            It is due in part to Jefferson Highschool that I received my EMT certification as part of a duel enrollment program that would begin my experience in medicine at the age of 18. The following picture is my fellow EMT students and myself on the day we all passed our scenario testing. 
          </p>
          <Image
            className="mx-auto rounded-lg"
            width={300}
            height={375}
            src="/img/about-images/emt-grad.webp"
            alt="Fellow EMT students pose with me when we passed our EMT scenario tests"
          />
          <p>
            A fun fact is that all of those pictured are now licensed paramedics in the state of Indiana. To this day, they are still saving lives and I could not be more proud to be able to call them my friends.
          </p>
        </TimeLineCard>
      </section>
    </main>
  )
}