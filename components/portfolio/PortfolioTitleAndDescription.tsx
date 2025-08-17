import React from "react";
import CommonTextInput from "@/components/portfolio/CommonTextInput";
import CommonTextarea from "@/components/portfolio/CommonTextarea";
import { formatDayMonthYear } from "@/lib/utils";

type PortfolioTitleAndDescriptionProps = {
  portfolioTitleAndDescription: { title: string; description: string; updatedAt?: string };
  setPortfolioTitleAndDescription: React.Dispatch<React.SetStateAction<any>>;
  errors?: { title?: string; description?: string };
  editable?: boolean;
};

const PortfolioTitleAndDescription: React.FC<PortfolioTitleAndDescriptionProps> = ({
  portfolioTitleAndDescription,
  setPortfolioTitleAndDescription,
  errors,
  editable
}) => {
  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Portfolio Title & Description</h2>
      {editable ? (
        <div className="space-y-2">
          <div>
            <CommonTextInput
              className="px-3 py-2 rounded border w-full dark:bg-gray-900 dark:text-gray-100"
              type="text"
              value={portfolioTitleAndDescription.title}
              onChange={e =>
                setPortfolioTitleAndDescription({
                  ...portfolioTitleAndDescription,
                  title: e.target.value,
                  updatedAt: portfolioTitleAndDescription.updatedAt ?? ""
                })
              }
              placeholder="Portfolio Title"
              disabled={!editable}
            />
            {errors?.title && (
              <span className="text-xs text-red-500 block mt-1">{errors.title}</span>
            )}
          </div>
          <div>
            <CommonTextarea
              className="px-3 py-2 rounded border w-full dark:bg-gray-900 dark:text-gray-100 min-h-[80px]"
              value={portfolioTitleAndDescription.description}
              onChange={e =>
                setPortfolioTitleAndDescription({
                  ...portfolioTitleAndDescription,
                  description: e.target.value,
                  updatedAt: portfolioTitleAndDescription.updatedAt ?? ""
                })
              }
              placeholder="Describe your portfolio..."
              disabled={!editable}
            />
            {errors?.description && (
              <span className="text-xs text-red-500 block mt-1">{errors.description}</span>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{portfolioTitleAndDescription.title}</h1>
          <span className="text-xs text-gray-400 dark:text-gray-400">Last updated: {formatDayMonthYear(portfolioTitleAndDescription.updatedAt)}</span>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200 mb-8" dangerouslySetInnerHTML={{ __html : portfolioTitleAndDescription.description}}/>
        </div>
      )}
    </section>
  );
}
export default PortfolioTitleAndDescription;