"use client";

import React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Airplay } from "lucide-react";

type ComponentItem = {
    title: string;
    href: string;
    description: string;
};

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    children: React.ReactNode;
};

const components: ComponentItem[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, ...props }, ref) => (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
);
ListItem.displayName = "ListItem";

export default function NavigationMenuComponent() {
    return (
        <div className="relative">
            <NavigationMenu>
                <NavigationMenuList className="max-w-full">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent
                            data-motion="from-start"
                            className="w-[500px] max-w-full overflow-hidden rounded-md bg-black shadow-lg"
                        >
                            <ul className="grid gap-3 p-4 md:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Airplay className="h-6 w-6 text-white" />
                                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground text-gray-400">
                                                Beautifully designed components built with Radix UI and Tailwind CSS.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                  <span className="text-gray-300">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </span>
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                  <span className="text-gray-300">
                    How to install dependencies and structure your app.
                  </span>
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                  <span className="text-gray-300">
                    Styles for headings, paragraphs, lists...etc
                  </span>
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent
                            data-motion="from-start"
                            className="w-[500px] max-w-full overflow-hidden rounded-md bg-black shadow-lg"
                        >
                            <ul className="grid gap-3 p-4 md:grid-cols-2">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        className="text-gray-300"
                                    >
                                        <span className="text-gray-400">{component.description}</span>
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
