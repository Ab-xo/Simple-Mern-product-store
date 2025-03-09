import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Button, InputBase, Menu, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon, LocalMall as LocalMallIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ setSearchQuery }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [searchInput, setSearchInput] = useState(''); // Track search query locally
  const location = useLocation(); // Get current page location
  const navigate = useNavigate(); // Initialize navigate function

  const theme = useTheme(); // For responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small

  // Handle menu open and close
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Navigate to create page
  const handleAddProduct = () => {
    navigate('/create'); // Redirect to CreatePage route
  };

  // Update search query in parent component
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value); // Update local search input
    setSearchQuery(value);  // Pass search query to parent component (HomePage)
  };

  // Update background color based on dark mode
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  }, [darkMode]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: darkMode ? '#333333' : '#00796b', zIndex: 9999 }}>
      <Toolbar>
        {/* Logo and Store Name */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            PRODUCT STORE <LocalMallIcon sx={{ fontSize: '1.8rem', verticalAlign: 'middle' }} />
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 2,
          gap: 2,
          flexWrap: 'wrap', // Allow elements to wrap on smaller screens
        }}>
          {['Home', 'About', 'Contact'].map((text) => {
            const isActive = location.pathname === `/${text.toLowerCase()}` || (text === 'Home' && location.pathname === '/');
            return (
              <Link key={text} to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <Button sx={{
                  color: isActive ? (darkMode ? '#f39c12' : '#ff4081') : (darkMode ? '#f8f8f8' : '#ffffff'),
                  transition: '0.3s ease',
                  '&:hover': { color: darkMode ? '#f39c12' : '#00bcd4' }
                }}>
                  {text}
                </Button>
              </Link>
            );
          })}
        </Box>

        {/* Right section: Add Product Button, Search, Account Menu, and Dark Mode Toggle */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap', // Allow elements to wrap on smaller screens
        }}>
          {/* Add Product Button */}
          <IconButton
            color="inherit"
            onClick={handleAddProduct}
            sx={{
              color: darkMode ? '#f8f8f8' : '#ffffff',
              transition: '0.3s ease',
              '&:hover, &:focus': { color: darkMode ? '#f39c12' : '#ff4081' }
            }}
          >
            <AddIcon />
          </IconButton>

          {/* Search Bar */}
          {!isSmallScreen && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '2px 10px',
              marginX: '10px',
              minWidth: '200px',
              [theme.breakpoints.down('sm')]: {
                minWidth: '150px', // Decrease size on small screens
              }
            }}>
              <SearchIcon />
              <InputBase
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchChange}
                sx={{ ml: 1, width: '100%' }}
              />
            </Box>
          )}

          {/* Account Menu */}
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            sx={{
              color: darkMode ? '#f8f8f8' : '#ffffff',
              transition: '0.3s ease',
              '&:hover, &:focus': { color: darkMode ? '#ffcc00' : '#6200ea' }
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          {/* Dark Mode Toggle */}
          <IconButton
            onClick={handleDarkModeToggle}
            sx={{
              color: darkMode ? 'white' : 'inherit',
              transition: '0.3s ease',
              '&:hover': { transform: 'rotate(180deg) scale(1.1)', color: darkMode ? '#ff4081' : '#ffcc00' }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
