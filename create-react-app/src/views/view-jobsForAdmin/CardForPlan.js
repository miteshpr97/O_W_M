
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // You need Axios or any other HTTP library for making API requests

const JobCard = ({ title, status,  count, bgColor }) => {
  const CardContainer = styled(Card)({
    backgroundColor: bgColor,
    marginBottom: '16px', // Decrease padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px', // Decrease padding
    transition: 'transform 0.2s, font-size 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });

  const Title = styled(Typography)({
    fontSize: '1.1rem', // Decrease font size
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
    },
  });

  const Status = styled(Typography)({
    fontSize: '0.9rem', // Decrease font size
    color: 'black',
    textAlign: 'center', 
  });

  return (
    <CardContainer>
      <CardContent>
        <div>
          <Title variant="h6" component="div">
            {title}
          </Title>
          <Status variant="subtitle2">
            {status}
          </Status>
          
          <Status variant="subtitle2">
            {count}
          </Status>
        </div>
      </CardContent>
    </CardContainer>
  );
};

const CardForPlan = () => {
  const [insideToInsideCount, setInsideToInsideCount] = useState(0);
  const [insideToOutsideCount, setInsideToOutsideCount] = useState(0);
  const [outsideToInsideCount, setOutsideToInsideCount] = useState(0);
  const [outsideToOutsideCount, setOutsideToOutsideCount] = useState(0);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    // Fetch Inside To Inside count
    axios.get(`${REACT_APP_API_URL}api/new_jobs/plan/insidetoinside`)
      .then(response => {
        setInsideToInsideCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching Inside To Inside count:', error);
      });

    // Fetch Inside To Outside count
    axios.get(`{REACT_APP_API_URL}api/new_jobs/plan/insidetoutside`)
      .then(response => {
        setInsideToOutsideCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching Inside To Outside count:', error);
      });

    // Fetch Outside To Inside count
    axios.get(`${REACT_APP_API_URL}api/new_jobs/plan/outsidetoinside`)
      .then(response => {
        setOutsideToInsideCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching Outside To Inside count:', error);
      });

    // Fetch Outside To Outside count
    axios.get(`${REACT_APP_API_URL}api/new_jobs/plan/outsideToutside`)
      .then(response => {
        setOutsideToOutsideCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching Outside To Outside count:', error);
      });
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3} md={3}>
              <JobCard
                title="Inside To Inside"
                status="Job ready for plan"
                
                count={insideToInsideCount}
                bgColor="#3498db"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <JobCard
                title="Inside To Outside"
                status="Job ready for plan"
               
                count={insideToOutsideCount}
                bgColor="#2ecc71"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <JobCard
                title="Outside To Inside"
                status="Job ready for plan"
                
                count={outsideToInsideCount}
                bgColor="#e74c3c"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <JobCard
                title="Outside To Outside"
                status="Job ready for plan"
              
                count={outsideToOutsideCount}
                bgColor="#f39c12"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardForPlan;




