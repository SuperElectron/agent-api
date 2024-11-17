"use client";

import React from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

interface GoogleMapProps {
    markers: Array<{ lat: number; lng: number; popupText?: string }>;
}

const containerStyle = {
    width: "100%",
    height: "500px",
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({markers}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDB_U0l4Bug2TXRvCPox_acSzaVWma1vIE",
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    const defaultCenter = markers.length > 0 ? {lat: markers[0].lat, lng: markers[0].lng} : {lat: 0, lng: 0};

    return (
        <div style={{width: "100%", height: "500px"}}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={7}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={{lat: marker.lat, lng: marker.lng}}/>
                ))}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapComponent;
