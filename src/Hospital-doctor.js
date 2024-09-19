import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Component/Navbar";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

const Doctor = () => {
    const location = useLocation();
    const { hospitalName } = location.state || {}; // Extract hospitalName from state

    const [formData, setFormData] = useState({
        name: "",
        degree: "",
        experience: "",
        specialty: "",
        hospital: hospitalName || "", // Set initial value of hospital
    });

    const [doctors, setDoctors] = useState([]); // To store doctor data

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:5000/users/add/doctor", formData);
            console.log("Form Data Submitted: ", response.data);
            alert("Form Submitted Successfully!");
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert(error.response.data.message);
        }
    };

    // Function to fetch doctor data
    useEffect(() => {
        if (hospitalName) {
            axios.post('http://localhost:5000/users/get/doctor', {
                hospital: hospitalName
            })
            .then(response => {
                // Check if the response data has a `data` field with patient array
                if (response.data.status === 'Success') {
                    setDoctors(response.data.data); // Set patients data from the response
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [hospitalName]);
    

    return (
        <>
        <Header />
        <Container>
            <div className="form-container">
                <h2 className="form-title fw-bold">Doctor Form</h2>
                <form onSubmit={handleSubmit} className="doctor-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Doctor's Name"
                        required
                        className="form-input"
                    />

                    <label htmlFor="degree">Degree</label>
                    <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        placeholder="Enter Degree"
                        required
                        className="form-input"
                    />

                    <label htmlFor="experience">Experience (in years)</label>
                    <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Enter Years of Experience"
                        required
                        className="form-input"
                    />

                    <label htmlFor="specialty">Specialty</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        placeholder="Enter Specialty"
                        required
                        className="form-input"
                    />

                    {/* Hospital Name Pre-filled from Location State */}
                    <label htmlFor="hospital">Hospital Name</label>
                    <input
                        type="text"
                        id="hospital"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        placeholder="Enter Hospital Name"
                        required
                        className="form-input"
                        readOnly={!!hospitalName} // Make field readonly if hospitalName is passed from state
                    />

                    <button type="submit" className="form-button submit-button">
                        Submit
                    </button>
                </form>

                
            </div>
            {/* Doctor Data Table */}
            <div className="doctor-table-container pt-5">
                    <h3 className="table-title fw-bold">Doctor List :</h3>
                    {doctors.length > 0 ? (
                        <table className="doctor-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Degree</th>
                                <th>Experience</th>
                                <th>Specialty</th>
                                <th>Hospital</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.degree}</td>
                                    <td>{doctor.experience}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.hospital}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                        <p>No doctors found.</p>
                    )}
                </div>
        </Container>
        </>
    );
};

export default Doctor;
