import React from 'react';
import {FormGroup} from "reactstrap";

const Textarea = ({labelName, inputName, placeholder, errors, defaultValue, validation, height}) => {
    return (
        <FormGroup className="mb-3">
            <label className="text-muted" htmlFor={inputName}>{labelName}</label>
            <textarea name={inputName} className="form-control" id={inputName} rows={height} placeholder={placeholder}></textarea>
        </FormGroup>
    );
};

export default Textarea;