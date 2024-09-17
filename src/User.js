import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Component/Navbar';
import { Container } from 'react-bootstrap';

// img
import newlogo from "./img/newlogo.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons/faBookOpenReader';

const User = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agree: false,
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if terms and conditions are agreed to
        if (!formData.agree) {
            alert('You must agree to the terms and conditions.');
            return;
        }

        try {
            // Call the API to create data in the database
            const response = await axios.post('http://localhost:5000/users/add/user', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            console.log('Response:', response.data);
            alert('Signup successful!');
            
            // Navigate to the /user/case page
            navigate('/user/case');
        } catch (error) {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <Container fluid className="d-flex justify-content-between align-items-center py-2">
                <div className='mx-auto'>
                <FontAwesomeIcon icon={faBookOpenReader} className='fs-1 mx-auto w-100 py-3'/>
                <h2 className='text-center'>Join Us Now</h2>
                    <p className="sub-heading mx-auto">Join over 1000 people learning with us.</p>

                    <div className="btns">
                        <button id="google-btn" className="btn btn-secondary">
                            <i className="bi bi-google"></i> Sign up with Google
                        </button>
                        <button className="btn btn-secondary">
                            <i className="bi bi-facebook"></i> Sign up with Facebook
                        </button>
                    </div>

                    <form id="signup-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="input-group">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                            />
                            <label htmlFor="agree">I agree to the <a href="/">terms and conditions</a></label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 d-block text-center">
                            Sign Up
                        </button>
                    </form>

                    <div className="footer-group">
                        <span>Already Registered? <a href="/">Sign In</a></span>
                        <a href="/">Forgot password?</a>
                    </div>
                </div>

                <div className="hero-section border">
                    <img src={newlogo} alt="New Logo" className='img-fluid' width={500}/>
                </div>
            </Container>
        </div>
    );
};

export default User;
