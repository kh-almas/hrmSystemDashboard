import React from 'react';
import {Button} from "react-bootstrap";

const Submitbtn = ({name}) => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <Button type="submit" className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4">
                {name}
            </Button>
        </div>
    );
};

export default Submitbtn;