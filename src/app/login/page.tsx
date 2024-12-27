// import ClientComponent from "~/components/ClientComponent";
// import ServerComponent from "~/components/ServerComponent";

// export default function Home() {
//     return (
//         <main className="flex flex-col items-center justify-center w-full h-screen gap-y-5">
//             <h1 className="font-bold text-xl">Welcome to sample.</h1>
//             <ClientComponent />
//             <ServerComponent />
//         </main>
//     );
// }
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="border h-screen flex items-center justify-center">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-red-500 text-center">{error}</p>
                )}
            </div>
        </div>
    );
}
