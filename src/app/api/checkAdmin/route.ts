// src/app/api/checkAdmin/route.ts
import { ClerkClient, createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ Create the client manually
const clerkClient: ClerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const isAdmin = user.privateMetadata.role === "admin";

    return NextResponse.json({ isAdmin });
}
