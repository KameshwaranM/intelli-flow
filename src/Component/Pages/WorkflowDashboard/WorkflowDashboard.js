import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
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
  Select,
  LinearProgress,
  TablePagination
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import "./WorkflowDashboard.css";
import Sidebar from "../../Sidebar/Sidebar";
import "./WorkflowDashboard.css";

const WorkflowDashboard = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([
    {
      name: "Workflow1",
      created: "2024/05/09 02:57:00 PM",
      lastRun: "2024/05/09 03:15:00 PM",
      nextRun: "2024/05/09 03:30:00 PM",
      deployed: true,
      activity: 40,
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
      setWorkflows([
        ...workflows,
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
    setWorkflows(workflows.filter((workflow) => workflow !== selectedWorkflow));
    setSnackbarMessage("Workflow deleted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleDeleteClose();
    handleMenuClose();
  };

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEditor = () => {
    window.location.href = "/Workflow_Editor";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedWorkflows = filteredWorkflows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  return (
    <Box className="workflowContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
            <Typography variant="h4">Workflows</Typography>
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
              placeholder="Search Workflows"
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
            <Select defaultValue="All" className="tagSelect">
              <MenuItem value="All">All Tags</MenuItem>
            </Select>
            <Select defaultValue="Created" className="statusSelect">
              <MenuItem value="Created">Created</MenuItem>
            </Select>
          </Box>
          <TableContainer component={Paper} className="workflowTableContainer">
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
                    Last Run
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Next Run
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" , padding:"10px" }}
                  >
                    Deployed
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Activity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {paginatedWorkflows.map((workflow, index) => (
                  <TableRow key={index} className="workflowTableRow">
                    <TableCell sx={{padding:"7px"}} align="center">{workflow.name}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{workflow.lastRun}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{workflow.nextRun}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">
                      <CircleIcon
                        style={{
                          color: workflow.deployed ? "green" : "red",
                          transform: "scale(0.8)",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LinearProgress
                          variant="buffer"
                          value={workflow.activity}
                          sx={{ flexGrow: 1, mr: 1 }}
                          color="success"
                          valueBuffer={100 - workflow.activity}
                          className="activityProgress"
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, workflow)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleOpenEditor}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                        <MenuItem onClick={() => alert("Run")}>Run</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[7, 14, 21]}
              component="div"
              count={filteredWorkflows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
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
              Workflows.
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
              {/* <TextField
              autoFocus
              margin="dense"
              label="Workflow Name"
              fullWidth
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              className="newWorkflowNameInput"
            />
            <TextField
              margin="dense"
              label="Workflow Description"
              fullWidth
              value={newWorkflowDescription}
              onChange={(e) => setNewWorkflowDescription(e.target.value)}
              className="newWorkflowDescriptionInput"
            /> */}
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
export default WorkflowDashboard;
