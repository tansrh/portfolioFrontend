
import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import FieldError from "./FieldError";

interface SkillsSectionProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  editable?: boolean;
  errors?: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, setSkills, editable, errors }) => {
  const handleChange = (idx: number, value: string) => {
    const updated = skills.map((skill, i) => (i === idx ? value : skill));
    setSkills(updated);
  };
  const handleDelete = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
      setSkills([...skills, ""]);
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Skills</h2>
      {skills.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No skills added.</div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <li key={idx} className="mb-2">
              {editable ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <input
                      className="px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100"
                      type="text"
                      value={skill}
                      onChange={e => handleChange(idx, e.target.value)}
                    />
                    <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} />
                  </div>
                  <FieldError text={errors && errors[idx]} />
                </div>
              ) : (
                <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded text-gray-700 dark:text-gray-100">{skill}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {editable && (
        <PortfolioButton text="Add Skill" onClick={handleAdd} />
      )}
    </section>
  );
};
const MemoizedSkillsSection = memo(SkillsSection);
MemoizedSkillsSection.displayName = "SkillsSection";
export default MemoizedSkillsSection;
