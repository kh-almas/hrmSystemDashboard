import React, {createContext, useEffect, useRef, useState} from 'react';
import axios from "axios";

export const SelectContext = createContext(null);

const CustomSelectProvider = ({ children }) => {
    const [MultiselectShowForAddProductInInventory, setMultiselectShowForAddProductInInventory] = useState(false)
    const showMultiselectModalForAddProductInInventoryFn = () => {
        setMultiselectShowForAddProductInInventory(true);
    }

    const hideMultiselectModalForAddProductInInventoryFn = () => {

        // setMultiselectShowForAddProductInInventory(false);
    }

    const modalRefForAddProductInInventory = useRef(null);
    const excludedDivRefForAddProductInInventory = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const isClickInsideExcludedDiv = excludedDivRefForAddProductInInventory.current && excludedDivRefForAddProductInInventory.current.contains(event.target);
            if (modalRefForAddProductInInventory.current && modalRefForAddProductInInventory.current.contains(event.target) && !isClickInsideExcludedDiv) {
                // console.log('modalRefForAddProductInInventory.current', modalRefForAddProductInInventory.current);
                setMultiselectShowForAddProductInInventory(false);
            }
        };

        if (MultiselectShowForAddProductInInventory) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [MultiselectShowForAddProductInInventory, modalRefForAddProductInInventory]);

    const selectManagement = {
        MultiselectShowForAddProductInInventory,
        setMultiselectShowForAddProductInInventory,
        showMultiselectModalForAddProductInInventoryFn,
        modalRefForAddProductInInventory,
        excludedDivRefForAddProductInInventory,
        hideMultiselectModalForAddProductInInventoryFn,
    }

    return (
        <SelectContext.Provider value={selectManagement}>
            { children }
        </SelectContext.Provider>
    );
};
export default CustomSelectProvider;