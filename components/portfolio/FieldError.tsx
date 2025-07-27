import React from "react";

interface FieldErrorProps {
  text?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ text }) => {
  if (!text) return null;
  return (
    <div className="text-xs text-red-500 mt-1">{text}</div>
  );
};

export default FieldError;
