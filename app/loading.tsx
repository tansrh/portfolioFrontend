export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
      <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-white mb-4"></span>
      <span className="text-gray-600 dark:text-gray-300 text-lg">Loading...</span>
    </div>
  );
}