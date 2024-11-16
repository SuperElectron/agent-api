"use client"

import Modal from "./Modal"
import LocationInput from "./parameters/Location"
import {useCallback, useEffect} from "react"
import {useParams, useRouter} from "next/navigation"
import qs from "query-string"
import {FC} from 'react';
import SelectOptions from "@/components/Search/parameters/SelectOptions";
import {LocationValue} from "@/types/locationType";


interface SearchModalProps {
    controls: {
        isOpen: boolean;
        onClose: () => void;
        onOpen: () => void;
        onSetLocation: (v: LocationValue) => void;
        getLocation: () => { location: string, geo_location: [number, number] };
    }
}


const SearchModal: FC<SearchModalProps> = ({controls}: SearchModalProps) => {
    const loc = controls.getLocation();
    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        // Effect logic here (e.g., fetch data, update state, etc.)
        // Optional cleanup function
        return () => {
            // Cleanup logic here (e.g., unsubscribe, cancel requests, etc.)
        };
        // refresh when location changes
    }, [loc]);

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: loc,
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            {skipNull: true}
        )
        router.push(url)
        controls.onClose()
    }, [location, router, params])

    // TODO: change so that we can set the city name, and the geo_location
    const body = (
        <div className="p-5">
            <LocationInput
                value={loc}
                onChange={(val: LocationValue) => controls.onSetLocation(val)}
            />
            <SelectOptions/>
        </div>
    )

    return (
        <Modal
            label="Search"
            isOpen={controls.isOpen}
            close={controls.onClose}
            onSubmit={handleClick}
            body={body}
            buttonLabel="Search"
        />
    )
}

export default SearchModal