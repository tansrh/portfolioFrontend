'use client'
import Link from "next/link";
import CommonImage from "@/components/portfolio/CommonImage";
import FormButton from "@/components/common/FormButton";
import { openModal } from "@/store/modal/modalSlice";
import { useAppDispatch } from "@/store/store";

export default function BlogCard({ blog }: { blog: any }) {
    const dispatch = useAppDispatch();

    return (
        <div className="bg-white dark:bg-black rounded-lg shadow p-4 sm:p-6 flex flex-col gap-2  w-full sm:w-[350px] md:w-[400px] h-[420px] sm:h-[480px] md:h-[500px] border border-gray-200 dark:border-gray-700">
            {/* Blog Image */}
            <div className="flex-1 flex items-center justify-center mb-3">
                <CommonImage
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full max-h-56 object-cover rounded-lg"
                />
            </div>
            {/* Title and Date */}
            <div className="flex flex-col gap-1">
                <span className="text-lg sm:text-xl font-bold truncate" title={blog.title}>
                    {blog.title}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                    {blog.createdAt && new Date(blog.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                </span>
            </div>
            {/* Content Preview */}
            <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base line-clamp-2">
                {blog.content ? blog.content.replace(/<[^>]+>/g, "") : ""}
            </div>
            {/* Read Button */}
            <div className="mt-auto pt-2">
                <FormButton
                    className="inline-block px-4 py-2 rounded bg-gray-900 text-white dark:bg-white dark:text-black font-medium hover:underline transition w-max"
                    onClick={() => {
                        dispatch(openModal({
                            content: { component: "PublicBlog", props: { blog } }
                        }));
                    }}
                >
                    Read
                </FormButton>
            </div>
        </div>
    );
}