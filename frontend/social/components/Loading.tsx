"use client";

import { useEffect, useState } from "react";

const messages = {
    en: [
        "One moment, we are just getting that page for you!",
    ],
    it: [
        "Un attimo... stiamo pensando",
    ]
};

export default function Loader() {
    const [locale, setLocale] = useState("en");
    const [showLoader, setShowLoader] = useState(false); // State to control when the loader shows up

    useEffect(() => {
        // Delay display of the loader by 1 second
        const timer = setTimeout(() => {
            setShowLoader(true);
        }, 1000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Get the locale from the URL path
        const path = window.location.pathname;
        // Extracts 'en' or 'it' from '/en/*'
        const detectedLocale = path.split("/")[1];
        if (detectedLocale === "it" || detectedLocale === "en") {
            setLocale(detectedLocale);
        }
    }, []);

    const msg = messages[locale as keyof typeof messages] || messages.en;

    // If the loader shouldn't be displayed yet, render nothing
    if (!showLoader) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-8">
            {/* Message */}
            <div className="text-xl text-gray-700">
                {msg[0]}
            </div>

            {/* Spinning loader */}
            <div className="relative w-24 h-24">
                <div
                    className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin-fast"></div>
                <div
                    className="absolute top-2 left-2 w-20 h-20 border-4 border-b-transparent border-blue-300 rounded-full animate-spin-slow"></div>
                <div
                    className="absolute top-4 left-4 w-16 h-16 border-4 border-l-transparent border-blue-100 rounded-full animate-spin-reverse"></div>
            </div>
        </div>
    );
}
