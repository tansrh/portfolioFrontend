"use client";
import { createContext, useContext } from "react";
import { useGetUPortfolioQuery } from "@/store/services/uApi";

export const PortfolioContext = createContext<any>(null);
export const usePortfolio = () => useContext(PortfolioContext);

export default function ClientPortfolioProvider({ portfolioUrl, children }: { portfolioUrl: string, children: React.ReactNode }) {
    const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);

    return (
        <PortfolioContext.Provider value={{ data, isLoading, error }}>
            {children}
        </PortfolioContext.Provider>
    );
}