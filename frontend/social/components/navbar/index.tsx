import React, {Suspense} from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import AuthButton from "@/components/header-auth";

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = async () => {
    // TODO: pull user from supabase
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    return data.user ? (
        <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10">
            <nav className="w-full flex justify-between items-center h-16 px-4">
                {/* Logo on the left */}
                <div className="flex-shrink-0 pl-2">
                    <Logo/>
                </div>

                {/* Search bar in the center */}
                <div className="flex-1 flex justify-center">
                    <Suspense fallback={<></>}>
                        <Search clsName={'w-3/5 p-4'}/>
                    </Suspense>
                </div>

                {/* UserMenu on the right */}
                <div className="flex-shrink-0 pr-2 z-99">
                    <UserMenu user={data.user}/>
                </div>
            </nav>
        </header>
    ): (
        <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10">
            <nav className="w-full flex justify-between items-center h-16 px-4">
                {/* Logo on the left */}
                <div className="flex-shrink-0 pl-2">
                    <Logo/>
                </div>

                {/* Log in and logout */}
                <div className="flex-shrink-0 pr-2 z-99">
                    <AuthButton/>
                </div>
            </nav>
        </header>
)
    ;
};

export default Navbar;
