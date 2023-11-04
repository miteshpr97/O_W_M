import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Snackbar, Box, } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const CustomerJobs = () => {
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    address: '',
    city: '',
    pin: '',
    phone1: '',
    phone2: '',
    email: '',
    website: '',
    contactPerson: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customerCode" && !formData.customerCode) {
      // Only update customerCode if it's empty
      setFormData({ ...formData, [name]: value });
    } else if (name !== "customerCode") {
      // Update other fields as usual
      setFormData({ ...formData, [name]: value });
    }
  };


  // useEffect(() => {
  //   // Fetch the last customer code when the component mounts
  //   const fetchLastCustomerCode = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}api/customers/lastcustomercode`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data, "ciisnsn")
  //         // Increment the last customer code by 1 and update the formData state
  //         const nextCustomerCode = parseInt(data.customerCode, 10) + 1;

  //         console.log(nextCustomerCode, "kdajjkc")
  //         setFormData({
  //           ...formData,
  //           customerCode: nextCustomerCode.toString(),
  //         });
  //       } else {
  //         console.error('Failed to fetch last customer code');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   // Call the fetchLastCustomerCode function when the component mounts
  //   fetchLastCustomerCode();
  // }, [])
  
  useEffect(() => {
    // Fetch the last customer code when the component mounts
    const fetchLastCustomerCode = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}api/customers/lastcustomercode`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data, "customer dataa");
          // Increment the last customer code by 1 and update the formData state
          const nextCustomerCode = parseInt(data.customerCode, 10) + 1;

          console.log(nextCustomerCode, "kdajjkc");
          setFormData({
            ...formData,
            customerCode: nextCustomerCode.toString(),
          });
        } else {
          console.error('Failed to fetch last customer code');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetchLastCustomerCode function when the component mounts
    fetchLastCustomerCode();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${REACT_APP_API_URL}api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Customer data posted successfully');
        setError('');
        setOpenSuccessSnackbar(true);
        setOpenErrorSnackbar(false);

        // Clear all form fields by resetting formData to its initial state
        setFormData({
          customerCode: '',
          customerName: '',
          address: '',
          city: '',
          pin: '',
          phone1: '',
          phone2: '',
          email: '',
          website: '',
          contactPerson: '',
        });
      } else {
        setError('Failed to post customer data');
        setSuccessMessage('');
        setOpenErrorSnackbar(true);
        setOpenSuccessSnackbar(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      setSuccessMessage('');
      setOpenErrorSnackbar(true);
      setOpenSuccessSnackbar(false);
    }
  };



  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };




  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };


  return (
    <MainCard title=" New Customer">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Code"
              id="customerCode"
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Name"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Pin"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number 1"
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number 2"
              id="phone2"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Website"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>

            <Box display="flex" justifyContent="space-between" padding={2}>

              <NavLink to="/customer-Details/" activeClassName="active-link">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#15698c", color: "white" }} // Set background color and text color
                >
                  View Customer
                </Button>
              </NavLink>

















 
              <Link to="/customer-Details/">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#15698c", color: "white" }} // Set background color and text color
                >
                  View Customer
                </Button>

              </Link> 









              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#15698c", color: "white" }} // Set background color and text color
              >
                Submit
              </Button>
            </Box>

          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
        message={successMessage}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ backgroundColor: 'green', color: 'white' }}
      />

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorSnackbarClose}
        message={error}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ backgroundColor: 'red', color: 'white' }}
      />

    </MainCard>
  );
};

export default CustomerJobs;
