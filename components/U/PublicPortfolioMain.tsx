import PublicExperienceSection from "./PublicExperienceSection";
import PublicAchievementsSection from "./PublicAchievementsSection";
import PublicContactSection from "./PublicContactSection";
import PublicEducationSection from "./PublicEducationSection";
import PublicHobbiesSection from "./PublicHobbiesSection";
import PublicProjectsSection from "./PublicProjectsSection";
import PublicSkillsSection from "./PublicSkillsSection";
import PublicPersonalDetails from "./PublicPersonalDetails";
import FadeInSection from "./FadeInSection";
import { Timeline } from "../common/Timeline";

export default function PublicPortfolioMain({ portfolio }: { portfolio: any, blogs?: any[] }) {
  if (!portfolio) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-black dark:text-white font-bold text-2xl text-center bg-white dark:bg-black">
        Portfolio not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 mt-5" style={{ scrollBehavior: "smooth" }}>
      <main className="max-w-4xl mx-auto py-10 px-4 space-y-10 ">
        <Timeline>
          <FadeInSection>
            <PublicPersonalDetails personalDetails={portfolio.personalDetails} />
          </FadeInSection>
          <FadeInSection>
            <PublicExperienceSection experience={portfolio.experience} />
          </FadeInSection>
          <FadeInSection>
            <PublicSkillsSection skills={portfolio.skills} />
          </FadeInSection>
          <FadeInSection>
            <PublicProjectsSection projects={portfolio.projects} />
          </FadeInSection>
          <FadeInSection>
            <PublicEducationSection education={portfolio.education} />
          </FadeInSection>
          <FadeInSection>
            <PublicAchievementsSection achievements={portfolio.achievements} />
          </FadeInSection>
          <FadeInSection>
            <PublicHobbiesSection hobbies={portfolio.hobbies} />
          </FadeInSection>
          <FadeInSection>
            <PublicContactSection contact={portfolio.contact} />
          </FadeInSection>
        </Timeline>
      </main>
    </div>
  );
}