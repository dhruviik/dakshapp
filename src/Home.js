// src/Page.js
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// img
import main from "./img/background-image.jpg"
import Header from './Component/Navbar';

const Home = () => {
    const handleUser = () => {
        window.location.href = "/user";
      };

      const handleHospital = () => {
        window.location.href = "/hospital";
      };
    return (
        <div className='overflow-hidden'>
            <Header />

            <Container className='mt-5'>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs={12} md={8}>
                        <img src={main} alt="OPD Logo" className='img-fluid' />
                    </Col>

                    <Col md={4} className="text-center mt-4 px-5">
                        <div className='d-flex flex-column'>
                            <button variant="primary" className="mb-3 custom-btn" onClick={handleHospital}>
                                Hospital
                            </button>
                            <button variant="primary" className="custom-btn" onClick={handleUser}>
                                User
                            </button>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default Home;
