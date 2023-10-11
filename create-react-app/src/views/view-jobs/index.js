
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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
import EditDialog from './EditDialog';
import TablePagination from '@mui/material/TablePagination';
import { TableContainer, Paper, styled } from '@mui/material';

// Import the DeleteConfirmationDialog component
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto', // Enable horizontal scroll on small screens
    backgroundColor: 'pink',
    '& .small-text': {
      fontSize: '0.7rem', // Adjust the font size as needed
    },
  },
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    // Adjust padding as needed
  },
  maxWidth: '100%',
}));

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ViewJobs = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Add state for delete confirmation dialog
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
        const response = await fetch(`${REACT_APP_API_URL }api/new_jobs/jobStatusOne`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();

        // Format the dates in "dd/mm/yyyy" format while fetching the data
        const formattedData = apiData.map(item => ({
          ...item,
          JobsStartDate: formatDateToDDMMYYYY(item.JobsStartDate),
          JobExpectedCompleteDate: formatDateToDDMMYYYY(item.JobExpectedCompleteDate)
        }));

        // Reverse the order of the data before setting it in the state
        const reversedData = formattedData.reverse();
        setData(reversedData);
        console.log('Fetched data from API:', reversedData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

 

  const handleEditClick = (jobId) => {
    setEditDialogOpen(true);
    setSelectedJobId(jobId);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };



  
  const handleDeleteClick = (jobId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(jobId);
    }
  };

  const deleteItem = async (jobId) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL }api/new_jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Deleted item with JobNo: ${jobId}`);

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };



  const handleDeleteConfirmDialogOpen = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmationOpen(false);
  };


  return (

    <MainCard title="View Jobs" secondary={
      <Link to="/new-jobs/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
          New Jobs
        </Button>
      </Link>
    }>
      <Container maxWidth="lg">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Plan Jobs Tabs"
        >
          <Tab label="All Jobs" />
          {/* Add other tabs here */}
        </Tabs>
      </Container>

      <ResponsiveBox>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='small-text'>Job Number</TableCell>
                <TableCell className='small-text'>Job Date</TableCell>
                <TableCell className='small-text'>Job Summary</TableCell>
                <TableCell className='small-text'>Pick Up Lock</TableCell>
                <TableCell className='small-text'>Delivery Lock</TableCell>
                <TableCell className='small-text'>Edit Jobs</TableCell>
                <TableCell className='small-text'>Delete Jobs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='small-text'>{item.JobNo}</TableCell>
                  <TableCell className='small-text'>{item.JobsStartDate}</TableCell>
                  <TableCell className='small-text'>{item.JobSummary}</TableCell>
                  <TableCell className='small-text'>{item.PickupLocation}</TableCell>
                  <TableCell className='small-text'>{item.DeliveryLocation}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#15698c', color: 'white' }}
                      onClick={() => handleEditClick(item.JobNo)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: '#ff0000', color: 'white' }}
                      onClick={() => handleDeleteConfirmDialogOpen(item.JobNo)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data.length}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <div>Total Pages: {totalPages}</div> {/* Display the total pages */}


        </StyledTableContainer>
      </ResponsiveBox>

      <EditDialog open={editDialogOpen} handleClose={handleCloseEditDialog} jobId={selectedJobId} />

      {/* Render the DeleteConfirmationDialog component */}
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        handleClose={handleDeleteConfirmDialogClose}
        handleDelete={() => {
          // Handle the delete action here and then close the dialog
          handleDeleteClick(selectedJobId);
          handleDeleteConfirmDialogClose();
        }}
      />
    </MainCard>
  );
};

export default ViewJobs;



