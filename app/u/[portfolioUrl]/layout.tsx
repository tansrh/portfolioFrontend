import Navbar from "@/components/base/Navbar";
import ClientPortfolioProvider from "./ClientPortfolioProvider";

export default function Layout({ children, params }: { children: React.ReactNode, params: { portfolioUrl: string } }) {
    const { portfolioUrl } = params;

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