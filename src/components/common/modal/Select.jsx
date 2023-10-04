import React, {useEffect, useState} from "react";
import ReactSelect from "./ReactSelect";

const Select = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue}) => {
    // const [newOption, setNewOption] = useState([])
    //
    // // const newOption = {
    // //     value: options.id,
    // //     label: options.value
    // // }
    //
    // options.map(data => {
    //     const newData = {
    //         value: data.id,
    //         label: data.value
    //     }
    //     setNewOption(data => [...data, newData])
    //
    // })

    return (
        <>
            <ReactSelect labelName={labelName} options={options} defaultValue={defaultValue} validation={validation} placeholder={placeholder} error={error} previous={previous} setValue={setValue}></ReactSelect>
        </>
    );
};

export default Select;
