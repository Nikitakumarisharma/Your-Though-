import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Path to Header component
import LoginPage from './pages/LoginPage'; // Path to LoginPage component
import HomePage from './pages/HomePage'; // Path to HomePage component
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header /> {/* This will appear on all pages */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} /> 
        {/* yha pe routing ki ja rhi hai ki /home rahe to kis page pe jana hai. */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
