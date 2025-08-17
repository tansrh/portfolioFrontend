'use client'
import Navbar from "@/components/base/Navbar";
import { useGetUPortfolioQuery } from "@/store/services/uApi";
import { use, useEffect, Suspense } from "react";

import { createContext, useContext } from "react";

export const PortfolioContext = createContext<any>(null);

export const usePortfolio = () => useContext(PortfolioContext);
const Layout: React.FC<{children: React.ReactNode, params: Promise<{ portfolioUrl: string }>}> = ({children, params})=>{
    const {portfolioUrl} = use(params);
    const { data, isLoading, error } = useGetUPortfolioQuery(portfolioUrl);

    const navItems = [
        { href: `/u/${portfolioUrl}`, label: "Home" },
        { href: `/u/${portfolioUrl}/blogs`, label: "Blogs" }
    ];

    return (
        <>
        <PortfolioContext.Provider value={{ data, isLoading, error }}>
            <Navbar navItems={navItems} />
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
            </PortfolioContext.Provider>
        </>
    )
}
export default Layout;