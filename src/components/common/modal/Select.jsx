import React from "react";
import { FormGroup, Label } from "reactstrap";


const Select = ({
  labelName,
  name,
  options,
  placeholder,
  inputType,
  errors,
  defaultValue,
  validation,
}) => {
  return (
    <>
      <FormGroup className="mb-3">
        <label
          style={{ color: "#8990b6", fontSize: "16px" }}
          htmlFor="exampleFormControlSelect9"
        >
          {labelName}
        </label>
        <select
          style={{ color: "#8990b6", fontSize: "14px" }}
          name={name}
          className="form-control digits"
          id="exampleFormControlSelect9"
          defaultValue="1"
        >
          <option>{placeholder}</option>
          {options?.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </FormGroup>
    </>
  );

};

export default Select;
