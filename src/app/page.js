'use client'

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Hero from "@/components/Hero";

export default function Home() {

    return (
        <>
            <Hero />
            <section className="bg-gray-300 flex items-center justify-between px-20 py-15">
                <div>
                    <p className="font-light text-3xl">Get your website built in just a click</p>
                </div>
                <div className="flex flex-col w-full max-w-1/2 space-y-4">
                    <div className="flex items-center space-x-2">
                        <Input type="email" placeholder="Email" className="bg-white py-7 px-7 rounded-0 placeholder:text-lg placeholder:font-light text-lg" />
                        <Button type="submit" className="py-7 px-7 text-lg">Subscribe</Button>
                    </div>
                    <p className="text-gray-800 font-light text-lg">
                        Connect with our expert team to bring your website to life—fast, effortless, and tailored to you.
                    </p>
                </div>
            </section>
            <section className="flex items-center justify-center h-[60vh] text-xl bg-gray-200 pl-10 pr-20 gap-20">
                <div className="flex h-[40vh] w-2/3 bg-gray-400 justify-center items-center overflow-hidden">
                    <video
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/videos/intro-1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="max-w-1/2 flex flex-col items-start space-y-4">
                    <Link href="/" className="flex flex-row gap-2 animate-border font-semibold">
                        Create a website <ArrowRight />
                    </Link>
                    <p className="font-light">
                        Design a website using our industry-leading website templates, designer fonts, and color palettes.
                    </p>

                    <Link href="/" className="flex flex-row gap-2 animate-border font-semibold">
                        Sell your products and offerings <ArrowRight />
                    </Link>
                    <p className="font-light">
                        Create an online store, book appointments, or sell your services or content—all on a single platform built just for you.
                    </p>

                    <Link href="/" className="flex flex-row gap-2 animate-border font-semibold">
                        Market your business <ArrowRight />
                    </Link>
                    <p className="font-light">
                        Promote your business and grow your customer base with email marketing, social media, and SEO tools.
                    </p>
                </div>
            </section>

        </>
    );
}