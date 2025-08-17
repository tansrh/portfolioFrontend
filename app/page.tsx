import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <section className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
          Build Your Portfolio Website Instantly
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create a beautiful, personalized portfolio to showcase your experiences, projects, and skills. Get your own unique link in seconds. No coding required.
        </p>
        <Link href="/dashboard">
          <Button className="px-8 py-3 text-lg font-semibold rounded shadow bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer">
            Get Started
          </Button>
        </Link>
        <div className="mt-10 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
          <span>✨ 100% free • No signup required to preview</span>
          <span>🔗 Your portfolio at <span className="font-mono text-gray-700 dark:text-gray-200">yourdomain.com/username</span></span>
        </div>
      </section>
    </main>
  );
}
