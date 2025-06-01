"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type Segment = {
    text: string;
    bold?: boolean;
};

type TypewriterTextProps = {
    segments: Segment[];
    speed?: number;
    initialDelay?: number;
    className?: string;
    onComplete?: () => void;
};

export default function TypewriterText({
                                           segments = [],
                                           speed = 50,
                                           initialDelay = 0,
                                           className = "",
                                           onComplete,
                                       }: TypewriterTextProps) {
    const totalLength = segments.reduce(
        (sum, segment) => sum + (segment.text?.length || 0),
        0
    );

    const [currentCharCount, setCurrentCharCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isInView && currentCharCount < totalLength) {
            if (currentCharCount === 0 && initialDelay > 0) {
                timer = setTimeout(() => setCurrentCharCount(1), initialDelay);
            } else {
                timer = setTimeout(
                    () => setCurrentCharCount((prev) => prev + 1),
                    speed
                );
            }
        } else if (currentCharCount === totalLength && onComplete) {
            onComplete();
        }

        return () => clearTimeout(timer);
    }, [isInView, currentCharCount, totalLength, speed, initialDelay, onComplete]);

    let remaining = currentCharCount;

    const renderedSegments = segments.map((segment, index) => {
        const segLength = segment.text?.length || 0;
        let textToShow = "";

        if (remaining > 0) {
            textToShow =
                remaining >= segLength
                    ? segment.text
                    : segment.text.substring(0, remaining);
            remaining = Math.max(0, remaining - segLength);
        }

        return (
            <span key={index} className={segment.bold ? "font-bold" : ""}>
            {textToShow}
            </span>
    );
    });

    return (
        <span ref={ref} className={className}>
        {renderedSegments}
    {isInView && (
        <span className="border-r-4 border-black animate-blink ml-1"></span>
    )}
    </span>
);
}
