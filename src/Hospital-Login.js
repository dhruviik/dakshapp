import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Component/Navbar';
import { Container } from 'react-bootstrap';

const HospitalLogin = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginData({
            ...loginData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the login API
            const response = await axios.post('http://localhost:5000/users/login/hospital', {
                email: loginData.email,
                password: loginData.password
            });

            console.log('Login Response:', response.data);
            alert('Login successful!');

            // Navigate to another page after successful login
            navigate('/hospital/option', { state: { hospitalName: response.data.data } });
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data && error.response.data.message) {
                // If error response contains a message, show it in an alert
                alert(error.response.data.message);
            } else {
                // If no specific error message, show a generic error message
                alert('Login failed. Please try again.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header />
            <Container className="d-flex mt-5 justify-content-center align-items-center">
                <div className="w-50 mt-5 p-4 shadow border rounded">
                    <h2 className='text-center fw-bold'>Hospital Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary mt-3">Login</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default HospitalLogin;
