import Navbar from "@/components/base/Navbar";
import { use } from "react";

const Layout: React.FC<{children: React.ReactNode, params: Promise<{ portfolioUrl: string }>}> = ({children, params})=>{
    const {portfolioUrl} = use(params);
    const navItems = [
        { href: `/u/${portfolioUrl}`, label: "Home" },
        { href: `/u/${portfolioUrl}/blogs`, label: "Blogs" }
    ]
    return (
        <>
            <Navbar navItems={navItems} />
            {children}
        </>
    )
}
export default Layout;