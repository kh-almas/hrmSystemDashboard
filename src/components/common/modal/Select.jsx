import React from "react";
import { FormGroup, Label } from "reactstrap";

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 7db7fbe678ce7694d3b7cfff7000803252d11be8
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
<<<<<<< HEAD
=======
const Select = ({labelName, name, options, placeholder, inputType, errors, defaultValue, validation}) => {
    return (
        <>
            <FormGroup className="mb-3">
                <label className="text-muted" htmlFor="exampleFormControlSelect9">{labelName}</label>
                <select name={name} className="form-control digits" id="exampleFormControlSelect9" defaultValue="1">
                    <option>{placeholder}</option>
                    {
                        options?.map(item => <option value={item}>{item}</option>)
                    }
                </select>
            </FormGroup>
        </>
    );
>>>>>>> 1701e1d91a46f0629aa91b230152c19d8f8f7d5d
=======

>>>>>>> 7db7fbe678ce7694d3b7cfff7000803252d11be8
};

export default Select;
