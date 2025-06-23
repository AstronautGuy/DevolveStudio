import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export default async function PrivateUserPage(props: any) {
    const { params } = props;
    const urlUsername = params.user;

    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.username) {
        redirect("/sign-in");
    }

    const loggedInUsername = clerkUser.username;

    if (urlUsername !== loggedInUsername) {
        redirect("/not-authorized");
    }

    const user = await prisma.user.findUnique({
        where: { username: urlUsername },
    });

    if (!user) {
        redirect("/404");
    }

    return (
        <SidebarProvider>
            <Sidebar className={"w-[500px]"}>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}