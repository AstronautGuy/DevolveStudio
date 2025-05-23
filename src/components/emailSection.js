import React from "react";
import AnimatedTextCycle from "./animated-text-cycle";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function EmailSection() {
    return (
        <section className="bg-gray-300 flex md:flex-row flex-col items-center justify-between md:px-20 px-5 md:py-15 py-5 space-y-4 md:space-y-0">
        <div className="p-4 max-w-[500px]">
            <h1 className="text-4xl font-light text-left text-muted-foreground">
                Your{" "}
                <AnimatedTextCycle
                    words={[
                        "business",
                        "team",
                        "workflow",
                        "productivity",
                        "projects",
                        "analytics",
                        "dashboard",
                        "platform"
                    ]}
                    interval={3000}
                    className="text-foreground font-semi-bold"
                />{" "}
                deserves better design <b className={"text-black"}>.</b>
            </h1>
        </div>
        <div className="flex flex-col w-full md:max-w-1/2 space-y-4">
            <div className="flex items-center space-x-2">
                <Input type="email" placeholder="Email" className="bg-white py-7 px-7 rounded-0 placeholder:text-lg placeholder:font-light text-lg" />
                <Button type="submit" className="py-7 px-7 text-lg">Subscribe</Button>
            </div>
            <p className="text-gray-800 font-light text-lg">
                Connect with our expert team to bring your website to life—fast, effortless, and tailored to you.
            </p>
        </div>
    </section>
    );
}
