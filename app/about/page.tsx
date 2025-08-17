'use client';

import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 flex items-center justify-center mt-5">
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
          Empowering Your Digital Portfolio Journey
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          <span className="font-semibold text-black dark:text-white">We believe every professional deserves a stunning online presence.</span> 
          Our platform enables users to effortlessly create, customize, and showcase their portfolios—no coding required.
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To provide the most intuitive and powerful portfolio builder for creators, developers, designers, and professionals worldwide. 
            We are committed to helping you stand out, share your story, and connect with opportunities.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>✨ Effortless drag-and-drop portfolio creation</li>
            <li>🎨 Beautiful, customizable templates</li>
            <li>🔒 Secure and privacy-focused</li>
            <li>🌎 Share your work with a global audience</li>
            <li>💡 Continuous innovation and support</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Thousands of Satisfied Users</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you’re a student, freelancer, or seasoned professional, our platform is designed to help you shine. 
            Start building your portfolio today and unlock new opportunities!
          </p>
        </div>
      </div>
    </main>
  );
}