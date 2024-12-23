import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Path to Header component
import LoginPage from './components/LoginPage'; // Path to LoginPage component
import Footer from './components/Footer'; 
import PostThought from './components/PostThought';
import ThoughtsList from './components/ThoughtsList';

const App = () => {
  return (
    <Router>
      <Header /> {/* This will appear on all pages */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" 
        element={
        <>
        <PostThought />,<ThoughtsList/>
        </>
        } /> 
        {/* yha pe routing ki ja rhi hai ki /home rahe to kis page pe jana hai. */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
