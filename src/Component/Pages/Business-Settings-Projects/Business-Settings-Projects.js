import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./Business-Settings-Projects.css";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom/dist";
import axios from "axios";
import { URL_Get_Project_Name } from "../../API/ProjectAPI";

const BusinessSettingsProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [error, setError] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL_Get_Project_Name, {
          headers: {
            SESSIONKEY: localStorage.getItem("sessionKey"),
          },
        });
        if (response.data && response.data.projects) {
          setProjects(response.data.projects);
        } else {
          setProjects([]); // Set to empty array if no projects found
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const filteredProjects = Array.isArray(projects)
    ? projects.filter((projects) =>
        projects.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const paginatedProjects = filteredProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="workflowContainer projectsContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
        <Box className="workflowHeader">
            <h2 className="intelli-flow-right-side-headline">Projects</h2>
          </Box>
          <Box className="workflowActions projectActions">
            <IconButton
              component={Link}
              to="/Create_Project"
              sx={{ transform: "scale(1.5)" }}
            >
              <AddCircleIcon sx={{ width: "25px" }} />
            </IconButton>
            <TextField
              variant="outlined"
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="searchInput"
            />
          </Box>
          <TableContainer
            component={Paper}
            className="workflowTableContainer projectTableContainer"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Created
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Last Updated
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProjects && paginatedProjects.length > 0 ? (
                  paginatedProjects.map((projects, index) => (
                    <TableRow
                      key={index}
                      className="workflowTableRow projectsTableRow"
                    >
                      <TableCell sx={{ padding: "7px" }} align="center">
                        {projects.name}
                      </TableCell>
                      <TableCell sx={{ padding: "7px" }} align="center">
                        {projects.created}
                      </TableCell>
                      <TableCell sx={{ padding: "7px" }} align="center">
                        {projects.lastupdated || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell sx={{ color: "red" }} colSpan={3} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[7, 14, 21]}
              component="div"
              count={filteredProjects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    marginBottom: 0,
                  },
              }}
            />
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};
export default BusinessSettingsProjects;
