import React from "react";
import {useForm} from "react-hook-form";

const Input = ({labelName, inputName, inputType, placeholder, defaultValue, validation, error}) => {
    return (
        <>
            <div className="theme-form">
                <div className="mb-2 form-group">
                    <label style={{fontSize: "11px",}} htmlFor={inputName}>{`${labelName}:`} {error &&
                        <span className="text-danger">(Required)</span>}</label>
                    <input
                        style={{
                            fontSize: "11px",
                            height: "30px",
                            outline: "0px !important",
                        }}
                        className={`form-control ${error && "is-invalid"}`}
                        id={inputName}
                        type={inputType}
                        name={inputName}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...validation}
                    />
                </div>
            </div>
        </>
    );
};

export default Input;
