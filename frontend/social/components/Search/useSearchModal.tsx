import {useState} from "react";
import {LocationValue} from "@/types/locationType";


const useSearchModal = (val: LocationValue) => {
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState<LocationValue>(val);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    function onSetLocation(v: LocationValue) {
        setLocation(v);
    }

    const getLocation = () => {
        return location
    };
    return {
        isOpen,
        onOpen,
        onClose,
        onSetLocation,
        getLocation,
    };
};

export default useSearchModal;
