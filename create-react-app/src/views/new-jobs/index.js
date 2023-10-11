
import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Snackbar, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const NewJobs = () => {
  const [customerCodes, setCustomerCodes] = useState([]);
  const [formData, setFormData] = useState({
    customerCode: '',
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
    JobsStatus: "",
    UserCode: "",
    JobCreationDateTime: ""
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  const handleCustomerCodeChange = (e) => {
    const selectedCustomerCode = e.target.value;
    const selectedCustomer = customerCodes.find(customer => customer.customerCode === selectedCustomerCode);
    if (selectedCustomer) setFormData({ ...formData, customerCode: selectedCustomerCode });
  };

  useEffect(() => {
    async function fetchCustomerCodes() {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/customers`);
        if (response.ok) {
          const customersData = await response.json();
          const codesAndNames = customersData.map(customer => ({
            customerCode: customer.customerCode,
            customerName: customer.customerName,
          }));
          setCustomerCodes(codesAndNames);
        } else console.error('Error fetching customer data');
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }
    fetchCustomerCodes();
  }, []);


  useEffect(() => {
   
    const fetchLastJobNo = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/new_jobs/last-job-no`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          // Extract the numeric part from "JOB0003" by removing "JOB"
          const numericPart = parseInt(data.JobNo.slice(3), 10);
    
          if (!isNaN(numericPart)) {
            // Increment the last JobNo by 1 and update the formData state
            const nextJobNo = numericPart + 1;
            setFormData({
              ...formData,
              JobNo: `JOB${nextJobNo.toString().padStart(4, '0')}`,
            });
          } else {
            console.error('Invalid numeric part:', data.JobNo);
          }
        } else {
          console.error('Failed to fetch last JobNo');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // Call the fetchLastJobNo function when
    
    
   








    fetchLastJobNo();
  }, []);




  const customerDetails = customerCodes.map(customer => (
    <MenuItem key={customer.customerCode} value={customer.customerCode}>
      {`${customer.customerCode} - ${customer.customerName}`}
    </MenuItem>
  ));

  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "JobNo" && !formData.JobNo) {
      // Only update customerCode if it's empty
      setFormData({ ...formData, [name]: value });
    } else if (name !== "JobNo") {
      // Update other fields as usual
      setFormData({ ...formData, [name]: value });
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_API_URL}api/new_jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Customer data posted successfully');
        setError('');
        setOpenSuccessSnackbar(true);
        setOpenErrorSnackbar(false);
        setFormData({
          customerCode: '',
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
          JobsStatus: "",
          UserCode: "",
          JobCreationDateTime: ""
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

  const handleSuccessSnackbarClose = () => setOpenSuccessSnackbar(false);
  const handleErrorSnackbarClose = () => setOpenErrorSnackbar(false);

  return (
    <MainCard title="Create New Job">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth margin="normal">
              <Typography variant="subtitle1">Select Customer</Typography>
              <Select
                defaultValue="" // Set the default value to an empty string
                variant="outlined"
                name="customerCode"
                value={formData.customerCode} // Use customerCode in value
                onChange={handleCustomerCodeChange}
              >
                <MenuItem value="" disabled>
                  Select Customer Code
                </MenuItem>
                {customerDetails}
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              label="Job Number"
              placeholder="J1233445"
              fullWidth
              variant="outlined"
               name="JobNo"
              value={formData.JobNo}
              onChange={handleChange}
              required
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
              required
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
              required
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
              required
            />
          </Grid>
           <Grid item xs={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gate Pass Type</InputLabel>
              <Select label="Gate Pass Type" value={formData.GatePassType} onChange={handleChange} name="GatePassType">
                <MenuItem value="ICF">ICF</MenuItem>
                <MenuItem value="Permit GP">Permit GP</MenuItem>
                <MenuItem value="Returnable">Returnable</MenuItem>
              </Select>
            </FormControl>
            {formData.GatePassType === 'Returnable' && (
              <div>
                <InputLabel>Return Date</InputLabel>
                <TextField
                  placeholder=""
                  fullWidth
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  name="LoadReturnDate"
                  value={formData.LoadReturnDate}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </Grid> 

          <Grid item xs={6} md={3}>
            <TextField
              label="Get Pass Number"
              placeholder="Get Pass Number"
              fullWidth
              variant="outlined"
              name="GatePassNumber"
              value={formData.GatePassNumber}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Client | Job Requester</InputLabel>
              <Select label="Client | Job Requester" value={formData.JobRequestedBy} onChange={handleChange} name="JobRequestedBy" required> {/* Remove the extra space here */}
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
              <Select label="Transaction Type" value={formData.JobTransactionType} onChange={handleChange} name="JobTransactionType" required>
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
              <Select label="Researcher Name" value={formData.ResearcherName} onChange={handleChange} name="ResearcherName" required>
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
              required
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
              required
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
              required
            />
          </Grid>


          <Grid item xs={12} md={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Package Type</InputLabel>
              <Select label="Package Type" value={formData.packageType} onChange={handleChange} name="packageType" required>
                <MenuItem value="Bags">Bags</MenuItem>
                <MenuItem value="PCS">PCS</MenuItem>
                <MenuItem value="Drum">Drum</MenuItem>
                <MenuItem value="Box">Box</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" marginTop="15px" marginRight="5px">
          <Button type="submit" variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
            Submit
          </Button>
        </Box>

      </form>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={7000}
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
        autoHideDuration={7000}
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

export default NewJobs;










  // const handleDateChange = (event, jobNo) => {
  //   const newDate = event.target.value;
  //   setSelectedDate({
  //     ...selectedDate,
  //     [jobNo]: newDate,
  //   });
  // };
