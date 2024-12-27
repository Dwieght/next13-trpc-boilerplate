"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    if (status === "loading") return <div>Loading...</div>;
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            Welcome to your Dashboard{session?.user?.email}
            <Button>Click me</Button>
        </div>
    );
}
