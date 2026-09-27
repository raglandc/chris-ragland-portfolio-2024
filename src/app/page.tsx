import HeroSection from "./_components/HeroSection";
import SkillsSection from "./_components/SkillsSection";
import ProjectCardsSection from "./_components/ProjectCardsSection";
import SlideShowSection from "./_components/SlideShowSection";

export default function Home() {
    return (
        <main className="w-full">
            <HeroSection />
            <SkillsSection />
            <ProjectCardsSection />
            <SlideShowSection />
        </main>
    );
}
