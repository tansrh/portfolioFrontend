'use client';
import { signUpAction } from "@/actions/authActions";
import FormButton from "@/components/common/FormButton";
import { signUpThunk } from "@/store/auth/authThunks";
import { useAppDispatch } from "@/store/store";
import { setToastMessage } from "@/store/toast/toastMsgSlice";
import { addToast } from "@/store/toast/toastSlice";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormState } from "react-dom";
import { useSelector } from "react-redux";
const Signup: React.FC = () => {
    // const inititalState = {
    //     status: 0,
    //     message: "",
    //     errors: {} as any
    // };
    // const [state, formAction, isPending] = useActionState( signUpAction, inititalState);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        };
        try {
            const result = await dispatch(signUpThunk(values)).unwrap();
            console.log("Sign-up result:", result);
            // dispatch(setToastMessage(result.message));

            if (result.status === 200) {
                dispatch(addToast({ message: result.message }));
                router.push("/signin");
            }
            else {
                dispatch(addToast({ message: result.message, isError: true }));
            }
        } catch (error) {
            console.error("Sign-up error:", error);
        }

    };
    const { data: auth, loading: isPending, errors } = useSelector((state: any) => state.auth);
    if (auth?.user) {
        redirect('/'); // Redirect to home if user is already signed in
    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign Up</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="Your Name"
                />
                {errors?.name && (
                    <span className="text-red-500 text-xs mt-1">{errors.name}</span>
                )}
            </div>
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
                {errors?.email && (
                    <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="new-password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="••••••••"
                />
                {errors?.password && (
                    <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="Re-enter password"
                />
                {errors?.confirmPassword && (
                    <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>
                )}
            </div>
            <FormButton type="submit" isPending={isPending}>
                Sign Up
            </FormButton>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                Already have an account? <Link href="/signin" className="underline hover:text-black dark:hover:text-white">Sign in</Link>
            </div>
        </form>
    )
}
export default Signup;