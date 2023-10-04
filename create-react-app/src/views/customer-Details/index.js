// CustomerDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
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
import EditDialog from './EditDialog';

const CustomerDetails = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Initialize 

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);




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



  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };


  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3306/api/customers');
        if (response.status === 200) {
          setData(response.data);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);


  const handleEditClick = (customerId) => {
    setEditDialogOpen(true);
    setSelectedCustomerId(customerId);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  // const handleDeleteClick = async (customerId) => {
  //   // Display a confirmation dialog
  //   const confirmed = window.confirm('Are you sure you want to delete this customer?');

  //   if (!confirmed) {
  //     // The user canceled the deletion
  //     return;
  //   }

  //   try {
  //     // Send a DELETE request to the API to delete the customer
  //     const response = await axios.delete(`http://localhost:3306/api/customers/${customerId}`);
  //     if (response.status === 200) {
  //       // If the delete request is successful, remove the customer from the data state
  //       const updatedData = data.filter((customer) => customer.customerCode !== customerId);
  //       setData(updatedData);
  //       // Optionally show a success message here
  //       alert('Customer deleted successfully');
  //       // Refresh the page
  //       window.location.reload();
  //     } else {
  //       throw new Error('Network response was not ok');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting customer:', error);
  //   }
  // };

  const handleDeleteClick = async (customerId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this customer?');
      if (!confirmed) return;

      const response = await axios.delete(`http://localhost:3306/api/customers/${customerId}`);
      if (response.status === 200) {
        // Remove the deleted customer from the data state
        const updatedData = data.filter((customer) => customer.customerCode !== customerId);
        setData(updatedData);
        alert('Customer deleted successfully');
      } else {
        console.error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };



  return (


    <MainCard title="Customer Details" secondary={
      <Link to="/customer-jobs/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
          New Customer
        </Button>
      </Link>
    }>
      <Container maxWidth="lg">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Customer Details Tabs"
        >
          <Tab label="All Customers" />
          {/* Add more tabs as needed */}
        </Tabs>
      </Container>

      <Box className="tab-content" id="pills-tabContent">
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Code</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.customerCode}</TableCell>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone1}</TableCell>
                  <TableCell>{customer.contactPerson}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ backgroundColor: '#15698c', color: 'white' }}
                      variant="contained"
                      onClick={() => handleEditClick(customer.customerCode)}
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      sx={{ backgroundColor: '#ff0000', color: 'white' }}
                      variant="contained"
                      onClick={() => handleDeleteClick(customer.customerCode)}
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

        </Container>
      </Box>

      <EditDialog
        open={editDialogOpen}
        handleClose={handleCloseEditDialog}
        customerId={selectedCustomerId}
      />
    </MainCard>
  );
};

export default CustomerDetails;




