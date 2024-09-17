import React, { useState } from "react";
import axios from "axios";
import Header from "./Component/Navbar";
import { useNavigate } from "react-router-dom";

const NormalLogin = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    bloodGroup: "",
    email: "",
    gender: "male",
    contact: "",
    address: "",
    aadhar: "",
    disease: "",
    hospital: "",
    doctor: "",
    slotTime: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalId: "",
    bankAccount: "",
    ifscCode: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'paymentMethod') {
      const paymentDetails = {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paypalId: "",
        bankAccount: "",
        ifscCode: "",
        upiId: "",
      };
      setFormData({ ...formData, ...paymentDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 4) {
      setStep(step + 1);
    } else {
      let filteredFormData = { ...formData };
  
    // Remove payment-specific fields based on the selected payment method
    if (formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') {
      delete filteredFormData.paypalId;
      delete filteredFormData.bankAccount;
      delete filteredFormData.ifscCode;
      delete filteredFormData.upiId;
    } else if (formData.paymentMethod === 'paypal') {
      delete filteredFormData.cardNumber;
      delete filteredFormData.expiryDate;
      delete filteredFormData.cvv;
      delete filteredFormData.bankAccount;
      delete filteredFormData.ifscCode;
      delete filteredFormData.upiId;
    } else if (formData.paymentMethod === 'net-banking') {
      delete filteredFormData.cardNumber;
      delete filteredFormData.expiryDate;
      delete filteredFormData.cvv;
      delete filteredFormData.paypalId;
      delete filteredFormData.upiId;
    } else if (formData.paymentMethod === 'upi') {
      delete filteredFormData.cardNumber;
      delete filteredFormData.expiryDate;
      delete filteredFormData.cvv;
      delete filteredFormData.paypalId;
      delete filteredFormData.bankAccount;
      delete filteredFormData.ifscCode;
    }
  
      try {
        const response = await axios.post("http://localhost:5000/users/add/patient", formData);
        console.log("Form Data Submitted: ", response.data);
        alert("Appointment Successfully Submitted!");
        navigate("/");
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    }
  };

  

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2 className="form-title fw-bold">Appointment Form</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          {step === 1 && (
            <div className="form-step d-flex flex-column">
              <h3>Patient Details</h3>

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

              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="form-input"
              />

              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter Age"
                required
                className="form-input"
              />

              <label htmlFor="bloodGroup">Blood Group</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter Blood Group"
                required
                className="form-input"
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="form-input"
              />

              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
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

              <label htmlFor="aadhar">Aadhar Card</label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                placeholder="Enter Aadhar Card Number"
                required
                className="form-input"
              />

              <label htmlFor="disease">Disease</label>
              <input
                type="text"
                id="disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                placeholder="Enter Disease"
                required
                className="form-input"
              />

              <div className="form-navigation d-flex gap-3">
                <button type="submit" className="form-button next-button">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step d-flex flex-column">
              <h3>Hospital Selection</h3>
              <label htmlFor="hospital">Hospital</label>
              <select
                id="hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select Hospital</option>
                <option value="Zydus Hospital">Zydus Hospital</option>
                <option value="Iris Hospital">Iris Hospital</option>
                <option value="Anand City Hospital">Anand City Hospital</option>
                <option value="Deep Hospital">Deep Hospital</option>
                <option value="Swastik Hospital">Swastik Hospital</option>
                <option value="Krishna Hospital">Krishna Hospital</option>
                <option value="Shashwat Hospital">Shashwat Hospital</option>
              </select>
              <div className="form-navigation d-flex gap-3">
                <button type="button" onClick={handlePrev} className="form-button prev-button">
                  Previous
                </button>
                <button type="submit" className="form-button next-button">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step d-flex flex-column">
              <h3>Doctor Selection</h3>
              <label htmlFor="doctor">Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. A">Dr. A</option>
                <option value="Dr. B">Dr. B</option>
                <option value="Dr. C">Dr. C</option>
              </select>
              <div className="form-navigation d-flex gap-3">
                <button type="button" onClick={handlePrev} className="form-button prev-button">
                  Previous
                </button>
                <button type="submit" className="form-button next-button">Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step d-flex flex-column">
              <h3>Slot Time</h3>
              <label htmlFor="slotTime">Select Slot Time</label>
              <input
                type="time"
                id="slotTime"
                name="slotTime"
                value={formData.slotTime}
                onChange={handleChange}
                required
                className="form-input"
              />

              <div className="payment-section d-flex flex-column">
                <h3>Payment Details</h3>
                <label htmlFor="paymentMethod">Select Payment Method:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handlePaymentChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="net-banking">Net Banking</option>
                  <option value="upi">UPI</option>
                </select>

                {/* Credit/Debit Card Details */}
                {(formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card") && (
                  <div id="card-details" className="d-flex flex-column">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handlePaymentChange}
                      className="form-input"
                    />

                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      className="form-input"
                    />

                    <label htmlFor="cvv">CVV:</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handlePaymentChange}
                      className="form-input"
                    />
                  </div>
                )}

                {formData.paymentMethod === "paypal" && (
                  <div id="paypal-details" className="d-flex flex-column">
                    <label htmlFor="paypalId">PayPal ID:</label>
                    <input
                      type="email"
                      id="paypalId"
                      name="paypalId"
                      value={formData.paypalId}
                      onChange={handlePaymentChange}
                      placeholder="example@paypal.com"
                      className="form-input"
                    />
                  </div>
                )}

                {formData.paymentMethod === "net-banking" && (
                  <div id="netbanking-details" className="d-flex flex-column">
                    <label htmlFor="bankAccount">Bank Account Number:</label>
                    <input
                      type="text"
                      id="bankAccount"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handlePaymentChange}
                      className="form-input"
                    />

                    <label htmlFor="ifscCode">IFSC Code:</label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handlePaymentChange}
                      className="form-input"
                    />
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div id="upi-details" className="d-flex flex-column">
                    <label htmlFor="upiId">UPI ID:</label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handlePaymentChange}
                      placeholder="example@upi"
                      className="form-input"
                    />
                    <div className="qr-code">
                      <img src="your-qr-code-image.png" alt="UPI QR Code" />
                      <p>Scan the QR code to pay using UPI</p>
                    </div>
                  </div>
                )}

                <div className="form-navigation d-flex gap-3">
                  <button type="button" onClick={handlePrev} className="form-button prev-button">
                    Previous
                  </button>
                  <button type="submit" className="form-button next-button">Make Payment</button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NormalLogin;
