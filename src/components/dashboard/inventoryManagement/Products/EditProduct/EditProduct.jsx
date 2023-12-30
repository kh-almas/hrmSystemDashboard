import React from 'react';
import {useParams} from "react-router-dom";

const EditProduct = () => {
    const params = useParams();
    console.log(params.id)
    return (
        <div>
            <p>on test {params.id}</p>
        </div>
    );
};

export default EditProduct;