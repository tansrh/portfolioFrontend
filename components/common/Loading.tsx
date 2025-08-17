import React from "react";

const Loading: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-pulse">
    <svg className="w-12 h-12 text-blue-600 mb-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <p className="text-lg text-gray-700 dark:text-gray-300">Loading, please wait...</p>
  </div>
);

export default Loading;
