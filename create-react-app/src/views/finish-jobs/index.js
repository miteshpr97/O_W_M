import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';


import IconButton from '@mui/material/IconButton';
import CardForFinish from './CardForFinish';

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const FinishJobs = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Initialize page size

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/new_jobs/jobStatusThree`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();
        const formattedData = apiData.map(item => ({
          ...item,
          JobsStartDate: formatDateToDDMMYYYY(item.JobsStartDate),
          JobExpectedCompleteDate: formatDateToDDMMYYYY(item.JobExpectedCompleteDate),
          JobsClosingDate: formatDateToDDMMYYYY(item.JobsClosingDate)
        }));

        const reversedData = formattedData.reverse();
        setData(reversedData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);



  // const handleDeleteClick = (jobId) => {
  //   if (window.confirm('Are you sure you want to delete this item?')) {
  //     // If the user confirms, delete the item and reload the page
  //     deleteItem(jobId);
  //     window.location.reload();
  //   }
  // };

  // const deleteItem = async (jobId) => {
  //   try {
  //     const response = await fetch(`http://localhost:3306/api/new_jobs/${jobId}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     console.log(`Deleted item with JobNo: ${jobId}`);
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };


  return (
    // <MainCard title="Plan Jobs" secondary={<Link to="/new-jobs/"> <Button> New Jobs</Button> </Link>}>
    <MainCard title="Finish Jobs" secondary={
      <Link to="/new-jobs/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
          New Jobs
        </Button>
      </Link>
    }>
      <CardForFinish/>
      <Container maxWidth="xl">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Plan Jobs Tabs"
        >
          <Tab label="All Jobs" />
          <Tab label="Open" />
          <Tab label="Closed" />
          <Tab label="Planned" />
          <Tab label="Loan" />
        </Tabs>
      </Container>

      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '14%' }}>Job Number</TableCell>
              <TableCell style={{ width: '14%' }}>Job Date</TableCell>
              <TableCell style={{ width: '14%' }}>Closed Date</TableCell>
              <TableCell style={{ width: '14%' }}>Job Summary</TableCell>
              <TableCell style={{ width: '14%' }}>Pick Up Lock</TableCell>
              <TableCell style={{ width: '14%' }}>Delivery Lock</TableCell>
              <TableCell style={{ width: '14%' }}>Status</TableCell>
              {/* <TableCell style={{ width: '14%' }}>Delete</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index} style={{ borderBottom: '1px solid black' }}>
                <TableCell>{item.JobNo}</TableCell>
                <TableCell>{item.JobsStartDate}</TableCell>
                <TableCell>{item.JobsClosingDate}</TableCell>
                <TableCell>{item.JobSummary}</TableCell>
                <TableCell>{item.PickupLocation}</TableCell>
                <TableCell>{item.DeliveryLocation}</TableCell>
                {/* <TableCell>{item.JobsStatus}</TableCell> */}

                <TableCell>
                <IconButton
                  sx={{
                    width: '20px', // Adjust the size as needed
                    height: '20px', // Adjust the size as needed
                    borderRadius: '50%', // Makes the container circular
                    backgroundColor: '#00ff72', // Background color for the circular container
                    
                  }}
                >
                  
                </IconButton>

                </TableCell>

                {/* <TableCell>
                  <Button variant="contained"
                    style={{ backgroundColor: '#ff0000', color: 'white' }}
                    onClick={() => handleDeleteClick(item.JobNo)}
                  >
                    Delete
                  </Button>
                </TableCell> */}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        component="div"
        count={data.length}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>Total Pages: {totalPages}</div> {/* Display the total pages */}

    </MainCard>
  );
};



export default FinishJobs;
