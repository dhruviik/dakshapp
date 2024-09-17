// src/Page.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Component/Navbar';

const Option = () => {
  return (
    <div className='overflow-hidden'>
      <Header />

      <Container className='mt-5'>
        <div className="user-options-container">
          <h2>Please Select an Option</h2>

          <div className="option-section">
            <h4>Normal Case</h4>
            <p>Proceed with normal case.</p>
            <Link to="/user/normal">
              <button className='rounded-2'>Normal</button>
            </Link>
          </div>

          <div className="option-section">
            <h4>Emergency Case</h4>
            <p>In case of emergency.</p>
            <Link to="/user/emergency">
              <button className='rounded-2'>Emergency</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Option;
