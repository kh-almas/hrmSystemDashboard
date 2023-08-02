import React from "react";
import { FormGroup } from "reactstrap";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7db7fbe678ce7694d3b7cfff7000803252d11be8
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
<<<<<<< HEAD
=======
const Textarea = ({labelName, inputName, placeholder, errors, defaultValue, validation, height}) => {
    return (
        <FormGroup className="mb-3">
            <label className="text-muted" htmlFor={inputName}>{labelName}</label>
            <textarea name={inputName} className="form-control" id={inputName} rows={height} placeholder={placeholder}></textarea>
        </FormGroup>
    );
>>>>>>> 1701e1d91a46f0629aa91b230152c19d8f8f7d5d
=======

>>>>>>> 7db7fbe678ce7694d3b7cfff7000803252d11be8
};

export default Textarea;
