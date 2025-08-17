"use client";
import PublicPortfolioMain from "@/components/U/PublicPortfolioMain";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import { use, Suspense } from "react";

export default function Page({ params }: { params: Promise<{ portfolioUrl: string }> }) {
    const { portfolioUrl } = use(params);
    const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);

    if (isLoading) return <div>Loading...</div>;
    if (error || !data?.portfolio) return <div>Portfolio not found.</div>;

    return (
        <Suspense fallback={<div>Loading portfolio...</div>}>
            <PublicPortfolioMain portfolio={data.portfolio} />
        </Suspense>
    );
}
