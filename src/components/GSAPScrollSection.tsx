'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPScrollSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: true,
                    pin: true,
                },
            });

            // Slide "One" in from left
            tl.from(".step.one", {
                x: "-100vw",
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            });

            // Slide "Two" in from right, overlapping timeline for smoothness
            tl.from(".step.two", {
                x: "100vw",
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            }, "<"); // "<" means start at same time as previous animation ends

            // Slide "Three" in from bottom with fade
            tl.from(".step.three", {
                y: "100vh",
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            }, "<");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[100vh] flex flex-col justify-center items-center gap-8"
        >
            <div className="step one text-6xl text-black">One</div>
            <div className="step two text-6xl text-black">Two</div>
            <div className="step three text-6xl text-black">Three</div>
        </section>
    );
}
