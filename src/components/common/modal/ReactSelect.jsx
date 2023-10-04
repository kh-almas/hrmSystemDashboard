import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import Select from "react-select";

const ReactSelect = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue}) => {
    // console.log("optionsfdsgvdfh", options)


    const [newOption, setNewOption] = useState([])

    // const newOption = {
    //     value: options.id,
    //     label: options.value
    // }

    const hgfjhm= options.map(data => ({
            value: data.id,
            label: data.value,
    }))


    // const options = product.map((item) => ({
    //     productId: item._id,
    //     label: item.productName,
    //     value: item._id,
    //     imageUrl: item.images[0].imageUrl, // Assuming the image URL is in the first image object
    //     regularPrice: item.regularPrice,
    //     availableQuantity: item.availableQuantity,
    // }));

    const {reset} = useForm();
    // useEffect(() => {
    //     reset();
    // }, [previous])
    // console.log("options", options)
    // console.log("previous", previous)
    const handleChange = (selectedOption) => {
        // Ensure that selectedOption is defined
        if (selectedOption) {
            const id = selectedOption?.value;
            setValue(id)
            // Other logic
        }
    }



    // Define custom styles
    const customStyles = {
        fontSize: '11px !important',
        height: '10px !important',
        outline: '0px !important',
    };

    return (
        <>
            <div className="theme-form">
                <div className="mb-3 form-group">
                    <label style={{ fontSize: '11px' }} htmlFor={labelName}>
                        {`${labelName}:`} {error && <span className="text-danger">(Required)</span>}
                    </label>
                    <div>
                        <Select
                            className={` ${error && 'is-invalid'}`}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    // borderColor: state.isFocused ? 'grey' : 'red',
                                    fontSize: '10px',
                                    height: '20px',
                                    padding: '0 !important',
                                }),
                            }}
                            id={labelName}
                            onChange={handleChange} // Remove the arrow function here
                            // defaultValue={jkdfhgksdjf.find((option) => option.value === previous)}
                            {...validation}
                            options={hgfjhm}
                            isSearchable={true} // This enables the search functionality
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReactSelect;