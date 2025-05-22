'use client'
//use shadcn for navigation !!!!!!!!!!!!!!!!!!
import Image from "next/image";
import Link from "next/link";
import localFont from 'next/font/local';
import { ChevronDown } from "lucide-react";
import {useEffect, useState} from "react";

const myFont = localFont({
    src: 'LincolnElectric-Over.ttf',
})


export default function Header() {

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-transparent px-10 flex justify-between items-center w-full"
        >
            <Link href="/">
                <div
                    className={"flex flex-row items-center"}>
                    <Image
                        src="/DevolveLogo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <div className={myFont.className}>
                        <h1 className={"-ml-3 text-4xl text-[#a67941] font-light select-none cursor-pointer"}>DEVOLVE STUDIO</h1>
                    </div>
                </div>
            </Link>
            <div className={"flex flex-row items-center gap-5 uppercase text-lg -ml-40"}>
                <Link href="/">
                    <div
                        className={"flex flex-row items-center"}>
                        <h1>products</h1>
                        <ChevronDown />
                    </div>
                </Link>
                <Link href="/">
                    <div
                        className={"flex flex-row items-center"}>
                        <h1>services</h1>
                        <ChevronDown />
                    </div>
                </Link>
            </div>
            <div className={"flex flex-row items-center gap-5 uppercase text-lg"}>
                <Link href="/">
                    <div
                        className={"flex flex-row items-center"}>
                        <h1>log in</h1>
                    </div>
                </Link>
                <Link href="/">
                    <div
                        className={"flex flex-row items-center"}>
                        <h1>contact us</h1>
                    </div>
                </Link>
            </div>
        </header>
    );
}

//  from-[#3d3d3d] to-[#010101]
{/*
    const [isScrolled, setIsScrolled] = useState(false);
    const [isEndScrolled, setIsEndScrolled] = useState(false);

    useEffect(() => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        console.log(pageHeight);
    })*/}