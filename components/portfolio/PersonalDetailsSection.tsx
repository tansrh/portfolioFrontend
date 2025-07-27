import React from "react";
import CommonTextInput from "./CommonTextInput";
import CommonTextarea from "./CommonTextarea";

interface PersonalDetailsSectionProps {
  personalDetails: {
    name: string;
    about: string;
    location?: string;
    imageUrl?: string;
  };
  setPersonalDetails: (details: any) => void;
  editable?: boolean;
  errors?: any;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ personalDetails, setPersonalDetails, editable, errors }) => {
  const handleChange = (field: string, value: string) => {
    setPersonalDetails({ ...personalDetails, [field]: value });
  };
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Personal Details</h2>
      {editable ? (
        <div className="space-y-2">
          <CommonTextInput
            type="text"
            placeholder="Name"
            value={personalDetails.name}
            onChange={e => handleChange("name", e.target.value)}
            error={errors && errors.name}
          />
          <CommonTextInput
            type="text"
            placeholder="Location"
            value={personalDetails.location || ""}
            onChange={e => handleChange("location", e.target.value)}
            error={errors && errors.location}
          />
          <CommonTextInput
            type="url"
            placeholder="Image URL (optional)"
            value={personalDetails.imageUrl || ""}
            onChange={e => handleChange("imageUrl", e.target.value)}
            error={errors && errors.imageUrl}
          />
          <CommonTextarea
            placeholder="About"
            value={personalDetails.about}
            onChange={e => handleChange("about", e.target.value)}
            error={errors && errors.about}
          />
        </div>
      ) : (
        <>
          {personalDetails.imageUrl && (
            <img src={personalDetails.imageUrl} alt="Profile" className="mb-2 w-24 h-24 object-cover rounded-full" />
          )}
          <div className="font-bold text-gray-700 dark:text-gray-200 text-lg">{personalDetails.name}</div>
          <div className="text-gray-500 dark:text-gray-400 mb-1">{personalDetails.location}</div>
          <div className="text-gray-600 dark:text-gray-300">{personalDetails.about}</div>
        </>
      )}
    </section>
  );
};

export default PersonalDetailsSection;
