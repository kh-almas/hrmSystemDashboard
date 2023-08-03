import React from 'react';
import {Card} from "react-bootstrap";

const CardSuccess = ({children}) => {
    return (
        <Card className="mb-3 my-success-card shadow">
            {children}
        </Card>
    );
};

export default CardSuccess;