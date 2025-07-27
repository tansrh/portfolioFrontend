import React, { memo } from "react";
import PortfolioButton from "./PortfolioButton";
import FieldError from "./FieldError";

interface ContactSectionProps {
  contact: Record<string, string>;
  editable?: boolean;
  setContact: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors?: any;
}


const ContactSection: React.FC<ContactSectionProps> = ({ contact, setContact, editable, errors }) => {
  const handleChange = (field: string, value: string) => {
    setContact({ ...contact, [field]: value });
  };
  const handleDelete = (field: string) => {
    const updated = { ...contact };
    delete updated[field];
    setContact(updated);
  };
  const handleAdd = () => {
   setContact({ ...contact, [""]: "" });
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact</h2>
      <div className="flex flex-col gap-2 mt-2">
        {editable ? (
          <>
            {Object.entries(contact).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    className="px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100 w-1/3"
                    type="text"
                    value={key}
                    onChange={e => {
                      const newKey = e.target.value;
                      if (!newKey) return;
                      const updated = { ...contact };
                      updated[newKey] = updated[key];
                      delete updated[key];
                      setContact(updated);
                    }}
                    placeholder="Contact Name"
                  />
                  <input
                    className="px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100 w-2/3"
                    type="text"
                    value={value}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder="Contact Value"
                  />
                  <PortfolioButton text="Delete" onClick={() => handleDelete(key)} />
                </div>
                <FieldError text={errors && errors[key]} />
              </div>
            ))}
            <PortfolioButton text="Add Field" onClick={handleAdd} className="mt-2 w-fit" />
          </>
        ) : (
          <>
            {Object.entries(contact).map(([key, value]) => (
              <div key={key} className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default memo(ContactSection);
