import React, { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import './Admin.css';
import groceryIcon from '../../images/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.webp';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

const Admin = () => {
    const [orders, setOrders] = useState([])
    const [shipment, setShipment] = useState({})

    useEffect(() => {
        fetch('https://fathomless-meadow-30547.herokuapp.com/orders')
            .then(res => res?.json())
            .then(data => {
                setShipment(data[0].shipment)
                setOrders(data[0].cartProduct)
            });
    }, []);
    console.log(orders, shipment )
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
                    <h1>Orders</h1>
                    {
                        orders.map(order =>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Product: {order.productName}</td>
                                        <td>Quantity: {order.quantity}</td>
                                        <td>Price: {order.price}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    }
                    <div className="customer-shipment">
                        <span>Name:     {shipment.name}</span><br />
                        <span>Email:    {shipment.email}</span><br />
                        <span>Mobile:   {shipment.mobile}</span><br />
                        <span>Address:  {shipment.address}</span><br />
                        <span>SubTotal: {shipment.subTotal} tk</span><br />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;