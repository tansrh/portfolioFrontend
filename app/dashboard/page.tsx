'use client';
import React, { useEffect } from "react";
import PortfolioCard from "@/components/ui/PortfolioCard";
import Link from "next/link";
import { getProtfoliosThunk } from "@/store/portfolio/portfolioThunk";
import { RootState, useAppDispatch } from "@/store/store";
import { useGetPortfoliosQuery } from "@/store/services/portfolioApi";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  // const { portfolios, loading, errors, message } = useSelector((state: RootState) => state.portfolio);
    const { data: portfolios, isLoading: loading, error } = useGetPortfoliosQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 0,
    refetchOnFocus: false
  });
  // useEffect(() => {
  //   dispatch(getProtfoliosThunk());
  // }, [dispatch]);
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 bg-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 mt-8">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Portfolios</h1>
          <Link
            href="/dashboard/add"
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 border border-black dark:border-white shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            aria-label="Add Portfolio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Portfolio
          </Link>
        </div>
        <div className="space-y-6">
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">Loading portfolios...</div>
          ) : portfolios?.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">No portfolios found.</div>
          ) : (
            portfolios?.map((portfolio: any) => (
              <PortfolioCard
                key={portfolio.id}
                id={portfolio.id}
                title={portfolio.title}
                description={portfolio.description}
                updatedAt={portfolio.updatedAt}
                {...portfolio}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
