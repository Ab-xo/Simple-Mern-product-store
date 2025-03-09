import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Grid, Typography, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const HomePage = ({ searchQuery }) => {  // Receive searchQuery prop from Navbar
  const { products, fetchProducts, updateProduct, deleteProduct } = useProductStore((state) => state);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset the products if there's no search query
    }
  }, [searchQuery, products]);

  // Handle edit product details
  const handleEditOpen = (product) => {
    setEditProduct({ ...product });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const { success, message } = await updateProduct(editProduct);
    if (success) {
      handleEditClose();
      toast.success(`Success: ${message}`, {  // Toast for success
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Failed: ${message}`, {  // Toast for error
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast.success(`Success: ${message}`, {  // Toast for success
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Failed: ${message}`, {  // Toast for error
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: 4, fontWeight: 'bold' }}>
        Product List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, filter 0.3s ease',
                width: '100%',
                height: 'auto',
                '&:hover': {
                  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)', 
                  filter: 'brightness(1.1)',  
                  border: '2px solid #00796b',
                },
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="300"
                image={product.image}
                sx={{
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                  },
                }}
              />
              <CardContent sx={{ padding: '16px' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1, textAlign: 'center', color: 'black', filter: 'grayscale(100%)' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', filter: 'grayscale(100%)' }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{
                    textTransform: 'none',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#00796b',
                    },
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                    // eslint-disable-next-line no-dupe-keys
                    '&:hover': {
                      filter: 'grayscale(0%)',
                    },
                  }}
                  onClick={() => handleEditOpen(product)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{
                    textTransform: 'none',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#f44336',
                    },
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                    // eslint-disable-next-line no-dupe-keys
                    '&:hover': {
                      filter: 'grayscale(0%)',
                    },
                  }}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Product Dialog */}
      {editProduct && (
        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Product Name"
              fullWidth
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Product Price"
              fullWidth
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Product Image URL"
              fullWidth
              name="image"
              value={editProduct.image}
              onChange={handleEditChange}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
