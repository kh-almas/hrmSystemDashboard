import React, { useState } from "react";
import Select from "react-select";

const ReactSelect = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue}) => {
  const [newOption, setNewOption] = useState([]);
  const data = options.map((data) => ({
    value: data.id,
    label: data.value,
  }));

  // console.log('data',data , typeof data);
  // console.log("previous", previous, typeof previous);

  const handleChange = (selectedOption) => {
    // Ensure that selectedOption is defined
    if (selectedOption) {
      const id = selectedOption?.value;
      setValue(id);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <>
      <div className="theme-form">
        <div className="mb-3 form-group">
          <label style={{ fontSize: "11px" }} htmlFor={labelName}>
            {`${labelName}:`}{" "}
            {error && <span className="text-danger">(Required)</span>}
          </label>
          <div>
            {/*{console.log(data.find((option) => option.value == previous))}*/}
            <Select
              className={`customeStyle ${error && "is-invalid"}`}
              id={labelName}
              onChange={handleChange} // Remove the arrow function here
              defaultValue={data.find((option) => option.value == previous)}
              {...validation}
              options={data}
              styles={customStyles}
              isSearchable={true} // This enables the search functionality
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReactSelect;
