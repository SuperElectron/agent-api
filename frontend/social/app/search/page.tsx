import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";
import SearchBody from "./SearchBody";

export default async function Search() {
    const supabase = await createClient();
    const {data,} = await supabase.auth.getUser();
    if (!data) {
        return redirect("/sign-in");
    }

    // const mapData = await supabase.from('events').select('location, activity');
    // console.table(mapData);

    return (
        <div className="h-full w-full flex flex-col">
            <SearchBody/>
        </div>
    );
}
