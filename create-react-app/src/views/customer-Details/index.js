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
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const CustomerDetails = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Initialize 

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Add state for delete confirmation dialog

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
        const response = await axios.get(`${REACT_APP_API_URL}api/customers`);
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



  const handleDeleteClick = (customerId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(customerId);
    }
  };

  
  const deleteItem = async (customerId) =>{
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}api/customers/${customerId}`);
      if (response.status === 200) {
        // Remove the deleted customer from the data state
        const updatedData = data.filter((customer) => customer.customerCode !== customerId);
        setData(updatedData);
        // alert('Customer deleted successfully');
      } else {
        console.error('Network response was not ok');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };






  const handleDeleteConfirmDialogOpen = (customerId) => {
    setSelectedCustomerId(customerId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmationOpen(false);
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
                <TableCell>Delete</TableCell>
                
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
                      variant="contained"
                      style={{ backgroundColor: '#ff0000', color: 'white' }}
                      onClick={() => handleDeleteConfirmDialogOpen(customer.customerCode)}
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

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        handleClose={handleDeleteConfirmDialogClose}
        handleDelete={() => {
          // Handle the delete action here and then close the dialog
          handleDeleteClick(selectedCustomerId);
          handleDeleteConfirmDialogClose();
        }}
      />



    </MainCard>
  );
};

export default CustomerDetails;




