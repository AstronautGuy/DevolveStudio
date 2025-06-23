'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
//import NavigationMenuComponent from "@/components/NavigationMenu";
import {
    UserButton,
    SignInButton,
    SignedOut,
    SignedIn, UserProfile,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const BillIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
             stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-notepad-text-icon lucide-notepad-text">
            <path d="M8 2v4"/>
            <path d="M12 2v4"/>
            <path d="M16 2v4"/>
            <rect width="16" height="18" x="4" y="4" rx="2"/>
            <path d="M8 10h6"/>
            <path d="M8 14h8"/>
            <path d="M8 18h5"/>
        </svg>
    )
}

export default function Header() {
    const pathname = usePathname();

    const hiddenRoutes = [
        "/sign-in",
        "/sign-up",
        "/users",
        "/admin",
        "/404",
        "/500",
        "/not-authorized"
    ]

    const shouldHideHeader = hiddenRoutes.some(route =>
        pathname.startsWith(route.replace(/\[.*?\]/g, '')) // crude dynamic match
    );

    const {user, isLoaded} = useUser();
    const role = user?.publicMetadata?.role;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrollStage, setScrollStage] = useState("top");

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.body.scrollHeight - windowHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent < 1) {
                setScrollStage("top");
            } else if (scrollPercent >= 1 && scrollPercent < 100) {
                setScrollStage("mid");
            } else {
                setScrollStage("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const headerClass = `
        fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 
        flex justify-between items-center w-full transition-all duration-300 font-light py-4
        ${scrollStage === "top" ? "bg-transparent" : ""}
        ${scrollStage === "mid" ? "bg-black text-white" : ""}
        ${scrollStage === "scrolled" ? "bg-black text-white" : ""}
    `;

    if (shouldHideHeader) {
        return null; // Don't render the header for these routes
    }
    return (
        <>
            <header className={headerClass}>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/DevolveLogo.png"
                        alt="Logo"
                        width={56}
                        height={56}
                        className="w-14 h-14"
                        draggable={false}
                        priority
                    />
                    <div className="font-lincoln">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#a67941] font-light select-none cursor-pointer ">
                            DEVOLVE STUDIO
                        </h1>
                    </div>
                </Link>

                {/*<div
    onMouseEnter={() => setScrollStage("mid")}
    onMouseLeave={() => setScrollStage("start")}
    className={"hidden md:block"}
        >
        <NavigationMenuComponent />
    </div>*/}

                <div
                    onMouseEnter={() => setScrollStage("mid")}
                    onMouseLeave={() => setScrollStage("start")}
                    className="hidden md:flex flex-row items-center gap-4 text-sm sm:text-base lg:text-lg uppercase">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <Link href="/" className={"bg-white px-4 py-4 text-black hover:bg-black hover:text-white"}>
                        Contact
                    </Link>
                    {isLoaded && role === "admin" && (
                        <Link href="/admin" className={"bg-white px-4 py-4 text-black hover:bg-black hover:text-white"}>
                            Dashboard
                        </Link>
                    )}
                    <SignedIn>
                        <UserButton>
                            <UserButton.UserProfileLink label="Payments and History" url="/users/me" labelIcon={<BillIcon />} />
                        </UserButton>
                    </SignedIn>
                </div>

                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67941]"
                    aria-label="Toggle menu"
                    onClick={() => setDrawerOpen(true)}
                >
                    <Menu size={24} />
                </button>

            </header>

            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                        <Image src="/DevolveLogo.png" alt="Logo" width={40} height={40} />
                        <div className="font-lincoln">
                            <h1 className="text-lg font-light text-[#a67941] select-none cursor-pointer">
                                DEVOLVE STUDIO
                            </h1>
                        </div>
                    </Link>

                    <button
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67941]"
                        onClick={() => setDrawerOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col mt-6 gap-6 px-6 uppercase text-xl font-semibold">
                    <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-[#a67941] transition">
                        Products <ChevronDown size={20} />
                    </Link>
                    <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-[#a67941] transition">
                        Services <ChevronDown size={20} />
                    </Link>
                    <Link href="/" onClick={() => setDrawerOpen(false)} className="hover:text-[#a67941] transition">
                        Log In
                    </Link>
                    <Link href="/" onClick={() => setDrawerOpen(false)} className="hover:text-[#a67941] transition">
                        Contact Us
                    </Link>
                </nav>
            </aside>
        </>
    );
}
