import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import logo from '../../Assets/Intellil-Flow-Logo.png';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Divider, CircularProgress
} from '@mui/material';
import './Invoice.css';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const mockedData = {
      logo: 'logo',
      plan: 'Monthly',
      subscriptionID: 'sub_1PVWOzSCrRIRaVvOnqG1bh15',
      status: 'active',
      customerName: 'Kasthuri Mohan',
      customerEmail: 'kasthurimohan25@gmail.com',
      companyName: 'Autointelli.com',
      companyContact: '+ (01) 3456789123',
      companyAddress: '123 Main St, Main Road, Chennai',
      items: [
        {
          description: 'Invoice Details',
          amount: 'INR 750.0',
          periodStart: '2024-06-25 15:20:17',
          periodEnd: '2024-07-25 15:20:17',
        },
      ],
      subtotal: 750.0,
    
      total: 750.0,
      paymentMethod: 'pm_1PVW0ySCRIRaVvFy',
      paymentDetails: '0123456789',
      dueDate: '08/01',
    };

    setInvoiceData(mockedData);

    // axios.get('/api/invoice')
    //   .then(response => {
    //     setInvoiceData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the invoice data!', error);
    //   });
  }, []);

  if (!invoiceData) {
    return (
      <Box className="invoice-loader">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper className="invoice-container">
      <Box className="invoice-header">
        <Typography variant="h4" color="primary">
          Invoice
        </Typography>
        <img src={logo} alt="Logo" className="invoice-logo" />
      </Box>
      <Divider />
      <Box className="invoice-details">
        <Box>
          <Typography variant="subtitle1">To:</Typography>
          <Typography variant="body1">{invoiceData.customerName}</Typography>
          <Typography variant="body1">{invoiceData.customerEmail}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Plan: {invoiceData.plan}</Typography>
          <Typography variant="body1">Subscription ID: {invoiceData.subscriptionID}</Typography>
          <Typography variant="body1">Status: {invoiceData.status}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">From:</Typography>
          <Typography variant="body1">{invoiceData.companyName}</Typography>
          <Typography variant="body1">{invoiceData.companyContact}</Typography>
          <Typography variant="body1">{invoiceData.companyAddress}</Typography>
        </Box>
      </Box>
      <Divider />
      <TableContainer component={Paper} className="invoice-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Period Start</TableCell>
              <TableCell align="left">Period End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="left">{item.amount}</TableCell>
                <TableCell align="left">{item.periodStart}</TableCell>
                <TableCell align="left">{item.periodEnd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="invoice-section">
        <Typography variant="body1">Subtotal: {invoiceData.subtotal.toFixed(2)} INR</Typography>
        <Typography variant="h6">Total: {invoiceData.total.toFixed(2)} INR</Typography>
      </Box>
      <Divider />
      <Box mt={2}>
        <Typography variant="body1">Payment Method: {invoiceData.paymentMethod}</Typography>
        <Typography variant="body1">Payment Details: {invoiceData.paymentDetails}</Typography>
        <Typography variant="body1">Due Date: {invoiceData.dueDate}</Typography>
      </Box>
    </Paper>
  );
};

export default Invoice;