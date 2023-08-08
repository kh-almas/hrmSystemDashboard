import React from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Label } from "reactstrap";

const Input = ({
  labelName,
  inputName,
  inputType,
  placeholder,
  errors,
  defaultValue,
  validation,
}) => {
  const { register } = useForm();
  return (
    <>
      <div className="theme-form">
        <div className="mb-3 form-group">
          <label
              htmlFor={inputName}
          >
            {labelName}
          </label>
          <input
              style={{fontSize: "10px", height: "34px"}}
              className={`form-control ${errors?.inputName && "is-invalid"}`}
              id={inputName}
              type={inputType}
              name={inputName}
              placeholder={placeholder}
              defaultValue={defaultValue || ""}
              {...validation}
          />
          <span className="text-danger">
          {errors?.inputName && `${errors?.inputName} is required`}
        </span>
        </div>
      </div>

    </>
  );
};

export default Input;
