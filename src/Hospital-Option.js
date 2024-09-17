// src/Page.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Header from './Component/Navbar';

const HOption = () => {
    const location = useLocation();
    const { hospitalName } = location.state || {};
    
  return (
    <div className='overflow-hidden'>
      <Header />

      <Container className='mt-5'>
        <div className="user-options-container">
          <h2>{hospitalName} Hospital Information</h2>

          <div className="option-section">
            <h4>Normal Case</h4>
            <p>Click & check normal case.</p>
            <Link to="/hospital/normal" state={{ hospitalName }}>
              <button className='rounded-2'>Normal</button>
            </Link>
          </div>

          <div className="option-section">
            <h4>Emergency Case</h4>
            <p>Click & check emergency case.</p>
            <Link to="/hospital/emergency" state={{ hospitalName }}>
              <button className='rounded-2'>Emergency</button>
            </Link>
          </div>

          <div className="option-section">
            <h4>Doctor</h4>
            <p>Add & check doctors.</p>
            <Link to="/hospital/doctor" state={{ hospitalName }}>
              <button className='rounded-2'>Doctor</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HOption;
