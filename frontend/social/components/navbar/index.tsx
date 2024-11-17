import React, {Suspense} from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = async () => {
    // TODO: pull user from supabase
    const user = 'user';

    return (
        <header className="fixed top-0 left-0 w-full bg-white z-10 border-b border-b-foreground/10">
            <nav className="w-full flex justify-between items-center h-16 px-4">
                {/* Logo on the left */}
                <div className="flex-shrink-0 pl-2">
                    <Logo/>
                </div>

                {/* Search bar in the center */}
                <div className="flex-1 flex justify-center">
                    <Suspense fallback={<></>}>
                        <Search/>
                    </Suspense>
                </div>

                {/* UserMenu on the right */}
                <div className="flex-shrink-0 pr-2 z-99">
                    <UserMenu user={user}/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
