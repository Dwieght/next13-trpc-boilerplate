"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { trpc } from "~/app/_trpc/client";

export default function DashboardPage() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const {
        data: youtubeLinks,
        isLoading: linksLoading,
        error: linksError,
    } = trpc.getAllLinks.useQuery();

    console.log("getAllLinks", youtubeLinks);
    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/dashboard");
    };

    if (status === "loading" || linksLoading) return <div>Loading...</div>;
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }
    if (linksError) return <div>Error loading links: {linksError.message}</div>;

    return (
        <>
            <nav className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="text-xl font-bold">MiPocket</div>
                <div className="flex items-center space-x-4">
                    <span className="font-medium pe-5">
                        {session?.user?.email}
                    </span>
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-10 w-10 rounded-full p-0"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40"
                                        alt="User avatar"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <ChevronDown
                                    className={`ml-2 h-4 w-4 transition-transform border-none duration-200 me-10 ${
                                        isOpen ? "rotate-180 border-none" : ""
                                    }`}
                                />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            <div className="flex justify-center items-center h-52 border">
                What&apos;s on your mind?
            </div>
            <div className="flex flex-col justify-center items-center h-52 border">
                <ul className="list-none">
                    {youtubeLinks?.map((link) => (
                        <li key={link.id} className="mb-2">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
