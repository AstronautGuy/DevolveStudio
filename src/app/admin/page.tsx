// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<null | boolean>(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/checkAdmin")
            .then(res => res.json())
            .then(data => {
                if (!data.isAdmin) {
                    router.push("/"); // redirect non-admins
                } else {
                    setIsAdmin(true);
                }
            })
            .catch(() => {
                router.push("/"); // redirect on error
            });
    }, []);

    if (isAdmin === null) {
        return <p>Checking admin access...</p>;
    }

    return (
        <section className={" flex flex-col items-center justify-center bg-gray-300 p-10 text-center text-gray-800 font-light h-screen"}>
        </section>
    );
}
