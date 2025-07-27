"use server"

import { SIGNIN_URL, SIGNUP_URL } from "@/lib/apiEndpoints";

export async function signUpAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
        const response = await fetch(SIGNUP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });
        const data = await response.json();
        console.log("Response Data:", data);
        if(response.status === 400) {
            return {
                status: 400,
                message: "Field validation failed",
                errors: data.errors || {}
            };
        }
        return {
            status: 200,
            message: data.message || "User registered successfully. Please check your email to verify your account.",
            errors: data.errors || {}
        }

    }
    catch (error) {
        return {
            status: 410,
            message: "Something went wrong. Please try again later.",
            errors: { }
        };

    }
}

export async function signInAction(prevState: any, formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch(SIGNIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log("Response Data:", data);
        if(response.status === 400) {
            return {
                status: 400,
                message: "Field validation failed",
                errors: data.errors || {}
            };
        }

        return {
            status: 200,
            message: data.message || "User signed in successfully.",
            errors: data.errors || {}
        }

    }
    catch (error) {
        return {
            status: 410,
            message: "Something went wrong. Please try again later.",
            errors: { }
        };
    }
}
