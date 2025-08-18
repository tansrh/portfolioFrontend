
'use client';
import React, { useEffect, useState } from "react";
import BlogsSection, { Blog } from "@/components/portfolio/BlogsSection";
import BlogCard from "@/components/portfolio/BlogCard";
import { RootState, useAppDispatch } from "@/store/store";
import { getBlogsThunk } from "@/store/blogs/blogsThunk";
import Link from "next/link";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { useGetBlogsQuery } from "@/store/services/blogsApi";

const initialBlogs: Blog[] = [
  {
    id: "1",
    title: "First Blog Post",
    content: "<p>This is the <b>first</b> blog post.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834bq3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "Second Blog Post",
    content: "<p>This is the <i>second</i> blog post.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    title: "React Best Practices",
    content: "<p>Learn the best practices for building scalable React apps.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    title: "Next.js for Beginners",
    content: "<p>A beginner's guide to building web apps with Next.js.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    title: "TypeScript Tips",
    content: "<p>Tips and tricks for using TypeScript effectively in your projects.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    title: "UI/UX Design Trends 2025",
    content: "<p>Stay ahead with the latest UI/UX design trends for 2025.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  },
];

const BlogsPage = () => {
  // const { blogs } = useSelector((state: RootState) => state.blogs);
  // const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedPortfolioId = useSelector((state: RootState) => state.portfolio.selectedPortfolio?.id);
  // const { loading } = useSelector((state: RootState) => state.blogs);
  const { data: blogs, isLoading: loading, isFetching } = useGetBlogsQuery(selectedPortfolioId!);
  if(!selectedPortfolioId) {
      redirect("/dashboard");
  }
  // useEffect(()=>{
  //   dispatch(getBlogsThunk(selectedPortfolioId!));
  // }, [dispatch, selectedPortfolioId])
  return (
    <div className="min-h-screen w-full dark:bg-black mt-8">
      <section className="max-w-[90vw] mx-auto p-4 md:p-8">
        <div className="flex flex-wrap justify-between items-center mb-6 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Blogs</h1>
          <Link
            href="/blogs/add"
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 border border-black dark:border-white shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            aria-label="Add Blog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Blog
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 px-4 md:px-8">
          {(!blogs) ||( blogs?.length === 0) ? (
            <div className="w-full text-center text-gray-500 dark:text-gray-400 py-12 text-lg font-medium">No blogs found</div>
          ) : (
            blogs?.map(blog => (
              <BlogCard key={blog.id} blog={blog as any} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
