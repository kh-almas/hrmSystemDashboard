import React from "react";
import { useForm } from "react-hook-form";

const Input = ({labelName, inputName, inputType, placeholder, defaultValue, validation, error}) => {
    // const {formState: {errors},} = useForm();
  return (
    <>
      <div className="theme-form">
        <div className="mb-3 form-group">
          <label htmlFor={inputName}>{labelName}</label>
          <input
            style={{
              fontSize: "13px",
              height: "37px",
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
            { error ?
                <span className="text-danger">
                    {`${labelName} is required`}
                </span> : ''
            }
        </div>
      </div>
    </>
  );
};

export default Input;
