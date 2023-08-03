import React from 'react';
import {Card} from "react-bootstrap";

const CardDanger = ({children}) => {
    return (
        <Card className="mb-3 my-danger-card shadow">
            {children}
        </Card>
    );
};

export default CardDanger;