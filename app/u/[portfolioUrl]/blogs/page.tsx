"use client";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import BlogCard from "./_PublicBlogCard";
import React, { use, useEffect } from "react";
import { usePortfolio } from "../layout";
export default function BlogsPage({ params }: { params: Promise<{ portfolioUrl: string }> }) {
  const { portfolioUrl } = use(params);
  // const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);
  const { data, isLoading, error } = usePortfolio();
  useEffect(() => {
        const name = data?.portfolio.personalDetails?.name || "Portfolio";
        const about = data?.portfolio.personalDetails?.about
            ? data?.portfolio.personalDetails.about.replace(/<[^>]+>/g, "").slice(0, 160)
            : "View this portfolio.";
        document.title = `${name}'s Portfolio`;
    }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.blogs) return <div>Failed to load blogs.</div>;

  return (
    <main className="mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 mt-5">Blogs</h1>
      <div className="flex flex-row w-full flex-wrap gap-8 items-center justify-center content-start">
        {data.blogs.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
}