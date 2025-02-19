'use server';

import React, {ReactNode} from "react";
import {ThemeSwitcher} from "@/components/ui/theme-switcher";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "next-themes";
import Navbar from "@/components/navbar";
import "@/app/globals.css";
import {createClient} from "@/utils/supabase/server";

export default async function RootLayout({children}: { children: ReactNode }) {
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();

    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground h-screen w-screen overflow-hidden">

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10 h-16 p-2">
                <Navbar data={data}/>
            </header>

            {/* Main Content subtract two instances of h-16 which is 64pixels => subtrack 128px*/}
            <main className="h-[calc(100vh-128px)] w-full mt-16">
                {children}
            </main>

            {/* Footer */}
            <footer
                className="w-full h-16 bg-gray-800 text-white flex items-center justify-center fixed bottom-0 left-0 z-10"
            >
                <p className="text-sm">Powered by Mat</p>
                <ThemeSwitcher/>
            </footer>
        </ThemeProvider>
        </body>
        </html>
    );
}
