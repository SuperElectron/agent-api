"use client"
import {FC} from "react";
import useSearchModal from "./useSearchModal"
import {IoSearch} from "react-icons/io5"
import SearchModal from "./SearchModal"
import {LocationValue} from "@/types/locationType";


const SearchComponent: FC<LocationValue> = (props: LocationValue) => {
    const modalControl = useSearchModal(props);
    return (
        <>
            <div onClick={modalControl.onOpen}
                 className="flex items-center justify-center w-full pl-0 text-sm phone:pl-5 small:pl-0">
                <div
                    className="flex flex-row-reverse phone:flex-row justify-between w-full phone:w-max items-center border border-border-gray rounded-full shadow-md phone:shadow-sm hover:shadow-md">

                    {/* For bigger screen */}
                    <div className="w-auto phone:flex items-center justify-between hidden">
                    <span
                        className="px-4 overflow-hidden text-light-gray whitespace-nowrap cursor-pointer">
                        Search
                    </span>
                    </div>

                    {/* For phone screen */}
                    <div className="w-full phone:hidden flex flex-col">
                    <span
                        className="overflow-hidden text-light-gray whitespace-nowrap cursor-pointer">
                        Search
                    </span>
                    </div>

                    <span
                        className="w-8 h-8 phone:p-2 rounded-full text-light-gray phone:text-white phone:bg-accent-pink flex items-center justify-center">
                    <IoSearch size={20}/>
                </span>
                </div>
            </div>
            {/* Modal */}
            <SearchModal controls={modalControl}/>
        </>
    )
}

export default SearchComponent