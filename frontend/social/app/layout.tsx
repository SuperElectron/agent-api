import React, {ReactNode} from 'react';
import {ThemeSwitcher} from "@/components/theme-switcher";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "next-themes";
import "./globals.css";
// import HeaderAuth from "@/components/header-auth";
import Navbar from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen p-2">
                {/* Header */}
                <header className="w-full z-10">
                    <Navbar/>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center w-full h-full pt-[64px]">
                    {children}
                </main>

                {/* Footer */}
                <footer
                    className="w-full flex items-center justify-center border-t text-center text-xs gap-2 p-2 bg-background z-10">
                    <p>Powered by Mat</p>
                    <ThemeSwitcher/>
                </footer>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
