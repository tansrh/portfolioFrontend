'use client';
import React, { useState } from "react";
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
import { minifyObject } from "@/lib/utils";

interface PortfolioDetailsProps {
    portfolio: any;
}

export default function PortfolioDetails({ portfolio: portfolioDetails }: PortfolioDetailsProps) {
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
        contact: { email: "user@example.com", linkedin: "https://linkedin.com/in/username", other: "Twitter: @user" }
    };
    const [portfolio, setPortfolio] = useState(JSON.parse(JSON.stringify(initialPortfolio)));


    const [isEditing, setIsEditing] = useState(false);
    const [personalDetails, setPersonalDetails] = useState(initialPortfolio.personalDetails);
    const [experience, setExperience] = useState(initialPortfolio.experience);
    const [skills, setSkills] = useState(initialPortfolio.skills);
    const [projects, setProjects] = useState(initialPortfolio.projects);
    const [education, setEducation] = useState(initialPortfolio.education);
    const [achievements, setAchievements] = useState(initialPortfolio.achievements);
    const [hobbies, setHobbies] = useState(initialPortfolio.hobbies);
    const [contact, setContact] = useState<Record<string, string>>(initialPortfolio.contact);
    const dispatch = useAppDispatch();
    const handleEditClick = () => setIsEditing((prev: boolean) => !prev);
    const handleDiscard = () => {
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
            if (!personalDetails.about || personalDetails.about.length < 10) {
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
            if (!initialPortfolio.description) {
                errors.description = "Description is required.";
            }
            // Experience validation
            errors.experience = {};
            experience.forEach((exp, idx) => {
                errors.experience[idx] = {};
                if (!exp.jobTitle) errors.experience[idx].jobTitle = "Job title required.";
                if (!exp.company) errors.experience[idx].company = "Company required.";
                if (!exp.from) errors.experience[idx].from = "From date required.";
                if (!exp.to) errors.experience[idx].to = "To date required.";
                if (!exp.description) errors.experience[idx].description = "Description required.";
            });
            // Skills validation
            errors.skills = {};
            skills.forEach((skill, idx) => {
                errors.skills[idx] = {};
                if (!skill) errors.skills[idx].error = "Skill cannot be empty.";
            });
            // Projects validation
            errors.projects = {};
            projects.forEach((project, idx) => {
                errors.projects[idx] = {};
                if (!project.name) errors.projects[idx].name = "Project name required.";
                if (!project.link) errors.projects[idx].link = "Project link required.";
                if (!project.description) errors.projects[idx].description = "Project description required.";
            });
            // Education validation
            errors.education = {};
            education.forEach((edu, idx) => {
                errors.education[idx] = {};
                if (!edu.degree) errors.education[idx].degree = "Degree required.";
                if (!edu.institution) errors.education[idx].institution = "Institution required.";
                if (!edu.achievements) errors.education[idx].achievements = "Achievements required.";
                if (!edu.from) errors.education[idx].from = "From date required.";
                if (!edu.to) errors.education[idx].to = "To date required.";
            });
            // Achievements validation
            errors.achievements = {};
            achievements.forEach((ach, idx) => {
                errors.achievements[idx] = {};
                if (!ach.title) errors.achievements[idx].title = "Achievement title required.";
                if (!ach.description) errors.achievements[idx].description = "Achievement description required.";
                if (!ach.date) errors.achievements[idx].date = "Achievement date required.";
            });
            // Hobbies validation
            errors.hobbies = {};
            hobbies.forEach((hobby, idx) => {
                errors.hobbies[idx] = {};
                if (!hobby) errors.hobbies[idx].error = "Hobby cannot be empty.";
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
        try {
            await validateFields();
            setFieldErrors({});
            setPortfolio(JSON.parse(JSON.stringify(initialPortfolio)));
            handleEditClick();
        } catch (errors) {
            setFieldErrors(errors);
        }
    };
    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{initialPortfolio.title}</h1>
                <div className="flex gap-2">
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
            <span className="text-xs text-gray-400 dark:text-gray-400">Last updated: {initialPortfolio.updatedAt}</span>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200 mb-8">{initialPortfolio.description}</p>
            <div className="space-y-8">
                <PersonalDetailsSection personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} editable={isEditing} errors={fieldErrors.personalDetails} />
                <ExperienceSection experience={experience} setExperience={setExperience} editable={isEditing} errors={fieldErrors.experience} />
                <SkillsSection skills={skills} setSkills={setSkills} editable={isEditing} errors={fieldErrors.skills} />
                <ProjectsSection projects={projects} setProjects={setProjects} editable={isEditing} errors={fieldErrors.projects} />
                <EducationSection education={education} setEducation={setEducation} editable={isEditing} errors={fieldErrors.education} />
                <AchievementsSection achievements={achievements} setAchievements={setAchievements} editable={isEditing} errors={fieldErrors.achievements} />
                <HobbiesSection hobbies={hobbies} setHobbies={setHobbies} editable={isEditing} errors={fieldErrors.hobbies} />
                <ContactSection contact={contact} setContact={setContact} editable={isEditing} errors={fieldErrors.contact} />
            </div>
        </>
    );
}
