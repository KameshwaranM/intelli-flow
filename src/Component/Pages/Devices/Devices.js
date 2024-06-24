import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import AddHostForm from "./AddHostForm";
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import SidebarMenu from "../../Sidebar/Sidebar";

const useStyles = styled((theme) => ({
  table: {
    minWidth: 650,
  },
  search: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
    borderColor: 'black',
    color: 'black',
  },
}));

const Devices = () => {
    const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddRow = (newRow) => {
    if (newRow) {
      setRows([...rows, newRow]);
    }
    setShowForm(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const rowsPerPage = 10;
  const filteredRows = rows.filter((row) =>
    row.hostName.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
    {/* <SidebarMenu /> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          className={classes.search}
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          className={classes.addButton}
          variant="outlined"
          onClick={() => setShowForm(true)}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      {/* {showForm && <AddHostForm onAddRow={handleAddRow} />} */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Host Name</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>OS Name</TableCell>
              <TableCell>Console Port</TableCell>
              <TableCell>Backend Port</TableCell>
              <TableCell>Credentials</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.hostName}
                </TableCell>
                <TableCell>{row.ipAddress}</TableCell>
                <TableCell>{row.platform}</TableCell>
                <TableCell>{row.osName}</TableCell>
                <TableCell>{row.consolePort}</TableCell>
                <TableCell>{row.backendPort}</TableCell>
                <TableCell>{row.credentials}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default Devices;