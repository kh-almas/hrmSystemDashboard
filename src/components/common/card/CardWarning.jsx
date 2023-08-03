import React from 'react';
import {Card} from "react-bootstrap";

const CardWarning = ({children}) => {
    return (
        <Card className="mb-3 my-warning-card shadow">
            {children}
        </Card>
    );
};

export default CardWarning;