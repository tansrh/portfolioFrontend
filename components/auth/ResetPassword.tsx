'use client';
import FormButton from "@/components/common/FormButton";
import { useAppDispatch } from "@/store/store";
import { addToast } from "@/store/toast/toastSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { resetPasswordThunk } from "@/store/auth/authThunks";
import { useEffect } from "react";

const ResetPassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loading: isPending, errors } = useSelector((state: any) => state.auth);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = {
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
            email: email as string,
            token: token as string,
        };
        try {
            const result = await dispatch(resetPasswordThunk(values)).unwrap();
            dispatch(addToast({ message: result.message }));
            if (result.status === 200) {
                router.push("/signin");
            }
            else{
                dispatch(addToast({ message: result.message, isError: true }));
            }
        } catch (err) {
            console.error("Reset password error:", err);
        }
    };
    useEffect(()=>{
        if(errors.token || errors.email) {
            dispatch(addToast({ message: "Invalid or expired token or email. Please try again.", isError: true }));
        }
    }, [errors])

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Reset Password</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                />
                {errors?.password && (
                    <span className="text-xs text-red-500">{errors.password}</span>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                />
                {errors?.confirmPassword && (
                    <span className="text-xs text-red-500">{errors.confirmPassword}</span>
                )}
            </div>
            <FormButton type="submit">Reset Password</FormButton>
            <div className="flex justify-between text-sm mt-2">
                <Link href="/signin" className="text-blue-600 hover:underline">Back to Sign In</Link>
                <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
        </form>
    );
};

export default ResetPassword;
