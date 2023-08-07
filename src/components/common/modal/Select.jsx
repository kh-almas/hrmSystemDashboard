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
      <div className="theme-form">
        <div className="mb-3 form-group">
          <label
              htmlFor="exampleFormControlSelect9"
          >
            {labelName}
          </label>
          <select
              style={{ fontSize: "16px" }}
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
        </div>
      </div>
    </>
  );
};

export default Select;
