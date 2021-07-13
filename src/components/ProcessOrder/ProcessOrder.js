import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Header from '../Header/Header';
import Products from '../Products/Products';
import './ProcessOrder.css';
const ProcessOrder = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('https://fathomless-meadow-30547.herokuapp.com/products')
            .then(res => res.json())
            .then(productData => setProduct(productData))
    }, [])

    useEffect(() => {
        const cartProduct = product.find(pd => pd._id === productId);
        setCart(cartProduct)
    }, [product, productId])

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }
    
    const handleAddToCart = () => {
        cart.price = cart.price * quantity;
        cart.quantity = quantity;
        cart.email = loggedInUser.email
        fetch('https://fathomless-meadow-30547.herokuapp.com/ProcessOrder', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cart)
        })
        setQuantity(1);
    }
    return (
        <>
            <Container>
                <Header className="nav-bar"></Header>
                <Row className="justify-content-md-center cartProduct">
                    <Col className="cart-container" md={2}>
                        <img src={cart?.image} alt="" />
                    </Col>
                    <Col className="product-details" md={4}>
                        <h3>Product: {cart?.productName}</h3>
                        <h4>Weight: {cart?.weight}</h4>
                        <h1>Price:{cart?.price * quantity} tk</h1>
                        <Button onClick={handleDecrease}>-</Button>
                        {quantity}
                        <Button onClick={handleIncrease}>+</Button>
                        <Button onClick={handleAddToCart}>Add To cart</Button>
                    </Col>
                </Row>
            </Container>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <Container className="product-container">
                <Row className="products">
                    <Col><h2>ALl Products</h2></Col>
                </Row>
                <Row className='justify-content-md-center row-container'>
                    {
                        product.map(pd =>
                            <Col className=' product-content' md={3}>
                                <Products pd={pd} key={pd._id}></Products>
                            </Col>)
                    }
                    
                </Row>
            </Container>
        </>
    );
};

export default ProcessOrder;