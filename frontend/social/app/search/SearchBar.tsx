'use client';

import React, {Suspense, useState} from "react";
import {FaStar} from "react-icons/fa";
import Search from "./Search";

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

const SearchBar: React.FC = () => {

    const events: Event[] = [
        {
            id: 1,
            name: "MAYAN COFFEES Organic Specialty Coffee - Roasters - Direct Trade",
            rating: 4.8,
            reviews: 1359,
            priceRange: "€1–10",
            address: "C/ de Murillo, 54",
            openStatus: "Opens soon: 7:30 AM",
            popupText: "MAYAN COFFEES Organic Specialty Coffee",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Takeaway", "No delivery"],
        },
        {
            id: 2,
            name: "Cult Café",
            rating: 4.8,
            reviews: 944,
            priceRange: "€10–20",
            address: "C/ de l'Arquebisbe Mayoral, 7, Bajo",
            openStatus: "Closed: Opens 8:30 AM",
            popupText: "Cult Café",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Kerbside pickup"],
        },
        {
            id: 3,
            name: "Café Colomer Specialty Coffee Roasters",
            rating: 4.9,
            reviews: 111,
            priceRange: "€1–10",
            address: "Plaça de Fra Lluís Colomer, 7, Bajo B",
            openStatus: "Closed: Opens 8:00 AM",
            popupText: "Café Colomer Specialty Coffee Roasters",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Takeaway"],
        },
        {
            id: 4,
            name: "Café Colomer Specialty Coffee Roasters",
            rating: 4.9,
            reviews: 111,
            priceRange: "€1–10",
            address: "Plaça de Fra Lluís Colomer, 7, Bajo B",
            openStatus: "Closed: Opens 8:00 AM",
            popupText: "Café Colomer Specialty Coffee Roasters",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Takeaway"],
        },
        {
            id: 5,
            name: "Café Colomer Specialty Coffee Roasters",
            rating: 4.9,
            reviews: 111,
            priceRange: "€1–10",
            address: "Plaça de Fra Lluís Colomer, 7, Bajo B",
            openStatus: "Closed: Opens 8:00 AM",
            popupText: "Café Colomer Specialty Coffee Roasters",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Takeaway"],
        },
        {
            id: 6,
            name: "Café Colomer Specialty Coffee Roasters",
            rating: 4.9,
            reviews: 111,
            priceRange: "€1–10",
            address: "Plaça de Fra Lluís Colomer, 7, Bajo B",
            openStatus: "Closed: Opens 8:00 AM",
            popupText: "Café Colomer Specialty Coffee Roasters",
            image: "/events/coffee-store.png",
            tags: ["Dine-in", "Takeaway"],
        },
    ];


    return (
        <div className="flex w-full h-full">
            <div className="overflow-y-auto p-2">
                <Suspense fallback={<></>}>
                    <Search clsName="w-full p-2"/>
                </Suspense>

                {/* Event Cards */}
                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="p-4 flex flex-col border-b"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm">{event.name}</h3>
                                    <div className="flex items-center text-yellow-500 space-x-1 mt-1">
                                        <FaStar size={14}/>
                                        <span className="text-sm font-medium">{event.rating}</span>
                                        <span className="text-xs text-gray-500">
                                    ({event.reviews})
                                </span>
                                        <span className="text-gray-500">· {event.priceRange}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{event.address}</p>
                                    <p
                                        className={`text-xs font-medium mt-1 ${
                                            event.openStatus.includes("Closed")
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {event.openStatus}
                                    </p>
                                </div>

                                {/* Image */}
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </div>

                            {/* Tags Row */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {event.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700"
                                    >
                                {tag}
                            </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
