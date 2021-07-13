import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { userContext } from '../../App';
import CartProduct from '../CartProduct/CartProduct';
import Header from '../Header/Header';
import './Cart.css';
const Cart = () => {

    const [cartProduct, setCartProduct] = useState([]);
    const [subTotal, setSubTotal] = useState(0)
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [clickShipment, setClickShipment] = useState(false);
    const [shipment, setShipment] = useState({
        name: '' || loggedInUser.name,
        email: '' || loggedInUser.email,
        mobile: '',
        address: ''
    })

    let total = 0;
    for (let i = 0; i < cartProduct.length; i++) {
        total = total + cartProduct[i].price;
    }
    useEffect(() => {
        setSubTotal(total)
    }, [total])
    useEffect(() => {
        fetch(`https://fathomless-meadow-30547.herokuapp.com/cart?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(product => setCartProduct(product));
    }, [loggedInUser.email])


    const handleBlur = (e) => {
        const userShipment = { ...shipment };
        userShipment[e.target.name] = e.target.value;
        userShipment.subTotal = subTotal;
        setShipment(userShipment)
    }

    const handleConfirmOrder = (e) => {
        const orderShipment = {cartProduct, shipment};
        fetch('https://fathomless-meadow-30547.herokuapp.com/confirmOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderShipment)
    })
        setCartProduct([])
        e.preventDefault();
    }

    return (
        <>
            <Container>
                <Header></Header>
            </Container>
            <Container>
                <Row className="cart" style={{ margin: '100px' }}>
                    {cartProduct.map(cp =>
                        <Col md={12} className="table">
                            <Table striped bordered hover variant="primary" style={{ margin: '0' }}>
                                <tbody>
                                    <tr>
                                        <td>{cp.productName}</td>
                                        <td>Qty: {cp.quantity}</td>
                                        <td>{cp.price} tk</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    )}
                    <div style={{ textAlign: 'center' }}>
                        <h5 >Sub Total: {subTotal}</h5>
                        {!clickShipment && <Button onClick={() => setClickShipment(!clickShipment)}>Shipment</Button>}
                    </div>
                </Row>
            </Container>

            {clickShipment &&
                <Container>
                    <Row className="justify-content-md-center" style={{ marginBottom: '100px' }}>
                        <Col md={8}>
                            <Form onSubmit={handleConfirmOrder}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onBlur={handleBlur} type="text" name='name' value={loggedInUser.name} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onBlur={handleBlur} type="email" name="email" value={loggedInUser.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control onBlur={handleBlur} type="text" name="mobile" required />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control onBlur={handleBlur} type="text" name="address" required />
                                </Form.Group>
                                <Button variant="primary" type="submit">Confirm Order</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            }
        </>

    );
};

export default Cart;