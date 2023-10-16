
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const EditDialog = ({ open, handleClose, customerId }) => {
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

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (customerId) {
      axios.get(`${REACT_APP_API_URL}api/customers/${customerId}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('Error fetching customer data:', error));
    }
  }, [customerId]);

  const handleSubmit = () => {
    axios.put(`${REACT_APP_API_URL}api/customers/${customerId}`, formData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        alert('Data updated successfully');
        location.reload();
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Error updating data');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <MainCard title=" Edit Customer Details">
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
                required
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
                required
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
           
          </Grid>
        </MainCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
