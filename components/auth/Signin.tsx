'use client'
import FormButton from "../common/FormButton"
import { signInAction } from "@/actions/authActions";
import { signInThunk } from "@/store/auth/authThunks";
import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, type AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { setToastMessage } from "@/store/toast/toastMsgSlice";
import Link from "next/link";
import { addToast } from "@/store/toast/toastSlice";

const Signin: React.FC = () => {
    // const inititalState = {
    //         status: 0,
    //         message: "",
    //         errors: {} as any
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        try {
            const result = await dispatch(signInThunk(values)).unwrap();
            // dispatch(setToastMessage(result.message));
            
            if (result.status === 200) {
                dispatch(addToast({ message: result.message }));
                router.push("/");
            }
            else{
                dispatch(addToast({ message: result.message, isError: true }));
            }
        } catch (err) {
            console.error("Sign-in error:", err);
        }

    };
    // const [state, formAction, isPending] = useActionState( signInAction, inititalState);
    const { loading: isPending, errors } = useSelector((state: any) => state.auth);
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign In</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="you@example.com"
                />
            </div>
            {errors?.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="••••••••"
                />
            </div>
            {errors?.password && (
                <span className="text-red-500 text-xs mt-1">{errors.password}</span>
            )}
            <FormButton type="submit" isPending={isPending}>
                Sign In
            </FormButton>
            <div className="flex justify-between items-center">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                Don't have an account? <Link href="/signup" className="underline hover:text-black dark:hover:text-white">Sign up</Link>
            </div>
            <div className="text-center text-sm mt-2">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
            </div>
            </div>
        </form>
    )
}
export default Signin;