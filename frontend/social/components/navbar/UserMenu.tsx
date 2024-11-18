"use client";
import React from "react";
import {useRouter} from "next/navigation";

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";
import Menu from "@/components/Menu";
import {signOutAction} from "@/app/actions";

import Modal from "@/components/modals/Modal";

import {appRoutes} from "@/utils/routes";
import Link from "next/link";

interface UserMenuProps {
    user?: any;
}

const UserMenu: React.FC<UserMenuProps> = ({user}) => {
    const router = useRouter();

    // TODO: use the user's image instead from supabase
    const avatar_image = '/avatar/avatar.png';

    const redirect = (url: string) => {
        router.push(url);
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <Modal>
                    <Modal.Trigger name={user ? "share" : "Login"}>
                        <Link href={user ? '/c/create' : '/sign-in'} >
                            <button
                                type="button"
                                className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]"
                            >
                                Create
                            </button>
                        </Link>
                    </Modal.Trigger>
                    <Menu>
                        <Menu.Toggle id="user-menu">
                            <button
                                type="button"
                                className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition duration-300"
                            >
                                <AiOutlineMenu/>
                                <div className="hidden md:block">
                                    <Avatar src={avatar_image}/>
                                </div>
                            </button>
                        </Menu.Toggle>
                        <Menu.List className="shadow-[0_0_36px_4px_rgba(0,0,0,0.075)] rounded-xl bg-white text-sm text-[#585858]">
                            {user ? (
                                <>
                                    {appRoutes.map((item) => (
                                        <MenuItem
                                            label={item.label}
                                            onClick={() => redirect(item.path)}
                                            key={item.label}
                                        />
                                    ))}
                                    <hr/>
                                    <MenuItem
                                        label="Log out"
                                        onClick={() => signOutAction()}
                                    />
                                </>
                            ) : (
                                <>
                                    <Modal.Trigger name="Login">
                                        <MenuItem
                                            label="Log in"
                                            onClick={() => redirect("/sign-up")}
                                        />
                                    </Modal.Trigger>

                                    <Modal.Trigger name="Sign up">
                                        <MenuItem
                                            label="Sign up"
                                            onClick={() => redirect("/sign-up")}
                                        />
                                    </Modal.Trigger>
                                </>
                            )}
                        </Menu.List>
                    </Menu>
                </Modal>
            </div>
        </div>
    );
};

export default UserMenu;
