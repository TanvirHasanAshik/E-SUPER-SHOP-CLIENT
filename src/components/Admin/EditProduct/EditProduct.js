import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groceryIcon from '../../../images/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.webp'

const EditProduct = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="shop-icon side-bar" md={3} >
                    <img src={groceryIcon} alt="" />
                    <Link to="/"><h2>Grocery BD</h2></Link><br /><br />
                    <Link to="/addProduct">Add Product</Link><br /><br />
                    <Link to="/manageProduct">Manage Product</Link><br /><br />
                    <Link to="/editProduct">Edit Product</Link><br /><br />
                </Col>
                <Col md={8} className="content">
                    <h1>Edit Product</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default EditProduct;