import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PrivateUserPage({
                                                  params,
                                              }: {
    params: { user: string };
}) {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.username) {
        redirect("/sign-in");
    }

    const urlUsername = params.user;
    const loggedInUsername = clerkUser.username;

    // 🔒 Check if the URL matches the logged-in user's username
    if (urlUsername !== loggedInUsername) {
        redirect("/not-authorized"); // or show a custom message
    }

    // ✅ Optional: fetch from Prisma if you need extra info
    const user = await prisma.user.findUnique({
        where: { username: urlUsername },
    });

    if (!user) {
        redirect("/404"); // or use notFound()
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome, {user.name || user.username} 👋</h1>
            <p>Email: {user.email}</p>
            <p>Clerk ID: {user.clerkId}</p>
            {/* Render secure data: payments, posts, etc */}
        </div>
    );
}
