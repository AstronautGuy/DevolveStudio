'use client'

import TypewriterText from "@/components/TypewriterText";

export default function Hero() {

    const text = [
        {
            text: " DEVolve.",
            bold: false,
        },
    ];

    return (
        <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-green-500 px-4 sm:px-10 lg:px-20 gap-10">
            <div className="w-full lg:w-1/2">
                <p
                    className="font-light leading-tight"
                    style={{
                        fontSize: 'clamp(1.5rem, 4vw + 1rem, 5rem)', // fluid font size from ~24px to 80px
                    }}
                >
                    Empower your online presence <br />
                    with <TypewriterText segments={text} speed={150} initialDelay={50} className="inline" />
                </p>
            </div>
            <div className="h-60 sm:h-[40vh] w-full lg:w-1/2 bg-gray-400 flex justify-center items-center">
                <p>3D Model</p>
            </div>
        </main>
    );
}
