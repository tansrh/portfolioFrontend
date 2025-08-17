
import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import CommonTextInput from "./CommonTextInput";
import CommonTextarea from "./CommonTextarea";

interface ExperienceSectionProps {
  experience: Array<{ jobTitle: string; company: string; from: string; to: string; description: string }>;
  setExperience: React.Dispatch<React.SetStateAction<Array<{ jobTitle: string; company: string; from: string; to: string; description: string }>>>;
  editable?: boolean;
  errors?: any;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, setExperience, editable, errors }) => {
  const handleChange = (idx: number, field: string, value: string) => {
    const updated = experience.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setExperience(updated);
  };

  const handleDelete = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    setExperience([
      ...experience,
      { jobTitle: "", company: "", from: "", to: "", description: "" }
    ]);
  };

  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Experience</h2>
      {experience.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No experience added.</div>
      ) : (
        experience.map((exp, idx) => (
          <div key={idx} className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            {editable ? (
              <div className="space-y-2">
                <CommonTextInput
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={e => handleChange(idx, "jobTitle", e.target.value)}
                  error={errors && errors[idx]?.jobTitle}
                />
                <CommonTextInput
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={e => handleChange(idx, "company", e.target.value)}
                  error={errors && errors[idx]?.company}
                />
                <div className="flex gap-2">
                  <CommonTextInput
                    type="month"
                    placeholder="From"
                    value={exp.from}
                    onChange={e => handleChange(idx, "from", e.target.value)}
                    error={errors && errors[idx]?.from}
                    className="w-1/2"
                  />
                  <CommonTextInput
                    type="month"
                    placeholder="To"
                    value={exp.to}
                    onChange={e => handleChange(idx, "to", e.target.value)}
                    error={errors && errors[idx]?.to}
                    className="w-1/2"
                  />
                </div>
                <CommonTextarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={e => handleChange(idx, "description", e.target.value)}
                  error={errors && errors[idx]?.description}
                />
                <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} className="mt-2" />
              </div>
            ) : (
              <>
                <div className="font-bold text-gray-700 dark:text-gray-200">{exp.jobTitle} @ {exp.company}</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 mb-1">{exp.from} - {exp.to}</div>
                <div className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: exp.description }} />
              </>
            )}
          </div>
        ))
      )}
      {editable && (
        <PortfolioButton text="Add Experience" onClick={handleAdd} />
      )}
    </section>
  );
};
const MemoizedExperienceSection = memo(ExperienceSection);
MemoizedExperienceSection.displayName = "ExperienceSection";
export default MemoizedExperienceSection;
