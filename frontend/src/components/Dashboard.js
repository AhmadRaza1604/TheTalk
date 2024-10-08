// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Function to extract username from the token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || 'User'); // Set the username from the token
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        navigate('/login'); // Redirect to login if token is invalid
      }
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold">Welcome, {username}!</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700">This is your dashboard. You can add more features here!</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
