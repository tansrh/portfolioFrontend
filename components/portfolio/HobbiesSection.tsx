import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import FieldError from "./FieldError";

interface HobbiesSectionProps {
  hobbies: string[];
  setHobbies: React.Dispatch<React.SetStateAction<string[]>>;
  editable?: boolean;
  errors?: any;
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({ hobbies, setHobbies, editable, errors }) => {
  const handleChange = (idx: number, value: string) => {
    const updated = hobbies.map((hobby, i) => (i === idx ? value : hobby));
    setHobbies(updated);
  };
  const handleDelete = (idx: number) => {
    setHobbies(hobbies.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
    setHobbies([...hobbies, ""]);
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Hobbies & Interests</h2>
      {hobbies.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No hobbies added.</div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {hobbies.map((hobby, idx) => (
            <li key={idx} className="mb-2">
              {editable ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <input
                      className="px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100"
                      type="text"
                      value={hobby}
                      onChange={e => handleChange(idx, e.target.value)}
                    />
                    <PortfolioButton text="Delete" onClick={() => handleDelete(idx)} />
                  </div>
                  <FieldError text={errors && errors[idx]?.error} />
                </div>
              ) : (
                <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded text-gray-700 dark:text-gray-100">{hobby}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {editable && (
        <PortfolioButton text="Add Hobby" onClick={handleAdd} />
      )}
    </section>
  );
};
export default memo(HobbiesSection);
