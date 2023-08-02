import React from "react";
import { FormGroup } from "reactstrap";

<<<<<<< HEAD
const Textarea = ({
  labelName,
  inputName,
  placeholder,
  errors,
  defaultValue,
  validation,
  height,
}) => {
  return (
    <FormGroup className="mb-3">
      <label style={{ color: "#8990b6", fontSize: "16px" }} htmlFor={inputName}>
        {labelName}
      </label>
      <textarea
        style={{ fontSize: "14px" }}
        name={inputName}
        className="form-control"
        id={inputName}
        rows={height}
        placeholder={placeholder}
      ></textarea>
    </FormGroup>
  );
=======
const Textarea = ({labelName, inputName, placeholder, errors, defaultValue, validation, height}) => {
    return (
        <FormGroup className="mb-3">
            <label className="text-muted" htmlFor={inputName}>{labelName}</label>
            <textarea name={inputName} className="form-control" id={inputName} rows={height} placeholder={placeholder}></textarea>
        </FormGroup>
    );
>>>>>>> 1701e1d91a46f0629aa91b230152c19d8f8f7d5d
};

export default Textarea;
