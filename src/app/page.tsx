import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import EmailSection from '@/components/EmailSection';
import CardsSection from '@/components/CardSection';
import PageSection from '@/components/PageSection';
import GSAPScrollSection from "@/components/GSAPScrollSection";

export default function Home() {
    return (
        <>
            <Hero />
            <EmailSection />
            {/*<CardsSection />*/}
            <section className="flex flex-col md:flex-row items-center justify-center h-auto md:h-[60vh] text-xl bg-gray-200 px-6 md:pl-10 md:pr-20 gap-10 md:gap-20 py-10 md:py-0">
                <div className="flex h-[40vh] md:w-2/3 w-full bg-gray-400 justify-center items-center overflow-hidden rounded-md">
                    <video
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture={true}
                    >
                        <source src="/videos/intro-1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="max-w-full md:max-w-1/2 flex flex-col items-start space-y-4 w-full">
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
            <CardsSection />
            <PageSection />
            <GSAPScrollSection />
        </>
    );
}
