import React from 'react';
import {Card} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {CardBody} from "reactstrap";

const CardPrimary = ({children}) => {
    return (
        <Card className="mb-3 my-primary-card shadow">
            {children}
        </Card>
    );
};

export default CardPrimary;