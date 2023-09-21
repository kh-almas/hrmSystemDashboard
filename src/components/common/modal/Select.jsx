import React, {useEffect} from "react";
import {useForm} from "react-hook-form";

const Select = ({labelName, options, defaultValue, validation, placeholder, error, previous}) => {
    const {reset} = useForm();
    useEffect(() => {
        reset();
    }, [previous])

    return (
        <>
            <div className="theme-form">
                <div className="mb-3 form-group">
                    <label style={{fontSize: "11px",}} htmlFor={labelName}>{`${labelName}:`} {error && <span className="text-danger">(Required)</span>}</label>
                    <select className={`form-control ${error && "is-invalid"}`} style={{fontSize: "11px", height: "30px", outline: "0px !important",}} className="form-control" id={labelName}
                            defaultValue={defaultValue} {...validation}>
                        <option value="">{placeholder}</option>
                        {options?.map((item) => (
                             <option value={item.id} selected={item.id == previous} >{item.value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default Select;
