// app/admin/page.tsx
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const { userId } = auth(); // 🔥 This is sync — do NOT await it

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId); // ✅ pulled from Clerk backend
    const role = user?.publicMetadata?.role;

    if (role !== "admin") {
        redirect("/");
    }

    return (
        <div className="p-10 text-center">
            <h1 className="text-4xl font-bold">Welcome, Admin Astronaut 👨‍🚀</h1>
            <p className="mt-4 text-lg text-gray-600">Mission Control is yours.</p>
        </div>
    );
}
