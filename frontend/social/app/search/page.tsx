"use server";

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React, {Suspense} from "react";
import Loading from "@/app/loading";
import Map from "@/components/Map";
import SearchDrawer from "@/app/search/SearchDrawer";


export type Event = {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    priceRange: string;
    address: string;
    openStatus: string;
    popupText: string;
    image: string;
    tags: string[];
}

export type GeoLocationPin = {
    lat: number;
    lng: number;
};


export default async function Search() {
    const supabase = await createClient();
    const {data,} = await supabase.auth.getUser();
    if (!data) {
        return redirect("/sign-in");
    }

    // const mapData = await supabase.from('events').select('location, activity');
    // console.table(mapData);
    const markers: GeoLocationPin[] = [
        {lat: 40.7128, lng: -74.006},
        {lat: 40.6900402350666, lng: -74.04500426408549},
        //40.6900402350666, -74.04500426408549
    ];

    return (
        <div className={'h-[calc(100vh-128px)] w-full'}>
            <SearchDrawer>
                <Suspense fallback={<Loading/>}>
                    <Map markers={markers}/>
                </Suspense>
                {/* ADD ITEMS FOUND */}
            </SearchDrawer>
        </div>
    );
}
