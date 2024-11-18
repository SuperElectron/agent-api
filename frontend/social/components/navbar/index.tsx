"use client";

import React, {useState} from "react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import AuthButton from "@/components/header-auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FaBars} from "react-icons/fa";

interface NavbarProps {
    data: any;
}

const Navbar: React.FC<NavbarProps> = async ({data}: NavbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return data.user ? (
        <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10">
            <nav className="w-full flex justify-between items-center h-16 px-4 relative">
                {/* Logo on the left */}
                <div className="flex-shrink-0 pl-2">
                    <Logo/>
                </div>

                {/* Center Navigation Links */}
                <div className="hidden md:flex gap-2 text-gray-500">
                    <Button asChild size="sm" variant={"default"}>
                        <Link href="/feed">Feed</Link>
                    </Button>
                    <Button asChild size="sm" variant={"outline"}>
                        <Link href="/search">Search</Link>
                    </Button>
                </div>

                {/* Dropdown Trigger for Small Screens */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleDropdown} className="p-2 rounded focus:outline-none">
                        <FaBars className="text-gray-700" size={24}/>
                    </button>
                </div>

                {/* UserMenu on the right */}
                <div className="flex-shrink-0 pr-2 z-20">
                    <UserMenu user={data.user}/>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div
                        className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 z-10 md:hidden">
                        <ul className="flex flex-col gap-2 p-4">
                            <li>
                                <Link href="/feed" className="text-gray-700 hover:text-black">
                                    Feed
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-gray-700 hover:text-black">
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    ) : (
        <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10">
            <nav className="w-full flex justify-between items-center h-16 px-4 relative">
                {/* Logo on the left */}
                <div className="flex-shrink-0 pl-2">
                    <Logo/>
                </div>

                {/* Center Navigation Links */}
                <div className="hidden md:flex gap-2 text-gray-500">
                    <Button asChild size="sm" variant={"default"}>
                        <Link href="/feed">Feed</Link>
                    </Button>
                    <Button asChild size="sm" variant={"outline"}>
                        <Link href="/search">Search</Link>
                    </Button>
                </div>

                {/* Dropdown Trigger for Small Screens */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleDropdown} className="p-2 rounded focus:outline-none">
                        <FaBars className="text-gray-700" size={24}/>
                    </button>
                </div>

                {/* Auth Buttons */}
                <div className="flex-shrink-0 pr-2 z-20">
                    <AuthButton/>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div
                        className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 z-10 md:hidden">
                        <ul className="flex flex-col gap-2 p-4">
                            <li>
                                <Link href="/feed" className="text-gray-700 hover:text-black">
                                    Feed
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-gray-700 hover:text-black">
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
