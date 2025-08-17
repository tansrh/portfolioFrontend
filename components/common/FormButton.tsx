'use client';
type FormButtonProps = {
  children: React.ReactNode; 
  className?: string;       
  disabled?: boolean;       
  type?: "submit" | "button" | "reset";
  isPending?: boolean;
  onClick?: () => void;
};

export default function FormButton({ children, className = "", disabled, type = "submit", isPending, onClick }: FormButtonProps) {
  return (
    <button
      type={type}
      className={`w-full py-2 px-4 rounded bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer ${className}`}
      disabled={isPending || disabled}
      onClick={onClick}
    >
      {isPending ? "Processing..." : children}
    </button>
  );
}