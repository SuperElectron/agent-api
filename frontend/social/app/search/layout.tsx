import React, {ReactNode} from "react";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "next-themes";
import Navbar from "@/components/navbar";
import {ThemeSwitcher} from "@/components/theme-switcher";

export default function SearchLayout({children}: { children: ReactNode }) {
    return (
        // we want it to fit the screen, and not enable any scrolling because the map should span the entire height!
        <html lang="en" className={` ${GeistSans.className} h-full w-full`}>
        <body className="h-full w-full overflow-hidden">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {/*<header*/}
            {/*    className="w-full h-16 bg-gray-800 text-white flex items-center px-4 fixed top-0 left-0 z-10">*/}
            {/*    <Navbar/>*/}
            {/*</header>*/}
            <main className="h-full w-full flex flex-col">
                {children}
            </main>
            {/*<footer*/}
            {/*    className="w-full h-16 bg-gray-800 text-white flex items-center justify-center fixed bottom-0 left-0 z-10">*/}
            {/*    <p className="text-sm">Powered by Mat</p>*/}
            {/*    <ThemeSwitcher/>*/}
            {/*</footer>*/}
        </ThemeProvider>
        </body>
        </html>
    );
}
