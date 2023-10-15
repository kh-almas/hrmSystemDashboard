import React, {useEffect, useState} from "react";
import ReactSelect from "./ReactSelect";

const Select = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue}) => {
    return (
        <>
            <ReactSelect labelName={labelName} options={options} defaultValue={defaultValue} validation={validation} placeholder={placeholder} error={error} previous={previous} setValue={setValue}></ReactSelect>
        </>
    );
};

export default Select;
