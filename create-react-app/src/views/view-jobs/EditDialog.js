import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
  InputLabel,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const EditDialog = ({ open, handleClose, jobId }) => {
  const [formData, setFormData] = useState({
    JobNo: '',
    JobsStartDate: '',
    JobExpectedCompleteDate: '',
    JobSummary: '',
    GatePassType: '',
    GatePassNumber: '',
    JobRequestedBy: '',
    JobTransactionType: '',
    ResearcherName: '',
    Weight: '',
    PickupLocation: '',
    packageType: '',
    DeliveryLocation: '',
    LoadReturnDate: '',
  });

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('Component mounted');

    if (jobId) {
      axios
        .get(`${REACT_APP_API_URL}api/new_jobs/${jobId}`)
        .then((response) => {
          console.log('API response:', response.data);

          const formattedStartDate = response.data.JobsStartDate ? response.data.JobsStartDate.split('T')[0] : '';
          const formattedCompleteDate = response.data.JobExpectedCompleteDate ? response.data.JobExpectedCompleteDate.split('T')[0] : '';
  
          setFormData({
            ...response.data,
            JobsStartDate: formattedStartDate,
            JobExpectedCompleteDate: formattedCompleteDate,
          });
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    }

    return () => {
      console.log('Component unmounted');
    };
  }, [jobId]);

  const handleSubmit = () => {
    // Create an object containing the updated data
    const updatedData = {
      JobNo: formData.JobNo,
      JobsStartDate: formData.JobsStartDate,
      JobExpectedCompleteDate: formData.JobExpectedCompleteDate,
      JobSummary: formData.JobSummary,
      GatePassType: formData.GatePassType,
      GatePassNumber: formData.GatePassNumber,
      JobRequestedBy: formData.JobRequestedBy,
      JobTransactionType: formData.JobTransactionType,
      ResearcherName: formData.ResearcherName,
      Weight: formData.Weight,
      PickupLocation: formData.PickupLocation,
      packageType: formData.packageType,
      DeliveryLocation: formData.DeliveryLocation,
      LoadReturnDate: formData.LoadReturnDate,
    };
  
    // Send a PUT request to update the data
    axios
      .put(`${REACT_APP_API_URL}api/new_jobs/${jobId}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // Show a success message (you can customize this)
        alert('Data updated successfully');
        // Refresh the page
         window.location.reload();


      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Show an error message (you can customize this)
        alert('Error updating data');
      });
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <MainCard title="New Jobs Edit">
            <Grid container spacing={3}>
              <Grid item xs={4} md={4}>
                <TextField
                  label="Job Number"
                  placeholder="J1233445"
                  fullWidth
                  variant="outlined"
                  name="JobNo"
                  value={formData.JobNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                  label="Job Start Date"
                  placeholder=""
                  fullWidth
                  variant="outlined"
                  type="date" // Set the input type to "date" for date picker
                  defaultValue="2023-08-28" // Set your desired default date in the "YYYY-MM-DD" format
                  InputLabelProps={{
                    shrink: true // To make the label shrink when a value is entered
                  }}
                  name="JobsStartDate"
                  value={formData.JobsStartDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4} md={4}>
                <TextField
                  label="Job Completion Date"
                  placeholder=""
                  fullWidth
                  variant="outlined"
                  type="date" // Set the input type to "date" for date picker
                  defaultValue="2023-08-28" // Set your desired default date in the "YYYY-MM-DD" format
                  InputLabelProps={{
                    shrink: true // To make the label shrink when a value is entered
                  }}
                  name="JobExpectedCompleteDate"
                  value={formData.JobExpectedCompleteDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Job Summary"
                  placeholder="LDFLDS&2344"
                  fullWidth
                  variant="outlined"
                  name="JobSummary"
                  value={formData.JobSummary}
                  onChange={handleChange}
                />
              </Grid>


              <Grid item xs={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gate Pass Type</InputLabel>
                  <Select label="Gate Pass Type" value={formData.GatePassType} onChange={handleChange} name="GatePassType">
                    <MenuItem value="ICF">ICF</MenuItem>
                    <MenuItem value="Permit GP">Permit GP</MenuItem>
                    <MenuItem value="Returnable<">Returnable</MenuItem>
                    <MenuItem value="ICF">ICF</MenuItem>
                  </Select>
                </FormControl>
                {formData.GatePassType === '2' && (
                  <div>
                    <InputLabel>Return Date</InputLabel>
                    <TextField
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      type="date"
                      defaultValue="2023-08-28"
                      InputLabelProps={{
                        shrink: true
                      }}
                      name="LoadReturnDate"
                      value={formData.LoadReturnDate}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </Grid>

              <Grid item xs={3} md={3}>
                <TextField
                  label="Get Pass Number"
                  placeholder="Get Pass Number"
                  fullWidth
                  variant="outlined"
                  name="GatePassNumber"
                  value={formData.GatePassNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Client | Job Requester</InputLabel>
                  <Select label="Client | Job Requester" value={formData.JobRequestedBy} onChange={handleChange} name="JobRequestedBy"> {/* Remove the extra space here */}
                    <MenuItem value="Mr.Suleman">Mr.Suleman</MenuItem>
                    <MenuItem value="Mr.Anil">Mr.Anil</MenuItem>
                    <MenuItem value="Mr.Rohit">Mr.Rohit</MenuItem>
                    <MenuItem value="Mr.Kamal">Mr.Kamal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Transaction Type</InputLabel>
                  <Select label="Transaction Type" value={formData.JobTransactionType} onChange={handleChange} name="JobTransactionType">
                    <MenuItem value="Inside To Inside">Inside To Inside</MenuItem>
                    <MenuItem value="Inside To Outside">Inside To Outside</MenuItem>
                    <MenuItem value="Outside To Inside">Outside To Inside</MenuItem>
                    <MenuItem value="Outside To Outside">Outside To Outside</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Researcher Name</InputLabel>
                  <Select label="Researcher Name" value={formData.ResearcherName} onChange={handleChange} name="ResearcherName">
                    <MenuItem value="EDGE Corp">EDGE Corp</MenuItem>
                    <MenuItem value="Digi Mech">Digi Mech</MenuItem>
                    <MenuItem value="TSL1">TSL1</MenuItem>
                    <MenuItem value="Long Pro 23">Long Pro 23</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Actual Weight in KG"
                  placeholder=""
                  fullWidth
                  variant="outlined"
                  name="Weight"
                  value={formData.Weight}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Pickup Location | Address"
                  placeholder="Mr.Suleman"
                  fullWidth
                  variant="outlined"
                  name="PickupLocation" // Remove the extra space here
                  value={formData.PickupLocation}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Delivery Location | Address"
                  placeholder=""
                  fullWidth
                  variant="outlined"
                  name="DeliveryLocation"
                  value={formData.DeliveryLocation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Package Type</InputLabel>
                  <Select label="Package Type" value={formData.packageType} onChange={handleChange} name="packageType">
                    <MenuItem value="Bags">Bags</MenuItem>
                    <MenuItem value="PCS">PCS</MenuItem>
                    <MenuItem value="Drum">Drum</MenuItem>
                    <MenuItem value="Box">Box</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
         
        </MainCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;






