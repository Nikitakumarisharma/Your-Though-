import React from 'react';
import { auth } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home'); // Redirect after successful login
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">LOGIN WITH GOOGLE</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login 
      </button>
    </div>
  );
};

export default LoginPage;
