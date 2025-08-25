"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch } from "@/store/store";
import { createBlogThunk } from "@/store/blogs/blogsThunk";
import { useSelector } from "react-redux";
import { addToast } from "@/store/toast/toastSlice";
import CommonBlog, { BlogType } from "@/components/portfolio/CommonBlog";
import { blogsApi } from "@/store/services/blogsApi";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
const initialBlog: BlogType = {
  id: "",
  title: "",
  content: "",
  imageUrl: null,
  createdAt: new Date().toISOString(),
};
const AddBlogPage = () => {
  const router = useRouter();
  useRequireAuth();
  const dispatch = useAppDispatch();
  const selectedPortfolioId = useSelector((state: RootState) => state.portfolio.selectedPortfolio?.id);
  const { loading } = useSelector((state: RootState) => state.blogs);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
    if (!selectedPortfolioId) {
      router.back();
    }
  }, [selectedPortfolioId, router]);



  const handleSave = async (blog: BlogType) => {
    const resultAction = await dispatch(
      createBlogThunk({
        title: blog.title,
        content: blog.content,
        imageUrl: blog.imageUrl!,
        portfolioId: selectedPortfolioId!,
        userId: userId!,
      })
    );
    if (createBlogThunk.rejected.match(resultAction)) {
      dispatch(
        addToast({
          isError: true,
          message: (resultAction.payload as { message?: string })?.message || "Failed to create blog.",
        })
      );
    } else {
      dispatch(
        addToast({
          message: resultAction.payload?.message || "Blog created successfully.",
          isError: false,
        })
      );
      dispatch(blogsApi.endpoints.getBlogs.initiate(selectedPortfolioId || ""));

    }
    router.replace("/blogs");
  };

  return (
    <div className="min-h-screen w-full dark:bg-black mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center pt-6">Add New Blog</h1>
      <CommonBlog
        blog={initialBlog}
        editable={true}
        loading={loading}
        onSave={handleSave}
        onCancel={() => router.push("/blogs")}
      />
    </div>
  );
  return null
};

export default AddBlogPage;
