import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // You can use axios or fetch API
import Header from './Component/Navbar';
import { Container } from 'react-bootstrap';

const NormalCase = () => {
    const location = useLocation();
    const { hospitalName } = location.state || {};

    // State to hold the fetched data
    const [patients, setPatients] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        if (hospitalName) {
            // Replace with your actual API endpoint
            axios.post('https://yourapi.com/patients', {
                hospitalName: hospitalName // Send hospitalName in the body
            })
            .then(response => {
                setPatients(response.data); // Assuming the API response contains an array of patients
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
            <h1 className='fw-bold '>Normal Cases at {hospitalName} :</h1>

            {/* Check if we have patients data */}
            {patients.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Blood Group</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Aadhar</th>
                            <th>Disease</th>
                            <th>Doctor</th>
                            <th>Slot Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.age}</td>
                                <td>{patient.bloodgroup}</td>
                                <td>{patient.email}</td>
                                <td>{patient.contact}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.address}</td>
                                <td>{patient.adhar}</td>
                                <td>{patient.disease}</td>
                                <td>{patient.doctor}</td>
                                <td>{patient.slottime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No patient data available</p>
            )}
            </Container>
        </div>
    );
};

export default NormalCase;
