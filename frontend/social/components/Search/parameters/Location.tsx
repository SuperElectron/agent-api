'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {LocationValue} from "@/types/locationType";


interface LocationInputProps {
    value: LocationValue;
    onChange: (value: LocationValue) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange }) => {
    // Initialize with `location_name`, which is a string
    const [inputValue, setInputValue] = useState<string>(value.location);

    // Fetch cities from the API
    const fetchCities = async (query: string) => {
        try {
            const response = await fetch(`/api/findCity?q=${query}`);
            const data: LocationValue[] = await response.json();

            if (response.ok && data.length > 0) {
                const cityOption = data[0]; // Select the first result
                onChange(cityOption); // Pass the selected city back to the parent
                console.log('Cities found:', cityOption);
            } else {
                console.error('Error fetching cities or no cities found:', data);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            console.error('Input cannot be empty');
            return;
        }

        fetchCities(inputValue).then();
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
            {/* Input Field */}
            <div className="flex-grow">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                aria-label="Search"
            >
                <FiSearch size={20} />
            </button>
        </form>
    );
};

export default LocationInput;
