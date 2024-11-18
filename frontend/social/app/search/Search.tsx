"use client";

import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {FaSearch} from "react-icons/fa";
import Modal from "react-modal";

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

    const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

    const onSubmit: SubmitHandler<SearchOptions> = (data) => {
        // API call logic
        console.log("Search Data:", data);
        alert(`Searching for: ${data.searchQuery} with advanced options: ${JSON.stringify(data.advancedOptions)}`);
    };

    const handleAdvancedOptionsSave = (location: string, includeNearby: boolean) => {
        setValue("advancedOptions", {location, includeNearby});
        setIsAdvancedModalOpen(false);
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

            {/* Advanced options button */}
            <button
                type="button"
                onClick={() => setIsAdvancedModalOpen(true)}
                className="text-gray-700 py-2 px-4 rounded-lg border-gray-300 border-1 shadow hover:bg-gray-200 transition"
            >
                Advanced Options
            </button>

            {/* Advanced options modal */}
            <Modal
                isOpen={isAdvancedModalOpen}
                onRequestClose={() => setIsAdvancedModalOpen(false)}
                className="bg-white w-1/2 mx-auto mt-20 rounded-lg shadow-lg p-6 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-bold mb-4">Advanced Options</h2>
                <div className="flex flex-col gap-4">
                    {/* Location Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            {...register("advancedOptions.location")}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                            placeholder="Enter a location"
                        />
                    </div>

                    {/* Include Nearby Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...register("advancedOptions.includeNearby")}
                            className="h-4 w-4 text-rose-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">Include nearby results</label>
                    </div>

                    {/* Save Button */}
                    <button
                        type="button"
                        onClick={() =>
                            handleAdvancedOptionsSave(
                                watch("advancedOptions.location"),
                                watch("advancedOptions.includeNearby")
                            )
                        }
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    >
                        Save Options
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Search;
