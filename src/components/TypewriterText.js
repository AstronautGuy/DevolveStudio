"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypewriterText({
                                         segments = [],
                                         speed = 50,
                                         initialDelay = 0,
                                         className = "",
                                         onComplete, // New prop to detect when typing finishes
                                       }) {
  const totalLength = segments.reduce(
      (sum, segment) => sum + (segment.text ? segment.text.length : 0),
      0,
  );
  const [currentCharCount, setCurrentCharCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    let timer;
    if (isInView && currentCharCount < totalLength) {
      if (currentCharCount === 0 && initialDelay > 0) {
        timer = setTimeout(() => setCurrentCharCount(1), initialDelay);
      } else {
        timer = setTimeout(
            () => setCurrentCharCount(currentCharCount + 1),
            speed,
        );
      }
    } else if (currentCharCount === totalLength && onComplete) {
      onComplete(); // Call onComplete when typing finishes
    }
    return () => clearTimeout(timer);
  }, [
    isInView,
    currentCharCount,
    totalLength,
    speed,
    initialDelay,
    onComplete,
  ]);

  let remaining = currentCharCount;
  const renderedSegments = segments.map((segment, index) => {
    const segLength = segment.text ? segment.text.length : 0;
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
