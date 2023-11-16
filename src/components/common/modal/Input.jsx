import React from "react";
import {useForm} from "react-hook-form";

const Input = ({labelName, inputName, inputType, placeholder, defaultValue, validation, error}) => {

    const inputStyle = {
        ':focus': {
            outline: "none",
            border: "1px solid #ccc",
        },
        fontSize: "11px",
        height: "30px",
        outline: "0px !important",
        border: `1px solid ${error?.type === 'required'  ? "red" : "#ccc"}`,
    }
    return (
        <>
            <div className="theme-form">
                <div className="mb-2 form-group">
                    <label style={{fontSize: "11px",}} htmlFor={inputName}>{`${labelName}:`} {error?.type === 'required' ?
                        <span className="text-danger">(Required)</span> : ''}</label>
                    <input
                        style={inputStyle}
                        className={`form-control ${error?.type === 'required' ? "is-invalid" : ''}`}
                        id={inputName}
                        type={inputType}
                        name={inputName}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...validation}
                    />
                    <span style={{fontSize: '10px'}}>{error?.type !== 'required' ? error?.message : ''}</span>
                </div>
            </div>
        </>
    );
};

export default Input;
