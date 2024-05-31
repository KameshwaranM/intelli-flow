import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  InputAdornment,
  TablePagination
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./Business-Settings-Projects.css";
import Sidebar from "../../Sidebar/Sidebar";

const BusinessSettingsProjects = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [projects, setProjects] = useState([
    {
      name: "Project Name",
      created: "2024/05/09 03:15:00 PM",
      lastUpdated: "2024/05/09 03:30:00 PM",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => setOpenCreateDialog(false);
  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleMenuOpen = (event, workflow) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkflow(workflow);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateWorkflow = () => {
    if (newWorkflowName && newWorkflowDescription) {
      setProjects([
        ...projects,
        {
          name: newWorkflowName,
          created: new Date().toISOString(),
          lastRun: "N/A",
          nextRun: "N/A",
          deployed: false,
          activity: 0,
        },
      ]);
      setNewWorkflowName("");
      setNewWorkflowDescription("");
      setSnackbarMessage("Workflow created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCreateClose();
    } else {
      setSnackbarMessage("Please provide a valid name and description");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteWorkflow = () => {
    setProjects(projects.filter((workflow) => workflow !== selectedWorkflow));
    setSnackbarMessage("Workflow deleted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleDeleteClose();
    handleMenuClose();
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProjects = filteredProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  return (
    <Box className="workflowContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
          <h2 className="intelli-flow-right-side-headline">Projects</h2>
          </Box>
          <Box className="workflowActions">
            <IconButton
              onClick={handleCreateOpen}
              sx={{ transform: "scale(1.5)"}}
            >
              <AddCircleIcon sx={{width:"25px"}} />
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
          <TableContainer component={Paper} className="workflowTableContainer projectTableContainer">
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
              {paginatedProjects.map((project, index) => (
                  <TableRow key={index} className="workflowTableRow projectsTableRow">
                    <TableCell sx={{padding:"7px"}} align="center">{project.name}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{project.created}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{project.lastUpdated}</TableCell>
                  </TableRow>
                ))}
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
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  marginBottom: 0, 
                },
              }}
            />

          </TableContainer>
        </Container>
      </Box>

      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <form onClick={handleCreateWorkflow}>
          <Box className="createDialog" sx={{ p: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Create New Workflow
            </Typography>
            <Typography align="center" gutterBottom>
              Start by naming your project - each account may contain multiple
              projects. You can use projects to organize your Tasks and
              projects.
            </Typography>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogContent>
              <label>Name</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
              />
              <label>Description</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={newWorkflowDescription}
                onChange={(e) => setNewWorkflowDescription(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">Create</Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Workflow</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteWorkflow} color="primary">
            Yes
          </Button>
          <Button onClick={handleDeleteClose} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default BusinessSettingsProjects;