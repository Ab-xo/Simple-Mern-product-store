import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, IconButton } from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { useProductStore } from '../store/product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  const { addProduct } = useProductStore((state) => state);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add product logic
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent form default submit
    const { success, message } = await addProduct(newProduct);

    if (!success) {
      toast.error(`Failed: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`Success: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNewProduct({ name: '', price: '', image: '' }); // Reset form after successful product addition
    }
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Effect to apply dark mode styles
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  }, [darkMode]);

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: '40px',
        backgroundColor: darkMode ? '#333333' : '#ffffff',
        color: darkMode ? '#f8f8f8' : '#000000',
        borderRadius: '10px',
        padding: '20px'
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create New Product
      </Typography>

      <form onSubmit={handleAddProduct}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          style={{
            backgroundColor: darkMode ? '#444444' : '#ffffff',
            marginBottom: '10px'
          }}
        />

        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          style={{
            backgroundColor: darkMode ? '#444444' : '#ffffff',
            marginBottom: '10px'
          }}
        />

        <TextField
          label="Image URL"
          variant="outlined"
          type="url"
          fullWidth
          margin="normal"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#f8f8f8' : '#000000' }
          }}
          style={{
            backgroundColor: darkMode ? '#444444' : '#ffffff',
            marginBottom: '10px'
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{
            marginTop: '20px',
            padding: '12px',
            fontSize: '1rem',
            backgroundColor: darkMode ? '#00796b' : '#ff4081',
            color: darkMode ? '#f8f8f8' : '#ffffff'
          }}
        >
          Add Product
        </Button>
      </form>

      {/* Dark Mode Toggle */}
      <IconButton
        onClick={handleDarkModeToggle}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#ff4081' : '#00796b',
          padding: '10px',
          borderRadius: '50%',
        }}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default CreatePage;
