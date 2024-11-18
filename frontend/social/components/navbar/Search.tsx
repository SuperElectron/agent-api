"use client";
import React from "react";
import dynamic from "next/dynamic";
import {FaSearch} from "react-icons/fa";

import Modal from "@/components/modals/Modal";

const SearchModal = dynamic(() => import("@/components/modals/SearchModal"), {
    ssr: false
});

interface SearchProps {
    clsName: string;
}

const Search: React.FC<SearchProps> = ({clsName}: SearchProps) => {
    const searchLabel = "Search for gatherings";

    return (
        <div className={`relative flex items-center ${clsName}`}>
            {/* Search bar*/}

            {/* Advanced options pop up*/}
            <Modal>
                <Modal.Trigger name="search">
                    <button
                        type="button"
                        className={`border-[1px] w-full py-2 rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer ${clsName}`}
                    >
                        <div className="flex justify-between items-center w-full px-4">
                            <p className="text-sm text-gray-600">{searchLabel}</p>
                            <div className="p-2 bg-rose-500 rounded-full text-white">
                                <FaSearch className="text-[12px]"/>
                            </div>
                        </div>
                    </button>
                </Modal.Trigger>
                <Modal.Window name="search">
                    <SearchModal/>
                </Modal.Window>
            </Modal>

        </div>
    );
};

export default Search;
