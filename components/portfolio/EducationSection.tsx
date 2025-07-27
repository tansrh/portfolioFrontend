import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import CommonTextInput from "./CommonTextInput";
import CommonTextarea from "./CommonTextarea";

interface EducationSectionProps {
    education: Array<{ degree: string; institution: string; from: string; to: string; achievements: string }>;
    setEducation: React.Dispatch<React.SetStateAction<Array<{ degree: string; institution: string; from: string; to: string; achievements: string }>>>;
    editable?: boolean;
    errors?: any;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, setEducation, editable, errors }) => {
    const handleChange = (idx: number, field: string, value: string) => {
        const updated = education.map((item, i) =>
            i === idx ? { ...item, [field]: value } : item
        );
        setEducation(updated);
    };
    const handleAdd = () => {
        setEducation([
            ...education,
            { degree: "", institution: "", from: "", to: "", achievements: "" }
        ]);
    };
    const handleDelete = (idx: number) => {
        setEducation(education.filter((_, i) => i !== idx));
    };

    return (
        <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Education</h2>
            {education.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No education added.</div>
            ) : (
                education.map((edu, idx) => (
                    <div key={idx} className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                        {editable ? (
                            <div className="space-y-2">
                                <CommonTextInput
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={e => handleChange(idx, "degree", e.target.value)}
                                    error={errors && errors[idx]?.degree}
                                />
                                <CommonTextInput
                                    type="text"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={e => handleChange(idx, "institution", e.target.value)}
                                    error={errors && errors[idx]?.institution}
                                />
                                <div className="flex gap-2">
                                    <CommonTextInput
                                        type="month"
                                        placeholder="From"
                                        value={edu.from}
                                        onChange={e => handleChange(idx, "from", e.target.value)}
                                        error={errors && errors[idx]?.from}
                                        className="w-1/2"
                                    />
                                    <CommonTextInput
                                        type="month"
                                        placeholder="To"
                                        value={edu.to}
                                        onChange={e => handleChange(idx, "to", e.target.value)}
                                        error={errors && errors[idx]?.to}
                                        className="w-1/2"
                                    />
                                </div>
                                <CommonTextarea
                                    placeholder="Achievements"
                                    value={edu.achievements}
                                    onChange={e => handleChange(idx, "achievements", e.target.value)}
                                    error={errors && errors[idx]?.achievements}
                                />
                                <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} className="mt-2" />
                            </div>
                        ) : (
                            <>
                                <div className="font-bold text-gray-700 dark:text-gray-200">{edu.degree} @ {edu.institution}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-400 mb-1">{edu.from} - {edu.to}</div>
                                <div className="text-gray-600 dark:text-gray-300">{edu.achievements}</div>
                            </>
                        )}
                    </div>
                ))
            )}
            {editable && (
                <PortfolioButton text="Add Education" onClick={handleAdd} />
            )}
        </section>
    );
};

export default memo(EducationSection);
