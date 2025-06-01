"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
};

const NavigationMenu1 = ({
                          className,
                          children,
                          viewport = true,
                          ...props
                        }: NavigationMenuProps) => {
  return (
      <NavigationMenuPrimitive.Root
          data-slot="navigation-menu"
          data-viewport={viewport}
          className={cn(
              "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
              className
          )}
          {...props}>
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuPrimitive.Root>
  );
};

const NavigationMenuList = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={cn(
            "group/list flex flex-1 list-none items-center justify-center space-x-1",
            className
        )}
        {...props}
    />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center font-light rounded-md px-4 py-2 text-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default:
              "bg-transparent hover:bg-black font-light hover:text-white focus:bg-black focus:text-white data-[state=open]:bg-black data-[state=open]:text-white",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
);

const NavigationMenuTrigger = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}>
      {children}
    </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
            // animation classes (leave as is)
            "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out " +
            "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out " +
            "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 " +
            "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 " +

            // fixed positioning to dropdown, centered below trigger
            "absolute left-1/2 top-full z-50 " +

            // transform for perfect centering horizontally
            "-translate-x-1/2 mt-2 " +

            // width - max width and responsive
            "max-w-[90vw] w-[600px] sm:w-auto " +

            // visual styles: background, border, shadow
            "bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg " +

            // padding inside content
            "p-4 " +

            // box-sizing to include padding and border
            "box-border " +

            // overflow handling - scroll if content too big
            "overflow-auto " +

            className
        )}
        {...props}
    />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Link>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Link
        ref={ref}
        className={cn("block select-none rounded-sm px-3 py-1 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)}
        {...props}
    />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuIndicator = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
            className
        )}
        {...props}>
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-black" />
    </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

const NavigationMenuViewport = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
    <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
      <NavigationMenuPrimitive.Viewport
          className={cn(
              "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full rounded-md bg-black shadow-md transition-all duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]",
              className
          )}
          ref={ref}
          {...props}
      />
    </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

export {
  NavigationMenu1,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
