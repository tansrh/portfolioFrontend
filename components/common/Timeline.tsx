import React from 'react';
import '../../app/globals.css';

export const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="timeline relative border-l-2 border-gray-300 dark:border-gray-600">
    {React.Children.map(children, (child, idx) => (
      <div className="flex items-start relative" key={idx}>
        {/* Dot with animation */}
        <span className="absolute -left-2 top-12 md:top-13 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 shadow animate-dot-pulse"></span>
        {/* Content */}
        <div className="flex-1 pl-5">{child}</div>
      </div>
    ))}
  </div>
);