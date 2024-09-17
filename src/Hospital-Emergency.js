import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Component/Navbar';
import { Container } from 'react-bootstrap';

const EmergencyCase = () => {
    const location = useLocation();
    const { hospitalName } = location.state || {};

    // State to hold the fetched data
    const [emergencies, setEmergencies] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        if (hospitalName) {
            axios.get('http://localhost:5000/users/get/emergency', {
                hospitalName: hospitalName
            })
            .then(response => {
                // Check if the response data has a `data` field with emergency array
                if (response.data.status === 'Success') {
                    setEmergencies(response.data.data); // Set emergencies data from the response
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [hospitalName]);

    return (
        <div>
            <Header />
            <Container className='pt-5'>
                <h1 className='fw-bold pb-5'>Emergency Cases at {hospitalName} :</h1>

                {/* Check if we have emergencies data */}
                {emergencies.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergencies.map((emergency, index) => (
                                <tr key={index}>
                                    <td>{emergency.category}</td>
                                    <td>{emergency.name || '-'}</td>
                                    <td>{emergency.number || '-'}</td>
                                    <td>{emergency.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No emergency data available</p>
                )}
            </Container>
        </div>
    );
};

export default EmergencyCase;
