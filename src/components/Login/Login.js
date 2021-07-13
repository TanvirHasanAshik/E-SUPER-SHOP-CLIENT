import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './Login.css';
import gIcon from '../../images/social icon/google.png';
import fIcon from '../../images/social icon/facebook.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const [forLogin, setForLogin] = useState(false);
    const [user, setUser] = useState({
        nama: '',
        email: '',
        image: '',
        error: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((res) => {
                const newUser = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL,
                    success: true
                }
                setUser(newUser);
                setLoggedInUser(newUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error.message)
            });
    }

    const handleFacebookSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    return (
        <>
            <Container>
                <Header></Header>
            </Container>
            <br />
            {!forLogin && <Container>
                <Row className="justify-content-md-center form-container">
                    <Col md={6}>
                        <Form>
                            <h2>Sign up account.</h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter user name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check onChange={() => setForLogin(!forLogin)} type="checkbox" label="All ready have an account?" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Sign up</Button>
                        </Form>

                        <div className="social-btn">
                            <br /> ____________or__________ <br />

                            <Button onClick={handleGoogleSignIn}> <img src={gIcon} alt="" />
                                Sign in with Google
                            </Button>
                            <Button onClick={handleFacebookSignIn}> <img src={fIcon} alt="" />
                                Sign in with Facebook
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>}

            {forLogin && <Container>
                <Row className="justify-content-md-center form-container">
                    <Col md={6}>
                        <Form>
                            <h2>Sign in account.</h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Sign in</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>}
        </>

    );
};

export default Login;