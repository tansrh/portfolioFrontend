import React from "react";
import { useRouter } from "next/navigation";
import PortfolioButton from "./PortfolioButton";
import { formatDayMonthYear } from "@/lib/utils";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  portfolioId?: string;
}

interface BlogsSectionProps {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const BlogsSection: React.FC<BlogsSectionProps> = ({ blogs, setBlogs }) => {
  const router = useRouter();

  const addBlog = () => {
    const newBlog: Blog = {
      id: (blogs.length + 1).toString(),
      title: `New Blog ${blogs.length + 1}`,
      content: "<p>New blog content.</p>",
      createdAt: new Date().toISOString(),
    };
    setBlogs([...blogs, newBlog]);
  };

  return (
    <section className="bg-white dark:bg-black rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Blogs</h2>
      {blogs.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No blogs added.</div>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="p-4 rounded shadow bg-gray-50 dark:bg-gray-900 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition flex justify-between items-center"
              onClick={() =>{
                //  router.push(`/blogs/${blog.id}`)
                }}
            >
              <span className="text-lg font-semibold">{blog.title}</span>
              <span className="text-xs text-gray-500">{formatDayMonthYear(blog.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
      <PortfolioButton text="Add Blog" onClick={addBlog} className="mt-4" />
    </section>
  );
};

export default BlogsSection;
