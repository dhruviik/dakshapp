// src/Page.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// img
import logo from "../img/logo.jpg"

const Header = () => {
    return (
        <div className='overflow-hidden'>
            <Navbar bg="primary" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="OPD Logo" className="opd-logo" width={120} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/" className="text-white fw-bold fs-5">About Us</Nav.Link>
                            <Nav.Link as={Link} to="/" className="text-white fw-bold fs-5">Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
};

export default Header;
