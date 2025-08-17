'use client';
import React, { startTransition, useEffect, useState } from "react";
import { useOptimistic } from "react";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import HobbiesSection from "@/components/portfolio/HobbiesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PersonalDetailsSection from "@/components/portfolio/PersonalDetailsSection";
import { addToast } from "@/store/toast/toastSlice";
import { useAppDispatch } from "@/store/store";
import { useUpdatePortfolioMutation } from '@/store/services/portfolioApi';
import { getRichText, minifyObject, validateFormFields } from "@/lib/utils";
import Link from "next/link";
import PortfolioTitleAndDescription from "../portfolio/PortfolioTitleAndDescription";
import { validationConstants } from "@/configs/validationConfigs";
import { setSelectedPortfolio } from "@/store/portfolio/portfolioSlice";
import PortfolioUrl from "../portfolio/PortfolioUrl";

interface PortfolioDetailsProps {
    portfolio: any;
}

export default function PortfolioDetails({ portfolio: portfolioDetails }: PortfolioDetailsProps) {
    const [optimisticPortfolio, setOptimisticPortfolio] = useOptimistic(portfolioDetails);
    const [updatePortfolio] = useUpdatePortfolioMutation();
    const initialPortfolio = {
        title: "Personal Portfolio",
        description: "Showcase of my skills and projects, including web development, design, and more.",
        updatedAt: "2025-07-20",
        personalDetails: {
            name: "John Doe",
            about: "Passionate developer and designer. Always learning and building new things.",
            location: "New York, USA",
            imageUrl: ""
        },
        experience: [
            { jobTitle: "Frontend Developer", company: "TechCorp", from: "2023-01", to: "2024-06", description: "Built modern web apps with React and TypeScript." },
            { jobTitle: "UI Designer", company: "Designify", from: "2021-05", to: "2022-12", description: "Designed user interfaces and improved UX." }
        ],
        skills: ["React", "TypeScript", "Node.js", "Figma", "CSS", "Redux"],
        projects: [
            { name: "Portfolio Website", description: "Personal portfolio site built with Next.js.", link: "https://example.com", imageUrl: "" },
            { name: "E-commerce Platform", description: "Full-stack e-commerce app.", link: "https://shop.com", imageUrl: "" }
        ],
        education: [
            { degree: "B.Tech Computer Science", institution: "ABC University", from: "2018", to: "2022", achievements: "Graduated with honors." }
        ],
        achievements: [
            { title: "Hackathon Winner", description: "Won 1st place in ABC Hackathon.", date: "2022-11" }
        ],
        hobbies: ["Photography", "Chess", "Traveling"],
        contact: { email: "user@example.com", linkedin: "https://linkedin.com/in/username", other: "Twitter: @user" },
        // blogs removed
    };
    // Use optimisticPortfolio for state initialization and rendering
    const [portfolio, setPortfolio] = useState(JSON.parse(JSON.stringify(optimisticPortfolio)));

    const [isEditing, setIsEditing] = useState(false);
    const [portfolioTitleAndDescription, setPortfolioTitleAndDescription] = useState({
        title: optimisticPortfolio.title,
        description: optimisticPortfolio.description,
        updatedAt: optimisticPortfolio.updatedAt
    });
    const [portfolioUrl, setPortfolioUrl] = useState(optimisticPortfolio.portfolioUrl || "");
    const [personalDetails, setPersonalDetails] = useState(optimisticPortfolio.personalDetails);
    const [experience, setExperience] = useState(optimisticPortfolio.experience);
    const [skills, setSkills] = useState(optimisticPortfolio.skills);
    const [projects, setProjects] = useState(optimisticPortfolio.projects);
    const [education, setEducation] = useState(optimisticPortfolio.education);
    const [achievements, setAchievements] = useState(optimisticPortfolio.achievements);
    const [hobbies, setHobbies] = useState(optimisticPortfolio.hobbies);
    const [contact, setContact] = useState<Record<string, string>>(optimisticPortfolio.contact);
    useEffect(() => {
        setPortfolioUrl(optimisticPortfolio.portfolioUrl || "");
        setPortfolioTitleAndDescription({
            title: optimisticPortfolio.title,
            description: optimisticPortfolio.description,
            updatedAt: optimisticPortfolio.updatedAt
        });
        setPersonalDetails(optimisticPortfolio.personalDetails);
        setExperience(optimisticPortfolio.experience);
        setSkills(optimisticPortfolio.skills);
        setProjects(optimisticPortfolio.projects);
        setEducation(optimisticPortfolio.education);
        setAchievements(optimisticPortfolio.achievements);
        setHobbies(optimisticPortfolio.hobbies);
        setContact(optimisticPortfolio.contact);
    }, [optimisticPortfolio]);
    const dispatch = useAppDispatch();
    const handleEditClick = () => setIsEditing((prev: boolean) => !prev);
    const handleDiscard = () => {
        setPortfolioUrl(portfolio.portfolioUrl || "");
        setPortfolioTitleAndDescription({
            title: portfolio.title,
            description: portfolio.description,
            updatedAt: portfolio.updatedAt
        });
        setPersonalDetails(portfolio.personalDetails);
        setExperience(portfolio.experience);
        setSkills(portfolio.skills);
        setProjects(portfolio.projects);
        setEducation(portfolio.education);
        setAchievements(portfolio.achievements);
        setHobbies(portfolio.hobbies);
        setContact(portfolio.contact);
        setIsEditing(false);
    };
    const validateFields = () => {
        return new Promise((resolve, reject) => {
            const errors: any = {};
            // Personal Details validation
            errors.personalDetails = {};
            if (!personalDetails.name || personalDetails.name.length < 2) {
                errors.personalDetails.name = "Name is required and must be at least 2 characters.";
            }
            if (!personalDetails.about || getRichText(personalDetails.about).length < 10) {
                errors.personalDetails.about = "About section is required and must be at least 10 characters.";
            }
            if (!personalDetails.location) {
                errors.personalDetails.location = "Location is required.";
            }
            // Title validation
            if (!initialPortfolio.title || initialPortfolio.title.length < 3) {
                errors.title = "Title is required and must be at least 3 characters.";
            }
            // Description validation
            if (!getRichText(initialPortfolio.description)) {
                errors.description = "Description is required.";
            }
            // Experience validation
            errors.experience = {};
            experience.forEach((exp: any, idx: number) => {
                errors.experience[idx] = {};
                if (!exp.jobTitle) errors.experience[idx].jobTitle = "Job title required.";
                if (!exp.company) errors.experience[idx].company = "Company required.";
                if (!exp.from) errors.experience[idx].from = "From date required.";
                if (!exp.to) errors.experience[idx].to = "To date required.";
                if (!getRichText(exp.description)) errors.experience[idx].description = "Description required.";
            });
            // Skills validation
            errors.skills = {};
            skills.forEach((skill: any, idx: number) => {
                errors.skills[idx] = {};
                if (!skill) errors.skills[idx].error = "Skill cannot be empty.";
            });
            // Projects validation
            errors.projects = {};
            projects.forEach((project: any, idx: number) => {
                errors.projects[idx] = {};
                if (!project.name) errors.projects[idx].name = "Project name required.";
                if (!project.link) errors.projects[idx].link = "Project link required.";
                if (!getRichText(project.description)) errors.projects[idx].description = "Project description required.";
            });
            // Education validation
            errors.education = {};
            education.forEach((edu: any, idx: number) => {
                errors.education[idx] = {};
                if (!edu.degree) errors.education[idx].degree = "Degree required.";
                if (!edu.institution) errors.education[idx].institution = "Institution required.";
                if (!getRichText(edu.achievements)) errors.education[idx].achievements = "Achievements required.";
                if (!edu.from) errors.education[idx].from = "From date required.";
                if (!edu.to) errors.education[idx].to = "To date required.";
            });
            // Achievements validation
            errors.achievements = {};
            achievements.forEach((ach: any, idx: number) => {
                errors.achievements[idx] = {};
                if (!ach.title) errors.achievements[idx].title = "Achievement title required.";
                if (!getRichText(ach.description)) errors.achievements[idx].description = "Achievement description required.";
                if (!ach.date) errors.achievements[idx].date = "Achievement date required.";
            });
            // Hobbies validation
            errors.hobbies = {};
            hobbies.forEach((hobby: any, idx: number) => {
                errors.hobbies[idx] = {};
                if (!hobby) errors.hobbies[idx] = "Hobby cannot be empty.";
            });
            // Contact validation
            errors.contact = {};
            Object.entries(contact).forEach(([key, value]) => {
                if (!value) errors.contact[key] = ` ${key || "Field"} cannot be empty.`;
            });
            minifyObject(errors);
            if (Object.keys(errors).length > 0) {
                dispatch(addToast({ message: "Please fix the errors in the form.", isError: true }));
                reject(errors);
            } else {
                resolve(true);
            }
        });
    }
    const [fieldErrors, setFieldErrors] = useState<any>({});
    const handleSave = async () => {
        // handleEditClick();
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
                contact
            }, validationConstants.PORTFOLIO);
            setFieldErrors({});
            const optimisticData = {
                ...portfolio,
                portfolioUrl,
                ...portfolioTitleAndDescription,
                personalDetails,
                experience,
                skills,
                projects,
                education,
                achievements,
                hobbies,
                contact
            };

            // Set optimistic update first
            startTransition(() => {
                setOptimisticPortfolio(optimisticData);
            });

            // Then make API call
            const result: any = await updatePortfolio(optimisticData).unwrap();
            dispatch(setSelectedPortfolio(result.portfolio));
            dispatch(addToast({ message: "Portfolio updated successfully" }));
            handleEditClick();

        } catch (error: any) {
            // Revert to original on error
            startTransition(() => {
                setOptimisticPortfolio(portfolioDetails);
            });
            // handleDiscard();
            // dispatch(addToast({
            //     message: Object.values(error).join(" ") || "Failed to update portfolio",
            //     isError: true
            // }));
            setFieldErrors(error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-end mb-2">
                <div className="flex gap-2">
                    <Link
                        href="/blogs"
                        className="px-4 py-2 rounded font-medium transition bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer border border-black dark:border-white"
                        tabIndex={0}
                    >
                        Go To Blogs
                    </Link>
                    <button
                        className={`px-4 py-2 rounded font-medium transition bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer`}
                        onClick={isEditing ? handleSave : handleEditClick}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    {isEditing && (
                        <button
                            className="px-4 py-2 rounded font-medium transition bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={handleDiscard}
                        >
                            Discard
                        </button>
                    )}
                </div>
            </div>
            <div className="space-y-8">
                <PortfolioUrl
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    error={fieldErrors.portfolioUrl}
                    editable={isEditing}
                    required
                />
                <PortfolioTitleAndDescription
                    portfolioTitleAndDescription={portfolioTitleAndDescription}
                    setPortfolioTitleAndDescription={setPortfolioTitleAndDescription}
                    editable={isEditing}
                    errors={fieldErrors.portfolioTitleAndDescription}
                />
                <PersonalDetailsSection
                    personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}
                    editable={isEditing}
                    errors={fieldErrors.personalDetails}
                />
                <ExperienceSection
                    experience={experience}
                    setExperience={setExperience}
                    editable={isEditing}
                    errors={fieldErrors.experience}
                />
                <SkillsSection
                    skills={skills}
                    setSkills={setSkills}
                    editable={isEditing}
                    errors={fieldErrors.skills}
                />
                <ProjectsSection
                    projects={projects}
                    setProjects={setProjects}
                    editable={isEditing}
                    errors={fieldErrors.projects}
                />
                <EducationSection
                    education={education}
                    setEducation={setEducation}
                    editable={isEditing}
                    errors={fieldErrors.education}
                />
                <AchievementsSection
                    achievements={achievements}
                    setAchievements={setAchievements}
                    editable={isEditing}
                    errors={fieldErrors.achievements}
                />
                <HobbiesSection
                    hobbies={hobbies}
                    setHobbies={setHobbies}
                    editable={isEditing}
                    errors={fieldErrors.hobbies}
                />
                <ContactSection
                    contact={contact}
                    setContact={setContact}
                    editable={isEditing}
                    errors={fieldErrors.contact}
                />
            </div>
        </>
    );
}
