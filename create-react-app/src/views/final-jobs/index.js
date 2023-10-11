import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
  InputLabel,
  Tab,
  Tabs,
  
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import Todo from './todo';


const FinalJobs = () => {

  const { JobNo } = useParams();
  // console.log(index);

  const [selectedTab, setSelectedTab] = useState(0);

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

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "JobNo" && !formData.JobNo) {
      // Only update customerCode if it's empty
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name !== "JobNo") {
      // Update other fields as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  


  useEffect(() => {
    console.log('Component mounted');
    // Fetch customer data from the API using Axios or your preferred HTTP librar
    axios.get(`${REACT_APP_API_URL}api/new_jobs/${JobNo}`)
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
        console.error('Error fetching customer data:', error);
      });

    return () => {
      console.log('Component unmounted');
    };
  }, [JobNo]);



  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };




  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted with data:", formData);

  //   // Show an alert with the message "Ready for plan"
  //   window.alert("Ready for plan");

  //   axios.put(`http://localhost:3306/api/new_jobs/update/${JobNo}`, formData)
  //     .then((response) => {
  //       console.log('Update API response:', response.data);
        
  //       // Show an alert with the message "Submission successful"
  //       window.alert("Submission successful");
        
  //       // Navigate to another page (e.g., job list) after a successful submission
  //       history.push('/job-list');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating data:', error);

  //       // Show an alert with the message "Submission failed"
  //       window.alert("Submission failed");
  //     });
  // };


  const handleSubmit = () => {
   
    console.log("Form submitted with data:", formData);

    // Show an alert with the message "Ready for plan"
    window.alert("Ready for plan");

    axios.put(`${REACT_APP_API_URL}api/new_jobs/update/${JobNo}`, formData)
      .then((response) => {
        console.log('Update API response:', response.data);

        // Show an alert with the message "Submission successful"
        window.alert("Submission successful");

        // Navigate to another page (e.g., job list) after a successful submission
        history.push('/job-list');
      })
      .catch((error) => {
        console.error('Error updating data:', error);

        // Show an alert with the message "Submission failed"
        window.alert("Submission failed");
      });
  };


  return (

    <div>
      <MainCard title="Finish Planning Jobs" secondary={
        <Link to="/plan-jobs/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
            Plan Jobs
          </Button>
        </Link>
      }>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" aria-label="tabs">
          <Tab label="Summary" />
          <Tab label="To-Do List" />
          <Tab label="Related" />
        </Tabs>
        <div role="tabpanel">
          <div role="tabpanel" hidden={selectedTab !== 0}>

            <div>
              <Box className="tab-pane fade show active" role="tabpanel">
                <Typography variant="h4" mt={4}>
                  Job Information
                </Typography>
              </Box>
              <br />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
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

                  <Grid item xs={6} md={4}>
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

                  <Grid item xs={6} md={4}>
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


                  <Grid item xs={6} md={3}>
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

                  <Grid item xs={6} md={3}>
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

                <Box display="flex" justifyContent="flex-end" marginTop="15px" marginRight="5px">
                  <Button type="submit" variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
                    Submit
                  </Button>
                </Box>
              </form>
              <br />
            </div>
            <br />
            <br />
            <Todo JobNo={JobNo}  handleSubmit = {handleSubmit}/>
          </div>
          <div role="tabpanel" hidden={selectedTab !== 1}>
            <Todo />
          </div>
          <div role="tabpanel" hidden={selectedTab !== 2}>
            <p>This is the related tab.</p>
          </div>
        </div>
      </MainCard>
    </div>

  );
};

export default FinalJobs;



