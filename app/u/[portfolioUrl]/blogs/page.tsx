"use client";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import BlogCard from "./_PublicBlogCard";
import React, { use } from "react";
export default function BlogsPage({ params }: { params: Promise<{ portfolioUrl: string }> }) {
  const { portfolioUrl } = use(params);
  const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);

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