import React, {ReactNode} from "react";
import {ThemeSwitcher} from "@/components/theme-switcher";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "next-themes";
import "./globals.css";
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
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                {/*<header className="w-full h-16 bg-gray-800 text-white flex items-center px-4 fixed top-0 left-0 z-10">*/}
                {/*    <Navbar/>*/}
                {/*</header>*/}

                {/* Main Content */}
                <main className="flex-1 flex flex-col mt-16 mb-16 overflow-hidden">
                    {children}
                </main>


                {/* Footer */}
                <footer
                    className="w-full h-16 bg-gray-800 text-white flex items-center justify-center fixed bottom-0 left-0 z-10">
                    <p className="text-sm">Powered by Mat</p>
                    <ThemeSwitcher/>
                </footer>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
