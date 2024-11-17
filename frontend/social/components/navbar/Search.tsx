"use client";
import React from "react";
import dynamic from "next/dynamic";
import {FaSearch} from "react-icons/fa";

import Modal from "@/components/modals/Modal";

const SearchModal = dynamic(() => import("@/components/modals/SearchModal"), {
    ssr: false
});

const Search = () => {
    const searchLabel = "Search for gatherings";
    return (
        <Modal>
            <Modal.Trigger name="search">
                <button
                    type="button"
                    className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                >
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
                            <p>{searchLabel}</p>
                            <div className="p-2  bg-rose-500 rounded-full text-white">
                                <FaSearch className="text-[12px] "/>
                            </div>
                        </div>
                    </div>
                </button>
            </Modal.Trigger>
            <Modal.Window name="search">
                <SearchModal/>
            </Modal.Window>
        </Modal>
    );
};

export default Search;
