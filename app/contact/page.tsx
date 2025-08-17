"use client";

import FormButton from "@/components/common/FormButton";
import CommonTextarea from "@/components/portfolio/CommonTextarea";
import { useContactUsMutation } from "@/store/services/contactApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToast } from "@/store/toast/toastSlice";
import { useState } from "react";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [contactUs, { isLoading }] = useContactUsMutation();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await contactUs({ name: user?.name, email: user?.email, message }).unwrap();
      dispatch(addToast({ message: result?.message }));
      setMessage("");
    } catch (error: any) {
      const errorMsg = error?.message || "Failed to send message.";
      console.error("Error submitting contact form:", error);
      dispatch(addToast({ message: errorMsg, isError: true }));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-350 to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 flex justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-lg h-max">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Have questions, feedback, or partnership ideas? We’d love to hear from
          you! Fill out the form below or email us at{" "}
          <a
            href="mailto:support@yourcompany.com"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            support@yourcompany.com
          </a>
          .
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CommonTextarea
            placeholder="How can we help you?"
            name="message"
            value={message}
            rows={5}
            onChange={(e)=>{setMessage(e.target.value);}}
            required
          />
          <FormButton type="submit" disabled={isLoading || !user}>
            {isLoading ? "Sending..." : "Send Message"}
          </FormButton>
        </form>
        <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm text-center">
          Our team typically responds within 24 hours.
        </div>
      </div>
    </main>
  );
}