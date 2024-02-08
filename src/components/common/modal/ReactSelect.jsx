import React, {useEffect, useState} from "react";
import Select from "react-select";

const ReactSelect = ({labelName, options, defaultValue, validation, placeholder, error, previous, setValue, cngFn}) => {


    return (
        <div className="theme-form">
            <div className={`form-group ${labelName ? "" : 'mb-0'}`}  style={{marginBottom: "0 !important"}}>
                {labelName? <label style={{ fontSize: "11px" }} htmlFor={labelName}>
                    {labelName}
                    {error && <span className="text-danger ms-2">(Required)</span>}
                </label> : ''}
                <Select
                    className={`customeStyle ${error && "is-invalid"}`}
                    id={labelName}
                    value={previous}
                    onChange={cngFn}
                    options={options}
                    styles={{
                        option: (base) => ({
                            ...base,
                            height: "100%",
                            fontSize: '11px'
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                            zIndex: "10",
                        }),
                    }}
                    isSearchable={true}
                    placeholder={placeholder}
                    // theme={(theme) => ({
                    //     ...theme,
                    //     borderRadius: 0,
                    //     colors: {
                    //         ...theme.colors,
                    //         text: 'orangered',
                    //         primary25: 'hotpink',
                    //         primary: 'black',
                    //     },
                    // })}
                />
                {/*{console.log('validation', validation)}*/}
            </div>
        </div>
    );
};

export default ReactSelect;