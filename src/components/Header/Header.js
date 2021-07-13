import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css'
import { Link } from "react-router-dom";
import shopIcon from '../../images/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.webp';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {name, image, success} = loggedInUser;
    return (
        <Navbar bg="primary" variant="dark" >
            <Container className="navbar">
                <Navbar.Brand className='shop-icon'> <img src={shopIcon} alt="" /> Grocery BD </Navbar.Brand>
                <Nav className="mx-auto nav-item">
                    <Link to="/shop">Shop</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/admin">Admin</Link>
                    {success && <img src={image} alt="" />}
                    {<span className="userName">{name}</span>}
                    {!success && <Link to="/login">Login</Link>}
                    {success && <Link>Logout</Link>}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;