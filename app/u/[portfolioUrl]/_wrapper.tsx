"use client";
import Loading from "@/components/common/Loading";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import { notFound } from "next/navigation";

export default function PortfolioDataWrapper({ portfolioUrl, children }: { portfolioUrl: string, children: React.ReactNode}) {
  const { data, isLoading: loadingPortfolio } = useGetUPortfolioQuery(portfolioUrl);
  if (loadingPortfolio || !data) return <Loading />;
  if (!data) return notFound();

  return <>{children}</>;
}