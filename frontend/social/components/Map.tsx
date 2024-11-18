"use client";

import React, {useRef} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import { MdGpsFixed } from "react-icons/md";


interface GoogleMapProps {
    markers: Array<{ lat: number; lng: number; popupText?: string }>;
}

const containerStyle = {
    width: "100%",
    height: "100%",
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({markers}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDB_U0l4Bug2TXRvCPox_acSzaVWma1vIE",
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        fitBoundsToMarkers();
    };

    const fitBoundsToMarkers = () => {
        if (mapRef.current && markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach((marker) => bounds.extend({lat: marker.lat, lng: marker.lng}));
            mapRef.current.fitBounds(bounds);
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    const mapOptions = {
        fullscreenControl: false,
        rotateControl: true,
        overviewMapControl: true,
        mapTypeControl: true,
        // rotateControlOptions: {
        //     position: google.maps.ControlPosition.LEFT_CENTER,
        // },
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
        },
    };

    return (
        <div className="relative w-full h-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                options={mapOptions}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={{lat: marker.lat, lng: marker.lng}}/>
                ))}
            </GoogleMap>
            <button
                className="absolute bottom-20 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                onClick={fitBoundsToMarkers}
            >
                <MdGpsFixed size={18} />
            </button>
        </div>
    );
};

export default GoogleMapComponent;
