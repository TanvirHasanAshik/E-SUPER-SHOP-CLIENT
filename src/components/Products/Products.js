import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Products.css';
const Products = (props) => {
    const { _id, productName, image, weight, price } = props.pd;

    const history = useHistory();
    const addProduct = (id) => {
        history.push(`/ProcessOrder/${id}`);
    }
    return (
        <div className="product-container">
            <img src={image} alt="" /><br />
            <h5>{productName} -- {weight}</h5>
            <h3>Price: {price} tk</h3>
            <Button onClick={() =>addProduct(_id)}>Add Product</Button><br /><br />
        </div>
    );
};

export default Products;