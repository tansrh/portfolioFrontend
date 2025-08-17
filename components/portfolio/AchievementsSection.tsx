"use client";
import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import CommonTextInput from "./CommonTextInput";
import CommonTextarea from "./CommonTextarea";

interface AchievementsSectionProps {
  achievements: Array<{ title: string; description: string; date: string }>;
  setAchievements: React.Dispatch<React.SetStateAction<Array<{ title: string; description: string; date: string }>>>;
  editable?: boolean;
  errors?: any;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, setAchievements, editable, errors }) => {
  const handleChange = (idx: number, field: string, value: string) => {
    const updated = achievements.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setAchievements(updated);
  };
  const handleDelete = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
    setAchievements([
      ...achievements,
      { title: "", description: "", date: "" }
    ]);
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Achievements & Awards</h2>
      {achievements.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No achievements added.</div>
      ) : (
        achievements.map((ach, idx) => (
          <div key={idx} className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            {editable ? (
              <div className="space-y-2">
                <CommonTextInput
                  type="text"
                  placeholder="Title"
                  value={ach.title}
                  onChange={e => handleChange(idx, "title", e.target.value)}
                  error={errors && errors[idx]?.title}
                />
                <CommonTextInput
                  type="date"
                  placeholder="Date"
                  value={ach.date}
                  onChange={e => handleChange(idx, "date", e.target.value)}
                  error={errors && errors[idx]?.date}
                />
                <CommonTextarea
                  placeholder="Description"
                  value={ach.description}
                  onChange={e => handleChange(idx, "description", e.target.value)}
                  error={errors && errors[idx]?.description}
                />
                <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} className="mt-2" />
              </div>
            ) : (
              <>
                <div className="font-bold text-gray-700 dark:text-gray-200">{ach.title}</div>
                <div className="text-gray-600 dark:text-gray-300 mb-1" dangerouslySetInnerHTML={{ __html: ach.description }} />
                {ach.date && <div className="text-xs text-gray-400 dark:text-gray-400">{ach.date}</div>}
              </>
            )}
          </div>
        ))
      )}
      {editable && (
            <PortfolioButton text="Add Achievement" onClick={handleAdd} className="mt-4" />
      )}
    </section>
  );
};

const MemoizedAchievementsSection = memo(AchievementsSection);
MemoizedAchievementsSection.displayName = "AchievementsSection";
export default MemoizedAchievementsSection;
