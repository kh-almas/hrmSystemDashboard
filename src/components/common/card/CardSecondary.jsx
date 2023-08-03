import React from 'react';
import {Card} from "react-bootstrap";

const CardSecondary = ({children}) => {
    return (
        <Card className="mb-3 my-secondary-card shadow">
            {children}
        </Card>
    );
};

export default CardSecondary;