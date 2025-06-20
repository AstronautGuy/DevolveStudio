// app/users/me/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MePage() {
    const user = await currentUser();

    if (!user || !user.username) {
        redirect("/sign-in"); // Or show fallback
    }

    // 👇 Redirect to their profile URL
    redirect(`/users/${user.username}`);
}
