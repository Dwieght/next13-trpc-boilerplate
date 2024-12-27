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

import Link from "next/link";

export default function Home() {
    return (
        <div className="border h-screen flex items-center justify-center">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-sm">
                <Link
                    href="/login"
                    className="w-full px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Signin
                </Link>
            </div>
        </div>
    );
}
