import React from "react";

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
          <label htmlFor="exampleFormControlSelect9">{labelName}</label>
          <select
            style={{ fontSize: "13px" }}
            name={name}
            className="form-control digits"
            id="exampleFormControlSelect9"
            defaultValue={defaultValue}
            {...validation}
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
