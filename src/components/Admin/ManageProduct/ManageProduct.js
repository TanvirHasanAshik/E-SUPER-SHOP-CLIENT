import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import groceryIcon from '../../../images/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.webp'
import './ManageProduct.css';

const ManageProduct = () => {
    const [manageProduct, setManageProduct] = useState([]);
    const [singleProduct, setSingleProduct] = useState({})
    const [editProduct, setEditProduct] = useState({
        productName: '',
        weight: '',
        price: '',
    })
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetch('https://fathomless-meadow-30547.herokuapp.com/products')
            .then(res => res.json())
            .then(products => setManageProduct(products));
    }, [])

    const handleEdit = (id) => {
        fetch(`https://fathomless-meadow-30547.herokuapp.com/edit/${id}`)
            .then(res => res.json())
            .then(data => setSingleProduct(data))
        setToggle(true)
    }
    const handleDelete = (id) => {
        fetch(`https://fathomless-meadow-30547.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    }
    const updateProduct = (e) => {
        const newProduct = {...editProduct};
        newProduct[e.target.name] = e.target.value;
        setEditProduct(newProduct)
    }
    const handleUpdate = (id) => {
        fetch(`https://fathomless-meadow-30547.herokuapp.com/updateProduct/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editProduct)
        })
        setToggle(false);  
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
                <Col md={8} className="content manage-td">
                    
                    {
                        toggle && 
                        
                        <Form onSubmit={()=> handleUpdate(singleProduct._id)}>
                            <h1>Update Product</h1>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product:</Form.Label>
                                <Form.Control name="productName" onBlur={updateProduct} type="text" placeholder={singleProduct.productName} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Weight:</Form.Label>
                                <Form.Control name="weight" onBlur={updateProduct} type="text" placeholder={singleProduct.weight} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Price:</Form.Label>
                                <Form.Control name="price" onBlur={updateProduct} type="text" placeholder={singleProduct.price} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Update</Button>
                        </Form>
                    }
                    <h1>Manage Product</h1>
                    {
                        manageProduct.map(mp =>
                            <Table striped bordered hover variant="success">
                                <tbody>
                                    <tr>
                                        <td>Product: {mp.productName}</td>
                                        <td>Weight:  {mp.weight}</td>
                                        <td>Price:   {mp.price}</td>
                                        <td><Button onClick={() => handleEdit(mp._id)}>Edit</Button></td>
                                        <td><Button onClick={() => handleDelete(mp._id)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            </Table>)
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default ManageProduct;



