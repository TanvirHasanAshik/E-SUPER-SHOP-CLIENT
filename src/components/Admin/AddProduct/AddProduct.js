import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groceryIcon from '../../../images/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.webp';

const AddProduct = () => {
    const[imageData, setImageData] = useState(null);
    const [product, setProduct] = useState({
        productName : '',
        weight      : '',
        price       : '',
        image       : ''
    })

    const handleChangeImage = (event) => {
        const image = event.target.files[0];
        const imageData = new FormData();
        imageData.set('key', 'ca92fa1c037d04341b4195a9abbee0b3')
        imageData.append('image', image);

        fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            header: {'Content-Type': 'application/json' },
            body: imageData
        })
        .then(res => res.json())
        .then(image =>setImageData(image.data.url))
    }
    const handleBlur = (event) => {
        const addProduct = {...product};
        addProduct[event.target.name] = event.target.value;
        setProduct(addProduct);
    }
    product.image = imageData;

    const handleFormSubmit = (event) => {
        fetch('https://fathomless-meadow-30547.herokuapp.com/addProduct',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
        console.log(product)
        event.preventDefault();
    }
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
                <Col md={5} className="content">
                    <h1>Add Product</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name: </Form.Label>
                            <Form.Control name="productName" onBlur={handleBlur} type="text" placeholder="Product Name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control name="price" onBlur={handleBlur} type="text" placeholder="Product Price" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Weight</Form.Label>
                            <Form.Control name="weight" onBlur={handleBlur} type="text" placeholder="Product Weight" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Upload Product Image</Form.Label>
                            <Form.Control onChange={handleChangeImage} type="file" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;