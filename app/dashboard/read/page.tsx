"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/store/store";
import PortfolioDetailPage from "@/components/ui/PortfolioDetails";
import { blogsApi } from "@/store/services/blogsApi";

export default function PortfolioDetailsPage() {
  const selectedPortfolio = useSelector((state: RootState) => state.portfolio.selectedPortfolio);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!selectedPortfolio) {
      router.replace("/dashboard");
    }
  }, [selectedPortfolio, router]);
  dispatch(blogsApi.endpoints.getBlogs.initiate(selectedPortfolio?.id || ""));
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 bg-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto py-10 px-4">
        {selectedPortfolio ? (
          <PortfolioDetailPage portfolio={selectedPortfolio} />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">No portfolio selected.</div>
        )}
      </div>
    </main>
  );
}