
import React from "react";
import FieldError from "./FieldError";

interface CommonTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}


const CommonTextInput: React.FC<CommonTextInputProps> = ({ className = "", error, ...props }) => (
  <div className="flex flex-col">
    <input
      className={`w-full px-2 py-1 rounded border dark:bg-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
    <FieldError text={error} />
  </div>
);

export default CommonTextInput;
