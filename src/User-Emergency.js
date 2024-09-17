import React, { useState } from "react";
import axios from "axios";
import Header from "./Component/Navbar";

const EmergencyLogin = () => {
    const [formData, setFormData] = useState({
        category: "",
        name: "",
        number: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);


        try {
            const response = await axios.post("https://api.example.com/submit", formData);
            console.log("Form Data Submitted: ", response.data);
            alert("Form Submitted Successfully!");
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="form-container">
                <h2 className="form-title fw-bold">Emergency Form</h2>
                <form onSubmit={handleSubmit} className="category-form">
                    {/* Category Selection */}
                    <label htmlFor="category">Select Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select Category</option>
                        <option value="known">Known Person</option>
                        <option value="unknown">Unknown Person</option>
                    </select>

                    {/* Conditional Fields */}
                    {formData.category === "known" && (
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                required
                                className="form-input"
                            />

                            <label htmlFor="number">Contact Number</label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="Enter Contact Number"
                                required
                                className="form-input"
                            />

                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                required
                                className="form-input"
                            />
                        </>

                    )}

                    {formData.category === "unknown" && (
                        <>
                            <label htmlFor="number">Contact Number</label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="Enter Contact Number"
                                required
                                className="form-input"
                            />

                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                required
                                className="form-input"
                            />
                        </>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="form-button submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmergencyLogin;
