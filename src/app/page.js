'use client'

import TypewriterText from "@/components/TypewriterText";

export default function Home() {

    const text = [
        {
            text: " DEVolve.",
            bold: false,
        },
    ];

    return (
        <main className={"flex items-center justify-center h-screen text-xl bg-green-500 px-15"}>
            <div className={"max-w-1/2"}>
                <p className={"text-8xl font-light"}>Empower your online presence <br /> with
                <TypewriterText
                segments={text}
                speed={150}
                initialDelay={50}
                className="inline" // Triggers when quote finishes
            /></p>
            </div>
            <div className={" h-[40vh] w-1/2 p-4 bg-gray-400"}>
                3D Model
            </div>
        </main>
    );
}