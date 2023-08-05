import React from 'react';
import {Button} from "react-bootstrap";

const Submitbtn = () => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <Button type="submit" className="me-2 btn btn-pill btn-info btn-air-info btn-info-gradien px-4">
                Add Contact
            </Button>
        </div>
    );
};

export default Submitbtn;