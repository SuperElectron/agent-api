import React, {ReactNode} from "react";
import {ThemeSwitcher} from "@/components/ui/theme-switcher";
import {GeistSans} from "geist/font/sans";
import {ThemeProvider} from "next-themes";
import "@/app/globals.css";
import {createClient} from "@/utils/supabase/server";
import Navbar from "@/components/navbar";


export default async function AuthLayout({children}: { children: ReactNode }) {
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Navbar data={data}/>

            {/* Main Content */}
            <main className="flex justify-center mt-16 mb-16 p-4">
                {children}
            </main>


            {/* Footer */}
            <footer
                className="w-full h-16 bg-gray-800 text-white flex items-center justify-center fixed bottom-0 left-0 z-10">
                <p className="text-sm">Powered by Mat</p>
                <ThemeSwitcher/>
            </footer>
        </ThemeProvider>
    );
}
