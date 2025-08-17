"use client";
import PublicPortfolioMain from "@/components/U/PublicPortfolioMain";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import { use, Suspense, useEffect } from "react";
import Head from "next/head";
import { usePortfolio } from "./ClientPortfolioProvider";

export default function Page({ params }: { params: Promise<{ portfolioUrl: string }> }) {
    const { portfolioUrl } = use(params);
    // const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);
    const { data, isLoading, error } = usePortfolio();
    useEffect(() => {
        const name = data?.portfolio.personalDetails?.name || "Portfolio";
        const about = data?.portfolio.personalDetails?.about
            ? data?.portfolio.personalDetails.about.replace(/<[^>]+>/g, "").slice(0, 160)
            : "View this portfolio.";
        document.title = `${name}'s Portfolio`;
    }, [data]);
    if (isLoading) return <div>Loading...</div>;
    if (error || !data?.portfolio) return <div>Portfolio not found.</div>;

    return (
        <Suspense fallback={<div>Loading portfolio...</div>}>
            <PublicPortfolioMain portfolio={data.portfolio} />
        </Suspense>
    );
}
