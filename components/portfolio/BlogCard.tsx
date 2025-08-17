import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Blog } from "@/components/portfolio/BlogsSection";
import CommonImage from "./CommonImage";

interface BlogCardProps {
    key: string,
    blog: Blog;
}

import { useAppDispatch } from "@/store/store";
import { setSelectedBlog } from "@/store/blogs/blogsSlice";
import { formatDayMonthYear } from "@/lib/utils";
import { openModal } from "@/store/modal/modalSlice";
import ModalTextContent from "../common/ModalTextContent";
import { deleteBlogThunk } from "@/store/blogs/blogsThunk";
import { addToast } from "@/store/toast/toastSlice";
import { useDeleteBlogMutation } from "@/store/services/blogsApi";

const BlogCard: React.FC<BlogCardProps> = ({ blog }: BlogCardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const [deleteBlog, {isLoading: isDeleting}] = useDeleteBlogMutation();

    const handleClick = () => {
        dispatch(setSelectedBlog(blog));
        router.push(`/blogs/read`);
        // router.push(`${pathname}/${blog.id}`);
    };
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(openModal({
            content: { component: "ModalTextContent", props: {text : "Are you sure you want to delete this blog?"}},
            showYesButton: true,
            showCancelButton: true,
            onYesClick: async () => {
               try {
                    await deleteBlog({id: blog.id, portfolioId: blog.portfolioId!}).unwrap();
                    dispatch(addToast({ message: "Blog deleted successfully.", isError: false }));
                } catch (error: any) {
                    dispatch(addToast({ message: error?.data?.message || "Failed to delete blog.", isError: true }));
                }
            }
        }));
    }
    return (
        <div
            className="flex flex-col bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 m-2 w-full sm:w-[350px] md:w-[400px] shadow-sm cursor-pointer hover:bg-gray-100 hover:scale-102 transition"
            onClick={handleClick}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        >
            {(
                <CommonImage
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="flex justify-between items-center">
            <div className="flex flex-col flex-1 p-4">
                <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100 truncate">{blog.title}</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">{formatDayMonthYear(blog.createdAt)}</span>
            </div>
            <div className="p-2 group relative" onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5v10.125c0 1.052.823 1.875 1.875 1.875h6.75c1.052 0 1.875-.823 1.875-1.875V7.5m-12 0h12m-12 0V6.375C6.75 5.323 7.573 4.5 8.625 4.5h6.75c1.052 0 1.875.823 1.875 1.875V7.5" />
                </svg>
                <span className="absolute -left-1/2 bottom-full px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">Delete</span>
            </div>
            </div>
        </div>
    );
};

export default BlogCard;
