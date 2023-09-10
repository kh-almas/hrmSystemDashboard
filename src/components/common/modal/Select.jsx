import React from "react";
import {useForm} from "react-hook-form";

const Select = ({labelName, options, defaultValue, validation, placeholder, error}) => {
    return (
        <>
            <div className="theme-form">
                <div className="mb-3 form-group">
                    <label htmlFor={labelName}>{labelName}</label>
                    <select style={{fontSize: "13px"}} className="form-control" id={labelName}
                            defaultValue={defaultValue} {...validation}>
                        <option value="">{placeholder}</option>
                        {options?.map((item) => (
                            <option value={item.id}>{item.value}</option>
                        ))}
                    </select>
                    {error ?
                        <span className="text-danger">
                            {`${labelName} is required`}
                        </span> : ''
                    }
                </div>
            </div>
        </>
    );
};

export default Select;
