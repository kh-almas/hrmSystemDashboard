import React, {useEffect, useState} from "react";
import ReactSelect from "./ReactSelect";

const Select = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue, cngFn}) => {
    return (
        <>
            <ReactSelect labelName={labelName} options={options} defaultValue={defaultValue} validation={validation} placeholder={placeholder} error={error} previous={previous} setValue={setValue} cngFn={cngFn}></ReactSelect>
        </>
    );
};

export default Select;
