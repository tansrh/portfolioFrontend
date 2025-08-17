import React from "react";

interface PortfolioButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PortfolioButton: React.FC<PortfolioButtonProps> = ({ text, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type}
    className={`px-3 py-1 rounded transition bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default PortfolioButton;
