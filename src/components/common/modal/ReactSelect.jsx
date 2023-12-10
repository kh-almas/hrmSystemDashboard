import React, {useEffect, useState} from "react";
import Select from "react-select";

const ReactSelect = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue, cngFn}) => {
    const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "33px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "33px",
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
      height: "33px",
    }),
  };

  return (
      <div className="theme-form">
        <div className="mt-3 form-group">
          <label style={{ fontSize: "11px" }} htmlFor={labelName}>
            {labelName? `${labelName}:` : ''}{" "}
            {error && <span className="text-danger">(Required)</span>}
          </label>
          <div>
            <Select
                className={`customeStyle ${error && "is-invalid"}`}
                id={labelName}
                value={previous} // Set the value to the selected option
                onChange={cngFn} // Update the selected option when it changes
                options={options}
                styles={customStyles}
                isSearchable={true}
                placeholder={placeholder}
            />
            {/*{console.log('validation', validation)}*/}
          </div>
        </div>
      </div>
  );
};

export default ReactSelect;
