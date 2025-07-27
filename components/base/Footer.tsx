
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-600 dark:text-gray-300 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/privacy"
          className="hover:underline hover:text-black dark:hover:text-white transition"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="hover:underline hover:text-black dark:hover:text-white transition"
        >
          Terms of Service
        </Link>
        <Link
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-black dark:hover:text-white transition"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
