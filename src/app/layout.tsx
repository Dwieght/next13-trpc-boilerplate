"use client"; // Required for client-side hooks

import "./globals.css";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Provider from "./_trpc/Provider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "500", "700", "900"],
    preload: true,
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <SessionProvider>
                    <Provider>{children}</Provider>
                </SessionProvider>
            </body>
        </html>
    );
}
