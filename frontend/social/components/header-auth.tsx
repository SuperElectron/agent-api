import {signOutAction} from "@/app/actions";

import Link from "next/link";
import {Button} from "./ui/button";
import {createClient} from "@/utils/supabase/server";
import SearchComponent from "@/components/Search/SearchComponent";
import {LocationValue} from "@/types/locationType";
import {encodedRedirect} from "@/utils/utils";


export default async function AuthButton() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    // TODO: add user table to hold recent configs. Pull settings from user table
    // TODO: pass location so SearchComponent
    // TODO: add custom field to the user table, so that we can have their location there!
    const loc_value: LocationValue = {
        location: 'Valencia, Spain',
        geo_location: [39.47384555589707, -0.37565742551236747]
    };

    return user ? (
        <div className="w-full p-3 flex flex-col md:flex-row items-center md:justify-between">
            {/* Top Section: User Info (responsive) */}
            <div className="w-full md:w-auto flex justify-end md:order-2 mb-3 md:mb-0">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Hey, {user.email}!</span>
                    <form action={signOutAction}>
                        <Button type="submit" variant="outline">
                            Sign out
                        </Button>
                    </form>
                </div>
            </div>

            {/* Bottom Section: Search Bar */}
            {/*<div className="flex-1 flex justify-center md:order-1">*/}
            {/*    <div className="text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">*/}
            {/*        <SearchComponent location={loc_value.location} geo_location={loc_value.geo_location}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

    ) : (
        <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}
