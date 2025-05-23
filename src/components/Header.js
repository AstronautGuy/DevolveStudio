'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 sm:px-6 lg:px-10 flex justify-between items-center w-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/DevolveLogo.png"
                        alt="Logo"
                        width={56}
                        height={56}
                        className="w-14 h-14"
                        priority
                    />
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#a67941] font-light select-none cursor-pointer">
                        DEVOLVE STUDIO
                    </h1>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-row items-center gap-4 text-sm sm:text-base lg:text-lg uppercase">
                    <Link href="/" className="flex items-center gap-1">
                        Products <ChevronDown size={16} />
                    </Link>
                    <Link href="/" className="flex items-center gap-1">
                        Services <ChevronDown size={16} />
                    </Link>
                </nav>

                <div className="hidden md:flex flex-row items-center gap-4 text-sm sm:text-base lg:text-lg uppercase">
                    <Link href="/">Log In</Link>
                    <Link href="/">Contact Us</Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67941]"
                    aria-label="Toggle menu"
                    onClick={() => setDrawerOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-none bg-opacity-60 z-40"
                    onClick={() => setDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Fullscreen Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                        <Image src="/DevolveLogo.png" alt="Logo" width={40} height={40} />
                        <h1 className="text-lg font-light text-[#a67941] select-none cursor-pointer">
                            DEVOLVE STUDIO
                        </h1>
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
