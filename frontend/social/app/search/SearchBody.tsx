'use client';

import React, {useState} from "react";
import dynamic from "next/dynamic";
import Categories from "@/components/navbar/Categories";

type geoLocationPin = {
    lat: number,
    lng: number,
}

interface HeadingProps {

}

const MapComponent = dynamic(() => import("@/components/Map"), {ssr: false});


const SearchBody: React.FC<HeadingProps> = ({}) => {

    const markers = [
        {lat: 40.7128, lng: -74.006, popupText: "New York City"},
        {lat: 34.0522, lng: -118.2437, popupText: "Los Angeles"},
    ];

    // TODO: update so that if nothing is found, it will render these
    const title = "No exact matches";
    const subtitle = "Try changing or removing some of your filters.";
    const gatherings = null;

    return (
        <div className="w-full h-full flex flex-col">
            {/* Categories Section */}
            <div className="relative z-1 p-2">
                <Categories/>
            </div>

            {/* Map Section */}
            <div className="flex-1 w-full">
                <MapComponent markers={markers}/>
            </div>
        </div>


        // <div className="w-full h-full max-w-screen-lg">
        //     <MapComponent markers={markers}/>
        //     {/*{gatherings ? (*/}
        //     {/*    <div className="text-center">*/}
        //     {/*        <h3 className="font-bold leading-[1.25]">{title}</h3>*/}
        //     {/*        <p className="font-light text-neutral-500 md:mt-1 mt-2">{subtitle}</p>*/}
        //     {/*    </div>*/}
        //     {/*) : (<></>)*/}
        //     {/*}*/}
        // </div>
    )
        ;
};

export default SearchBody;
