import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for ToastContainer

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box minH={"100vh"} display="flex" flexDirection="column">
      {/* Pass searchQuery and setSearchQuery to Navbar */}
      <Navbar setSearchQuery={setSearchQuery} />
      
      {/* Add ToastContainer here to render notifications globally */}
      <ToastContainer />
      
      <Routes>
        {/* Route for the Home page */}
        <Route path="/home" element={<HomePage searchQuery={searchQuery} />} />

        {/* Route for the Create page */}
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
