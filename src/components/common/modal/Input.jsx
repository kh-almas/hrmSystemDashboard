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
      <FormGroup className="mb-3">
        <Label htmlFor={inputName}>{labelName}</Label>
        <input
          className={`form-control ${errors?.inputName && "is-invalid"}`}
          id={inputName}
          type={inputType}
          name={inputName}
          placeholder={placeholder}
          defaultValue={defaultValue || ""}
          {...validation}
        />
        <span className="text-danger">
          {errors?.inputName && "Password is required"}
        </span>
      </FormGroup>
    </>
  );
};

export default Input;
