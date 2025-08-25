
'use client';
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import FormButton from "@/components/common/FormButton";
import PersonalDetailsSection from "@/components/portfolio/PersonalDetailsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import HobbiesSection from "@/components/portfolio/HobbiesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import { validateFormFields } from "@/lib/utils";
import PortfolioTitleAndDescription from "@/components/portfolio/PortfolioTitleAndDescription";
import { addToast } from "@/store/toast/toastSlice";
import { useAppDispatch } from "@/store/store";
import { createPortfolioThunk } from "@/store/portfolio/portfolioThunk";
import { validationConstants } from "@/configs/validationConfigs";
import PortfolioUrl from "@/components/portfolio/PortfolioUrl";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";

export default function AddPortfolioPage() {
  const dispatch = useAppDispatch();
  useRequireAuth();
  const [personalDetails, setPersonalDetails] = useState({ name: "", about: "", location: "", imageUrl: "" });
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [experience, setExperience] = useState([{ jobTitle: "", company: "", from: "", to: "", description: "" }]);
  const [skills, setSkills] = useState([""]);
  const [projects, setProjects] = useState<Array<{ name: string; description: string; link: string; imageUrl?: string }>>([
    { name: "", description: "", link: "", imageUrl: undefined }
  ]);
  const [education, setEducation] = useState([{ degree: "", institution: "", from: "", to: "", achievements: "" }]);
  const [achievements, setAchievements] = useState([{ title: "", description: "", date: "" }]);
  const [hobbies, setHobbies] = useState([""]);
  // Fix: use Record<string, string> for contact to match ContactSection
  const [contact, setContact] = useState<Record<string, string>>({ email: "", linkedin: "", other: "" });
  const [loading, setLoading] = useState(false);
  const [portfolioTitleAndDescription, setPortfolioTitleAndDescription] = useState({ title: "", description: "" });
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<any>({});
  const handleSave = async () => {
    setLoading(true);
    setFormErrors(null);
    try {
      await validateFormFields({
        portfolioUrl,
        portfolioTitleAndDescription,
        personalDetails,
        experience,
        skills,
        projects,
        education,
        achievements,
        hobbies,
        contact,
      }, validationConstants.PORTFOLIO);
      // Dispatch createPortfolioThunk with all form data
      const formData = {
        portfolioUrl,
        ...portfolioTitleAndDescription,
        personalDetails,
        experience,
        skills,
        projects,
        education,
        achievements,
        hobbies,
        contact,
      };
      const resultAction: any = await dispatch(createPortfolioThunk(formData));
      if (createPortfolioThunk.fulfilled.match(resultAction)) {
        setLoading(false);
        redirect("/dashboard");
      } else {
        setLoading(false);
        dispatch(addToast({ message: resultAction.payload?.message || "Failed to create portfolio.", isError: true }));
        setFormErrors(resultAction.payload?.errors || {});
      }
    } catch (err) {
      console.error("Validation errors:", err);
      dispatch(addToast({ message: "Please fix the errors in the form.", isError: true }));
      setLoading(false);
      setFormErrors(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 bg-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 mt-8">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Add New Portfolio</h1>
        <PortfolioUrl
          value={portfolioUrl}
          onChange={e => setPortfolioUrl(e.target.value)}
          error={formErrors?.portfolioUrl}
          editable={true}
          required
        />
        <PortfolioTitleAndDescription
          portfolioTitleAndDescription={portfolioTitleAndDescription}
          setPortfolioTitleAndDescription={setPortfolioTitleAndDescription}
          errors={formErrors?.portfolioTitleAndDescription}
          editable={true}
        />
        <PersonalDetailsSection personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} editable={true} errors={formErrors?.personalDetails} />
        <ExperienceSection experience={experience} setExperience={setExperience} editable={true} errors={formErrors?.experience} />
        <SkillsSection skills={skills} setSkills={setSkills} editable={true} errors={formErrors?.skills} />
        <ProjectsSection projects={projects} setProjects={setProjects} editable={true} errors={formErrors?.projects} />
        <EducationSection education={education} setEducation={setEducation} editable={true} errors={formErrors?.education} />
        <AchievementsSection achievements={achievements} setAchievements={setAchievements} editable={true} errors={formErrors?.achievements} />
        <HobbiesSection hobbies={hobbies} setHobbies={setHobbies} editable={true} errors={formErrors?.hobbies} />
        <ContactSection contact={contact} setContact={setContact} editable={true} errors={formErrors?.contact} />
        <div className="flex gap-2 mt-6">
          <FormButton
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="!px-5 !py-2 !rounded-lg !font-semibold !bg-black !text-white hover:!bg-gray-800 dark:!bg-white dark:!text-black dark:hover:!bg-gray-200 !border !border-black dark:!border-white !shadow"
          >
            {loading ? "Saving..." : "Save"}
          </FormButton>
          <FormButton
            type="button"
            onClick={() => router.push("/dashboard")}
            disabled={loading}
            className="!px-5 !py-2 !rounded-lg !font-semibold !bg-gray-200 !text-gray-900 hover:!bg-gray-300 dark:!bg-gray-700 dark:!text-gray-100 dark:hover:!bg-gray-600 !border !border-gray-300 dark:!border-gray-700 !shadow"
          >
            Cancel
          </FormButton>
        </div>
      </div>
    </main>
  );
}
