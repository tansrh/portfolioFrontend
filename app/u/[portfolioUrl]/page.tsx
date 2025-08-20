"use client";
import PublicPortfolioMain from "@/components/U/PublicPortfolioMain";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import { use, Suspense, useEffect } from "react";
import Head from "next/head";
import { usePortfolio } from "./ClientPortfolioProvider";
import { useAppDispatch } from "@/store/store";
import { addToast } from "@/store/toast/toastSlice";

export default function Page({ params }: { params: Promise<{ portfolioUrl: string }> }) {
    const { portfolioUrl } = use(params);
    // const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = usePortfolio();
    useEffect(()=>{
        if (!isLoading && (error || !data?.portfolio)) {
            if(error?.data?.message){
               dispatch(addToast({message: error?.data?.message, isError: true}))
            }
        }
        else if(data){
            const name = data?.portfolio.personalDetails?.name || "Portfolio";
        const about = data?.portfolio.personalDetails?.about
            ? data?.portfolio.personalDetails.about.replace(/<[^>]+>/g, "").slice(0, 160)
            : "View this portfolio.";
        document.title = `${name}'s Portfolio`;
        }
    }, [error, data, isLoading]);
    if (isLoading) return <div className="max-w-2xl mx-auto p-6">Loading...</div>;

    return (
            <PublicPortfolioMain portfolio={data?.portfolio} />
    );
}
