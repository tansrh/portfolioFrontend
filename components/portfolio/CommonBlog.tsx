'use client'
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FieldError from "./FieldError";
import { validationConstants } from "@/configs/validationConfigs";
import { formatDayMonthYear, validateFormFields } from "@/lib/utils";
import dynamic from "next/dynamic";
import CommonImage from "./CommonImage";
import PortfolioButton from "./PortfolioButton";
import { JoditLoader } from "./CommonJoditLoader";

const JoditEditor = dynamic(() => import('jodit-react'), { loading: () => <JoditLoader />, ssr: false });

export interface BlogType {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  imageUrl?: string | null;
}

interface CommonBlogProps {
  blog: BlogType;
  editable?: boolean;
  onSave?: (blog: BlogType) => void;
  onCancel?: () => void;
  onEdit?: () => void;
  loading?: boolean;
  currentUserId?: number | string; // Optional prop to check if the blog belongs to the current user
}

const CommonBlog: React.FC<CommonBlogProps> = ({
  blog,
  editable = false,
  onSave,
  onCancel,
  onEdit,
  loading = false,
  currentUserId
}) => {
  const [editing, setEditing] = useState(editable);
  const [localBlog, setLocalBlog] = useState<BlogType>(blog);
  const [content, setContent] = useState(blog.content);
  const [title, setTitle] = useState(blog.title);
  const [formErrors, setFormErrors] = useState<any>({});
  const handleSave = async () => {
    setFormErrors({});
    try {
      await validateFormFields({ title, content }, validationConstants.BLOGS);
      if (onSave) onSave({ ...localBlog, title, content });
      setEditing(false);
    } catch (error) {
      setFormErrors(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    onEdit?.();
  };

  const handleCancel = () => {
    setEditing(false);
    setLocalBlog(blog);
    setContent(blog.content);
    setTitle(blog.title);
    if (onCancel) onCancel();
  };
  
  // userId may be string or number depending on backend, so use loose equality
  const canEdit = !('userId' in localBlog) || !localBlog.userId || localBlog.userId == currentUserId;
  return (
    <div className="max-w-2xl mx-auto p-6 rounded shadow-md dark:shadow-[0_4px_24px_0_rgba(255,255,255,0.12)] ">
      <CommonImage
        src={localBlog.imageUrl}
        alt={localBlog.title}
        className="w-full min-h-60 max-h-72 object-cover rounded mb-4 bg-gray-100 dark:bg-neutral-800"
      />
      {localBlog.createdAt && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Published: {formatDayMonthYear(localBlog.createdAt)}
        </div>
      )}
      {editing ? (
        <>
        <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">Blog Title</label>
          <input
            type="text"
            className="text-sm font-bold mb-2 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 dark:text-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <FieldError text={formErrors?.title} />
        </>
      ) : (
        <h1 className="text-3xl font-bold mb-2">{localBlog.title}</h1>
      )}
      {editing ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">Blog Image URL</label>
            <input
              id="imageUrl"
              type="text"
              className="w-full border rounded px-3 py-2 mb-2 bg-white dark:bg-neutral-900 dark:text-white"
              value={localBlog.imageUrl || ''}
              onChange={e => setLocalBlog({ ...localBlog, imageUrl: e.target.value })}
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
              onBlur={newContent => { setContent(newContent); setLocalBlog({ ...localBlog, content: newContent }) }}
            />
            <FieldError text={formErrors?.content} />
          </div>
          <PortfolioButton text={loading ? "Saving..." : "Save"} onClick={handleSave} disabled={loading} />
          <PortfolioButton text="Cancel" onClick={handleCancel} className="ml-2" />
        </>
      ) : (
        <>
          <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: localBlog.content }} />
          {canEdit && <PortfolioButton text="Edit" onClick={handleEdit} className="mt-6" />}
        </>
      )}
    </div>
  );
};

export default CommonBlog;
