'use client'
import React, { use, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PortfolioButton from "@/components/portfolio/PortfolioButton";
import Image from "next/image";

import { useEffect } from "react";
import CommonImage from "@/components/portfolio/CommonImage";
import { formatDayMonthYear } from "@/lib/utils";
import { JoditLoader } from "@/components/portfolio/CommonJoditLoader";

const JoditEditor = dynamic(() => import('jodit-react'), { loading: () => (
   <JoditLoader/>
  ),ssr: false });
const fetchBlog = async (id: string) => {
  return {
    id,
    title: "Sample Blog Title",
    content: "<p>This is a <b>sample</b> blog post.</p>",
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
  };
};



const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [blog, setBlog] = useState<{ id: string; title: string; content: string; createdAt: string, imageUrl?: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = use(params); 
  useEffect(() => {
    fetchBlog(id).then((data) => {
      setBlog(data);
      setContent(data.content);
    });
  }, [id]);

  const handleSave = () => {
    // Save logic here
    setEditing(false);
  };

  if (!blog) {
    return <div className="max-w-2xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full dark:bg-black">
    <section className="min-h-[80vh] max-w-2xl mx-auto p-6 rounded shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] ">
      <CommonImage
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full min-h-60 max-h-72 object-cover rounded mb-4 bg-gray-100 dark:bg-neutral-800"
      />
      {editing ? (
        <input
          type="text"
          className="text-3xl font-bold mb-2 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 dark:text-white"
          value={blog.title}
          onChange={e => setBlog({ ...blog, title: e.target.value })}
          placeholder="Blog Title"
        />
      ) : (
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      )}
      {blog.createdAt && <div className="text-xs mb-4">{formatDayMonthYear(blog.createdAt)}</div>}
      {editing ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">Blog Image URL</label>
            <input
              id="imageUrl"
              type="text"
              className="w-full border rounded px-3 py-2 mb-2 bg-white dark:bg-neutral-900 dark:text-white"
              value={blog.imageUrl || ''}
              onChange={e => setBlog({ ...blog, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="mb-4 resize:vertical">
            <JoditEditor
              value={content}
              config={{
                readonly: false,
                minHeight: 450,
                hidePoweredByJodit: true,
                theme: "light",
                placeholder: "Write your blog content here..."
              }}
              onBlur={newContent => {setContent(newContent); setBlog({ ...blog, content: newContent })}}
            />
          </div>
          <PortfolioButton text="Save" onClick={handleSave} />
          <PortfolioButton text="Cancel" onClick={() => setEditing(false)} className="ml-2" />
        </>
      ) : (
        <>
          <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <PortfolioButton text="Edit" onClick={() => setEditing(true)} className="mt-6" />
        </>
      )}
    </section>
    </div>
  );
};

export default BlogDetailPage;
