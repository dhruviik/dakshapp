// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import the new Page component
import Hospital from './Hospital';
import User from './User';
import Option from './User-Option';
import NormalLogin from './User-Normal';
import EmergencyLogin from './User-Emergency';
import HOption from './Hospital-Option';
import NormalCase from './Hospital-Normal';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/case" element={<Option />} />
          <Route path="/hospital/option" element={<HOption />} />
          <Route path="/user/normal" element={<NormalLogin />} />
          <Route path="/hospital/normal" element={<NormalCase />} />
        <Route path="/user/emergency" element={<EmergencyLogin />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
