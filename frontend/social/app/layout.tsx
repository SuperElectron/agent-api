'use server';

import React, {ReactNode} from "react";
import {ThemeSwitcher} from "@/components/theme-switcher";
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
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="w-full h-16 bg-gray-800 text-white flex items-center px-4 fixed top-0 left-0 z-10">
                    <Navbar data={data}/>
                </header>

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
