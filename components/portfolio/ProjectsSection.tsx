import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import CommonTextInput from "./CommonTextInput";
import CommonTextarea from "./CommonTextarea";

interface Project {
  name: string;
  description: string;
  link: string;
  imageUrl?: string;
}

interface ProjectsSectionProps {
  projects: Array<Project>;
  setProjects: React.Dispatch<React.SetStateAction<Array<Project>>>;
  editable?: boolean;
  errors?: any;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, setProjects, editable, errors }) => {
  const handleChange = (idx: number, field: string, value: string) => {
    const updated = projects.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setProjects(updated);
  };
  const handleDelete = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
    setProjects([
      ...projects,
      { name: "", description: "", link: "", imageUrl: "" }
    ]);
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Projects</h2>
      {projects.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No projects added.</div>
      ) : (
        projects.map((project, idx) => (
          <div key={idx} className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            {editable ? (
              <div className="space-y-2">
                <CommonTextInput
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={e => handleChange(idx, "name", e.target.value)}
                  error={errors && errors[idx]?.name}
                />
                <CommonTextarea
                  placeholder="Description"
                  value={project.description}
                  onChange={e => handleChange(idx, "description", e.target.value)}
                  error={errors && errors[idx]?.description}
                />
                <CommonTextInput
                  type="text"
                  placeholder="Link"
                  value={project.link}
                  onChange={e => handleChange(idx, "link", e.target.value)}
                  error={errors && errors[idx]?.link}
                />
                <CommonTextInput
                  type="url"
                  placeholder="Image URL (optional)"
                  value={project.imageUrl || ""}
                  onChange={e => handleChange(idx, "imageUrl", e.target.value)}
                  error={errors && errors[idx]?.imageUrl}
                />
                <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} className="mt-2" />
              </div>
            ) : (
              <>
                {project.imageUrl && (
                  <img src={project.imageUrl} alt="Project" className="mb-2 w-24 h-24 object-cover rounded" />
                )}
                <div className="font-bold text-gray-700 dark:text-gray-200">{project.name}</div>
                <div className="text-gray-600 dark:text-gray-300 mb-1">{project.description}</div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">{project.link}</a>
              </>
            )}
          </div>
        ))
      )}
      {editable && (
        <PortfolioButton text="Add Project" onClick={handleAdd} />
      )}
    </section>
  );
};
export default memo(ProjectsSection);
