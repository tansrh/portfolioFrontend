'use client';
import FormButton from "@/components/common/FormButton";
import { useAppDispatch } from "@/store/store";
import { addToast } from "@/store/toast/toastSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { forgotPasswordThunk } from "@/store/auth/authThunks";
import { useEffect } from "react";

const ForgotPassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading: isPending, errors } = useSelector((state: any) => state.auth);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = {
            email: formData.get("email") as string,
        };
        try {
            const result = await dispatch(forgotPasswordThunk(values)).unwrap();
            
            if (result.status === 200) {
                dispatch(addToast({ message: result.message }));
                router.push("/signin");
            }
            else{
                dispatch(addToast({ message: result.message, isError: true }));
            }
        } catch (err) {
            console.error("Forgot password error:", err);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Forgot Password</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                />
                {errors?.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                )}
            </div>
            <FormButton isPending={isPending} type="submit">Send Reset Link</FormButton>
            <div className="flex justify-between text-sm mt-2">
                <Link href="/signin" className="text-blue-600 hover:underline">Back to Sign In</Link>
                <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
        </form>
    );
};

export default ForgotPassword;
