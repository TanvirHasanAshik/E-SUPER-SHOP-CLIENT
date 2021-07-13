import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Shop.css';
import Header from '../Header/Header'
import headerImg from '../../images/headerImg/490-4908084_e-commerce-websites-design-hd-png-download.png'
import Products from '../Products/Products';
import { useEffect } from 'react';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fathomless-meadow-30547.herokuapp.com/products')
        .then(res => res.json())
        .then(products => setProducts(products));
    }, [])

    
    return (
        <Container >
            <Header></Header>
            <img className="header-img" src={headerImg} alt="" />
           <br /><br />
            <Row className='justify-content-center row-container'>
                {
                    products.map(pd => 
                    <Col className=' product-content' md={3}>
                        <Products pd={pd} key={pd._id}></Products>
                    </Col> )
                }
            </Row>
        </Container>
    );
};

export default Shop;