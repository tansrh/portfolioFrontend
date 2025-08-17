import CommonImage from "@/components/portfolio/CommonImage";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
}

export default function PublicBlog({ blog }: { blog: Blog }) {
  return (
    <div className="w-full max-w-3xl bg-white dark:bg-black rounded-xl shadow-xl p-6 md:p-10 relative overflow-y-scroll">
      {/* Blog Image */}
      
        <div className="mb-6">
          <CommonImage
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full max-h-72 object-cover rounded-lg"
          />
        </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{blog.title}</h2>

      {/* Date */}
      <div className="text-gray-500 text-sm mb-4">
        {blog.createdAt &&
          new Date(blog.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
      </div>

      {/* Blog Content */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content || "" }}
      />
    </div>
  );
}