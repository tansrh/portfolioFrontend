import React from "react";
import PortfolioCard from "@/components/ui/PortfolioCard";
const portfolios = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "Showcase of my skills and projects.",
    updatedAt: "2025-07-20",
  },
  {
    id: 2,
    title: "Design Portfolio",
    description: "Collection of my design work.",
    updatedAt: "2025-07-15",
  },
  {
    id: 3,
    title: "Startup Portfolio",
    description: "Pitch and achievements for my startup.",
    updatedAt: "2025-07-10",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 bg-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Portfolios</h1>
        <div className="space-y-6">
          {portfolios.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">No portfolios found.</div>
          ) : (
            portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                id={portfolio.id}
                title={portfolio.title}
                description={portfolio.description}
                updatedAt={portfolio.updatedAt}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
