"use client";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { signoutThunk } from "@/store/auth/authThunks";
import { addToast } from "@/store/toast/toastSlice";
import { setUser } from "@/store/auth/authSlice";
interface NavItemProps {
    href: string;
    label: string;
    handleClick?: () => void;
}
export const NavItem: React.FC<NavItemProps> = memo(function NavItem({ href, label, handleClick }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`flex items-center box-border border-b-2 ${isActive ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-gray-700 dark:text-white hover:text-black"
                }`}
            style={{ height: '100%' }}
        >
            {label}
        </Link>
    );
});
NavItem.displayName = "NavItem";

// ThemeToggle component
export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark") ? "dark" : "light";
        }
        return "light";
    });

    const setDocumentTheme = (newTheme: "light" | "dark") => {
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
    };

    const handleTheme = (newTheme: "light" | "dark") => {
        setTheme(newTheme);
        setDocumentTheme(newTheme);
    };

    useEffect(() => {
        // On mount, set theme from localStorage if available
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        } else if (saved === "light") {
            document.documentElement.classList.remove("dark");
            setTheme("light");
        }
    }, []);

    return (
        <div className="flex items-center space-x-2 ml-4">
            <button
                onClick={() => handleTheme("light")}
                className={`p-2 cursor-pointer rounded-full border ${theme === "light" ? " border-gray-400" : "bg-transparent border-transparent"}`}
                aria-label="Switch to light mode"
            >
                {/* Sun icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
                </svg>
            </button>
            <button
                onClick={() => handleTheme("dark")}
                className={`p-2 cursor-pointer rounded-full border ${theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-transparent border-transparent"}`}
                aria-label="Switch to dark mode"
            >
                {/* Moon icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-2000">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
            </button>
        </div>
    );
};

// UserProfileMenu component
const UserProfileMenu: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const router = useRouter();
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const handleSignout = async () => {
        const result: any = await dispatch(signoutThunk()).unwrap();

        if (result.status === 200) {
            dispatch(addToast({ message: result.message }));
            dispatch(setUser(null));
            router.replace("/");

        } else {
            dispatch(addToast({ message: result.message, isError: true }));
        }
        setOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
                aria-label="User menu"
                onClick={() => setOpen((v) => !v)}
            >
                {/* User icon */}
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-3.314 3.134-6 8-6s8 2.686 8 6" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 p-4 flex flex-col gap-2 min-w-[180px]">
                    {user ? (
                        <>
                            <div className="mb-2">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Welcome,</div>
                                <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                            <button
                                onClick={handleSignout}
                                className="w-full py-2 px-4 rounded bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                            >
                                Signout
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-2 text-gray-700 dark:text-gray-200 text-sm">Welcome! <br />  Please sign in to continue.</div>
                            <Link
                                href="/signin"
                                className="w-full block py-2 px-4 rounded bg-black text-white dark:bg-white dark:text-black font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                                onClick={() => setOpen(false)}
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const Navbar: React.FC<{navItems: NavItemProps[]}> = ({navItems=[]}) => {
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();
    const handleNav = useCallback(() => {
        setLoading(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            timeoutRef.current = null;
        }, 1200);
        setDrawerOpen(false); // close drawer on nav
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Theme toggle logic
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark") ? "dark" : "light";
        }
        return "light";
    });
    useEffect(() => {
        // On mount, set theme from localStorage if available
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        } else if (saved === "light") {
            document.documentElement.classList.remove("dark");
            setTheme("light");
        }
    }, []);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [drawerOpen]);

    return (
        <nav className="w-full px-4 bg-white dark:bg-black border-b border-gray-200 flex flex-col items-stretch justify-between  z-30 fixed">
            <div className="flex justify-between h-12 w-full py-0 items-center">
                {/* Desktop nav */}
                <div className="hidden md:flex h-full items-stretch space-x-4 leading-8">
                    {/* <NavItem href="/" label="Home" handleClick={handleNav} />
                    <NavItem href="/about" label="About" handleClick={handleNav} />
                    <NavItem href="/contact" label="Contact" handleClick={handleNav} /> */}
                    {
                        navItems?.map((item, index) => (
                            <NavItem key={index} href={item.href} label={item.label} handleClick={item.handleClick ?? handleNav} />
                        ))
                    }
                </div>
                {/* Hamburger for mobile */}
                <button
                    className="md:hidden flex items-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
                    aria-label="Open navigation menu"
                    onClick={() => setDrawerOpen(true)}
                >
                    {/* Hamburger icon */}
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                   {!pathname?.startsWith("/u/") && <UserProfileMenu /> }
                </div>
            </div>
            {/* Drawer overlay */}
            {drawerOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40"
                        onClick={() => setDrawerOpen(false)}
                        aria-label="Close navigation menu"
                    />
                    <aside
                        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-lg z-50 flex flex-col pt-8 px-6 transition-transform duration-300 transform translate-x-0 animate-slide-in-left"
                        style={{ minWidth: 220 }}
                    >
                        <button
                            className="absolute top-3 right-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
                            aria-label="Close navigation menu"
                            onClick={() => setDrawerOpen(false)}
                        >
                            {/* Close icon */}
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <nav className="flex flex-col gap-6 mt-8">
                            {/* <NavItem href="/" label="Home" handleClick={handleNav} />
                            <NavItem href="/about" label="About" handleClick={handleNav} />
                            <NavItem href="/contact" label="Contact" handleClick={handleNav} /> */}
                            {
                                navItems?.map((item, index) => (
                                    <NavItem key={index} href={item.href} label={item.label} handleClick={item.handleClick ?? handleNav} />
                                ))
                            }
                        </nav>
                    </aside>
                </>
            )}
            {/* Simple loading bar */}
            {loading && (
                // <div className="absolute left-0 bottom-0 h-1 w-full bg-black dark:bg-white animate-navbar-progress" />
                <Loader />
            )}
            {/* Drawer slide-in animation */}
            <style jsx global>{`
                @keyframes slide-in-left {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-left {
                    animation: slide-in-left 0.3s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </nav>
    );
};
export const Loader = () => (
    <div className="absolute left-0 bottom-0 h-1 w-full bg-black dark:bg-white animate-navbar-progress" />
)
export default Navbar;