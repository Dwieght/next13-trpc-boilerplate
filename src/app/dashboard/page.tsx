"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    if (status === "loading") return <div>Loading...</div>;
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return <div>Welcome to your Dashboard{session?.user?.email}</div>;
}
