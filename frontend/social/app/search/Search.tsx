"use client";

import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {FaSearch} from "react-icons/fa";

interface SearchProps {
    clsName: string;
}

interface SearchOptions {
    searchQuery: string;
    advancedOptions: {
        location: string;
        includeNearby: boolean;
    };
}


const Search: React.FC<SearchProps> = ({clsName}: SearchProps) => {
    const {register, handleSubmit, watch, setValue} = useForm<SearchOptions>({
        defaultValues: {
            searchQuery: "",
            advancedOptions: {
                location: "",
                includeNearby: false,
            },
        },
    });

    const onSubmit: SubmitHandler<SearchOptions> = (data) => {
        // API call logic
        console.log("Search Data:", data);
        alert(`Searching for: ${data.searchQuery} with advanced options: ${JSON.stringify(data.advancedOptions)}`);
    };


    return (
        <div className={`relative flex flex-col gap-4 ${clsName}`}>
            {/* Search bar */}
            <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
                <input
                    {...register("searchQuery")}
                    type="text"
                    placeholder="Search for gatherings"
                    className="border-[1px] w-full py-2 px-4 rounded-full shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="absolute right-2 p-2 bg-rose-500 rounded-full text-white"
                >
                    <FaSearch/>
                </button>
            </form>
        </div>
    );
};

export default Search;
