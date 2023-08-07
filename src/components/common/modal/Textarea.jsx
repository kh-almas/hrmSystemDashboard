import React from "react";
import { FormGroup } from "reactstrap";

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
      <label htmlFor={inputName}>
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

};

export default Textarea;
