"use client";

import React, {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import SearchParams from "@/app/search/SearchParams";
import SearchBar from "@/app/search/SearchBar";

const SearchDrawer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"params" | "bar">("params");

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        console.log('toggled drawer');
    }, [isDrawerOpen]);

    const handleSearch = (searchQuery: string, priceRange: number) => {
        console.log("Search Query:", searchQuery);
        console.log("Price Range:", priceRange);
        // Implement the API call or search logic here.
    };

    return (
        <div className="relative flex h-full w-full">
            {/* Drawer */}
            <div
                className={`fixed left-0 bg-white shadow-lg z-40 transition-transform duration-300 ${
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                } w-1/4`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-bold">Search Options</h2>
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleDrawer}
                    >
                        Close
                    </button>
                </div>
                <div className="w-full h-[calc(100vh-128px)] p-2 overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab("params")}
                            className={`px-4 py-2 ${
                                activeTab === "params"
                                    ? "border-b-2 border-blue-500"
                                    : "text-gray-500"
                            }`}
                        >
                            Configs
                        </button>
                        <button
                            onClick={() => setActiveTab("bar")}
                            className={`px-4 py-2 ${
                                activeTab === "bar"
                                    ? "border-b-2 border-blue-500"
                                    : "text-gray-500"
                            }`}
                        >
                            Search
                        </button>
                    </div>

                    {/* Content */}
                    <div className="w-full">
                        {activeTab === "params" ? (
                            <SearchParams onSearch={handleSearch}/>
                        ) : (
                            <SearchBar/>
                        )}
                    </div>
                </div>
            </div>
            {/* Drawer Toggle Button */}
            {isDrawerOpen ? (
                <></>
            ) : (
                <>
                    <button
                        className="absolute top-4 left-4 z-50 bg-white p-2 rounded-full shadow hover:shadow-md"
                        onClick={toggleDrawer}
                    >
                        <FaSearch className="text-gray-600 text-lg"/>
                    </button>
                </>
            )}

            {/* Main Content (Map) */}
            <div
                className={`transition-all duration-300 h-full ${
                    isDrawerOpen
                        ? "absolute left-[25%] w-[calc(100%-25%)] "
                        : "absolute left-0 w-full "
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default SearchDrawer;
