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
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import IconButton from '@mui/material/IconButton';
import CardForPlan from './CardForPlan';

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ViewJobsForAdmin = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Initialize page size
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);

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
        const response = await fetch(`${REACT_APP_API_URL}api/new_jobs/jobStatusOne`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();

        const formattedData = apiData.map((item) => ({
          ...item,
          JobsStartDate: formatDateToDDMMYYYY(item.JobsStartDate),
          JobExpectedCompleteDate: formatDateToDDMMYYYY(item.JobExpectedCompleteDate),
        }));

        const reversedData = formattedData.reverse();
        setData(reversedData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainCard title="Plan Jobs" secondary={
      <Link to="/new-jobs/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
          New Jobs
        </Button>
      </Link>
    }>
      <CardForPlan />
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
              <TableCell style={{ width: '14%' }}>Job Summary</TableCell>
              <TableCell style={{ width: '14%' }}>Pick Up Lock</TableCell>
              <TableCell style={{ width: '14%' }}>Delivery Lock</TableCell>
              <TableCell style={{ width: '14%' }}>Plan Job</TableCell>
              <TableCell style={{ width: '14%' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index} style={{ borderBottom: '1px solid black' }}>
                <TableCell>{item.JobNo}</TableCell>
                <TableCell>{item.JobsStartDate}</TableCell>
                <TableCell>{item.JobSummary}</TableCell>
                <TableCell>{item.PickupLocation}</TableCell>
                <TableCell>{item.DeliveryLocation}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: '#15698c', color: 'white' }}>
                    <Link
                      to={`/final-jobs/${item.JobNo}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      Plan
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#ffd800',
                    }}
                  ></IconButton>
                </TableCell>
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

export default ViewJobsForAdmin;
