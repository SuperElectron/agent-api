import React, {useState} from "react";
import Select, {SingleValue} from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "@mui/material/Slider";

// Define the types for the form data
type CategoryOption = {
    value: string;
    label: string;
};

interface FormData {
    category: CategoryOption | null;
    startDate: Date | null;
    price: number;
    activity: string;
}

// Options for the category dropdown
const categoryOptions: CategoryOption[] = [
    {value: "sports", label: "Sports"},
    {value: "fitness", label: "fitness"},
    {value: "education", label: "Education"},
    {value: "professional-development", label: "Professional Development"},
    {value: "entertainment", label: "Entertainment"},
    {value: "hobbies", label: "Hobbies"},
    {value: "community", label: "Community"},
    {value: "civic", label: "Civic"},
];

const SelectOptions: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        category: null,
        startDate: null,
        price: 500,
        activity: "",
    });

    // Handlers
    const handleCategoryChange = (selectedOption: SingleValue<CategoryOption>) => {
        setFormData({...formData, category: selectedOption});
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({...formData, startDate: date});
    };

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setFormData({...formData, price: newValue});
        }
    };

    const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, activity: event.target.value});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formattedDate = formData.startDate
            ? formData.startDate.toISOString().replace("T", " ").slice(0, 16)
            : null;

        console.log({
            category: formData.category?.value || null,
            startDate: formattedDate,
            price: formData.price,
            activity: formData.activity,
        });

        alert("Form Submitted! Check the console for details.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Dropdown */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <Select
                    id="category"
                    options={categoryOptions}
                    value={formData.category}
                    onChange={handleCategoryChange}
                    placeholder="Select a category"
                    className="mt-1"
                />
            </div>

            {/* Start Date Picker */}
            <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>

                <DatePicker
                    id="start-date"
                    selected={formData.startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd HH:mm"
                    placeholderText="Pick a start date"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Price Slider */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price: ${formData.price}
                </label>
                <Slider
                    id="price"
                    value={formData.price}
                    onChange={handlePriceChange}
                    min={0}
                    max={1000}
                    valueLabelDisplay="auto"
                />
            </div>

            {/* Activity Input */}
            <div>
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
                    Activity
                </label>
                <input
                    id="activity"
                    type="text"
                    value={formData.activity}
                    onChange={handleActivityChange}
                    placeholder="Enter an activity"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default SelectOptions;
