import { NextResponse, NextRequest } from "next/server";

// Function to check authentication status
export function middleware(req: NextRequest) {
    const isAuthenticated = req.cookies.has("next-auth.session-token");
    const url = req.url;

    if (!isAuthenticated && !url.includes("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

// Define where the middleware applies (for protected pages)
export const config = {
    matcher: ["/dashboard/*", "/profile/*", "/protected/*"],
};
