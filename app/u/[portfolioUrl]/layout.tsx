import Navbar from "@/components/base/Navbar";
import ClientPortfolioProvider from "./ClientPortfolioProvider";
import { use } from "react";

export default function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ portfolioUrl: string }> }) {
    const { portfolioUrl } = use(params);

    const navItems = [
        { href: `/u/${portfolioUrl}`, label: "Home" },
        { href: `/u/${portfolioUrl}/blogs`, label: "Blogs" }
    ];

    return (
        <>
            <Navbar navItems={navItems} />
            <ClientPortfolioProvider portfolioUrl={portfolioUrl}>
                {children}
            </ClientPortfolioProvider>
        </>
    );
}