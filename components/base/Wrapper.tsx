// /components/base/HeaderFooterWrapper.tsx
"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "../common/Toast";

export default function Wrapper({ children }:Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname.startsWith("/u/");
    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" }
    ]
    return (
        <>
            
                {!hideHeaderFooter && <><Navbar navItems={navItems} /><Toast /></>}

                <main className="flex-1 w-full justify-center items-center">
                    {children}
                </main>
                {!hideHeaderFooter && <Footer />}
            
        </>
    );
}