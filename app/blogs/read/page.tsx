
'use client';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import CommonBlog, { BlogType } from "@/components/portfolio/CommonBlog";
import { updateBlogThunk } from "@/store/blogs/blogsThunk";
import { addToast } from "@/store/toast/toastSlice";
import { useRouter } from "next/navigation";
import { setSelectedBlog } from "@/store/blogs/blogsSlice";
import { blogsApi } from "@/store/services/blogsApi";

const BlogReadPage = () => {
  const selectedBlog = useSelector((state: RootState) => state.blogs.selectedBlog);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  useEffect(() => {
    if (!selectedBlog) {
      const storedBlog = localStorage.getItem("selectedBlog");
      if (storedBlog) {
        dispatch(setSelectedBlog(JSON.parse(storedBlog)));
        router.refresh();
      }
    }
  }, [selectedBlog, router, dispatch]);

  if (!selectedBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Blog Selected</h2>
          <p className="text-gray-500">Please select a blog from the list.</p>
        </div>
      </div>
    );
  }

  const handleSave = async (blog: any) => {
    const resultAction = await dispatch(updateBlogThunk({
      id: blog.id,
      title: blog.title as string,
      content: blog.content as string,
      imageUrl: blog.imageUrl
    }));
    if (updateBlogThunk.rejected.match(resultAction)) {
      dispatch(addToast({
        isError: true,
        message: (resultAction.payload as any)?.message || "Failed to update blog."
      }));
    } else {
      await dispatch(addToast({
        message: resultAction.payload?.message || "Blog updated successfully.",
        isError: false
      }));
      await dispatch(setSelectedBlog(resultAction.payload));
      dispatch(blogsApi.endpoints.getBlogs.initiate(selectedBlog.portfolioId || ""));

      if (currentUserId?.toString() == selectedBlog?.userId?.toString()) {
        router.replace("/blogs");
      }
    }
  };

  return (
    <div className="min-h-screen w-full dark:bg-black mt-8">
      <CommonBlog blog={selectedBlog} currentUserId={currentUserId} onSave={handleSave} />
    </div>
  );
};

export default BlogReadPage;
