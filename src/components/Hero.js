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
            <main className={"flex items-center justify-center h-screen text-xl bg-green-500 px-20"}>
                <div className={"max-w-1/2"}>
                    <p className={"text-8xl font-light"}>Empower your online presence <br /> with
                        <TypewriterText
                            segments={text}
                            speed={150}
                            initialDelay={50}
                            className="inline"
                        /></p>
                </div>
                <div className={"flex h-[40vh] w-1/2 bg-gray-400 justify-center items-center"}>
                    <p>3D Model</p>
                </div>
            </main>
    );
}