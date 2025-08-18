import React from "react";
import CommonTextInput from "@/components/portfolio/CommonTextInput";
import Link from "next/link";

interface PortfolioUrlInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  editable?: boolean;
  required?: boolean;
}

const PortfolioUrlInput: React.FC<PortfolioUrlInputProps> = ({
  value,
  onChange,
  error,
  editable = true,
  required = false,
}) => (
  <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Portfolio URL</h2>
    {editable ? (
      <CommonTextInput
        type="text"
        placeholder="Portfolio URL"
        value={value}
        onChange={onChange}
        error={error}
        disabled={!editable}
        required={required}
      />
    ) : (
      <div className="text-gray-700 dark:text-gray-200 text-lg break-all">
        <Link
          href={`/u/${encodeURIComponent(value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          {value}
        </Link>
      </div>
    )}
  </section>
);

export default PortfolioUrlInput;