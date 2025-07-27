import React from "react";
import FieldError from "./FieldError";

interface CommonTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
}

const CommonTextarea: React.FC<CommonTextareaProps> = ({ className = "", error, ...props }) => (
  <div className="flex flex-col">
    <textarea
      className={`w-full px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100 h-24 resize-y ${className}`}
      {...props}
    />
    <FieldError text={error} />
  </div>
);

export default CommonTextarea;
