import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import './CartProduct.css';

const CartProduct = (props) => {
    const { productName, price, quantity } = props.cp
    return (
        <Container>
            <Row>
                <Col className="table">
                    <span>{productName}</span>
                    <span>{quantity}</span>
                    <span>{price}</span>
                </Col>
            </Row>

        </Container>
    );
};

export default CartProduct;