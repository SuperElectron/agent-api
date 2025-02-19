"use client";

import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import {useForm} from "react-hook-form";

interface SearchParamsProps {
    onSearch: (searchQuery: string, priceRange: number, category: string, date: string) => void;
}

const SearchParams: React.FC<SearchParamsProps> = ({onSearch}: SearchParamsProps) => {
    const [price, setPrice] = useState(50);
    const {register, handleSubmit} = useForm<{ searchQuery: string; category: string; date: string }>();

    const onSubmit = (data: { searchQuery: string; category: string; date: string }) => {
        onSearch(data.searchQuery, price, data.category, data.date);
    };

    return (
        <div className="relative w-full space-y-6 p-2">
            {/* Search Bar */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative flex flex-col w-full max-w-lg mx-auto space-y-6"
            >
                <div className="relative h-12 w-full">
                    <input
                        {...register("searchQuery")}
                        type="text"
                        placeholder="Search for gatherings"
                        className="border-[1px] w-full h-full p-4 rounded-full shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full text-white flex items-center justify-center"
                    >
                        <FaSearch/>
                    </button>
                </div>

                {/* Price Range Slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: €{price}</label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        {...register("category")}
                        className="border-[1px] w-full h-12 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    >
                        <option value="All">All Categories</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Food">Food</option>
                        <option value="Networking">Networking</option>
                    </select>
                </div>

                {/* Date Picker */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                        {...register("date")}
                        type="date"
                        className="border-[1px] w-full h-12 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchParams;
