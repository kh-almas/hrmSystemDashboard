import React from 'react';
import {Card} from "react-bootstrap";

const CardInfo = ({children}) => {
    return (
        <Card className="mb-3 my-info-card shadow">
            {children}
        </Card>
    );
};

export default CardInfo;