import React from "react";
import { Component } from "@/components/ui/liquid-chrome";

export default function ChromeSection() {
    return (
        <div className="w-screen h-screen bg-black overflow-hidden">
            <Component
                baseColor={[0.1, 0.1, 0.1]}
                speed={0.2}
                amplitude={0.6}
                frequencyX={3.0}
                frequencyY={2.0}
                interactive={true}
            />
        </div>
    );
};