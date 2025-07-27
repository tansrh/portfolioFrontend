'use client';
import React from "react";
import { useRouter } from "next/navigation";

interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ id, title, description, updatedAt }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/${id}`);
  };
  return (
    <div
      className="rounded-lg shadow-md bg-white dark:bg-black p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-lg dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] dark:hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.18)] transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h2>
        <p className="text-gray-600 dark:text-gray-200 mb-2">{description}</p>
        <span className="text-xs text-gray-400 dark:text-gray-200">Last updated: {updatedAt}</span>
      </div>
    </div>
  );
};

export default PortfolioCard;
