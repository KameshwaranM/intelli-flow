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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import "./WorkflowDashboard.css";
import Sidebar from "../../Sidebar/Sidebar";

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
  const [formData, setFormData] = useState({
    searchTerm: "",
    newWorkflowName: "",
    newWorkflowDescription: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => setOpenCreateDialog(false);
  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleMenuOpen = (event, workflow) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkflow(workflow);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateWorkflow = (event) => {
    event.preventDefault();
    const { newWorkflowName, newWorkflowDescription } = formData;

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
      setFormData({
        ...formData,
        newWorkflowName: "",
        newWorkflowDescription: "",
      });
      setSnackbarMessage("Workflow created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCreateClose();
      window.location.href = "/Dashboard";
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
    workflow.name.toLowerCase().includes(formData.searchTerm.toLowerCase())
  );

  const handleOpenEditor = () => {
    window.location.href = "/Workflow_Editor";
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box className="workflowContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
            <Typography variant="h4">Workflows</Typography>
          </Box>
          <Box className="workflowActions">
            <IconButton onClick={handleCreateOpen}>
              <AddIcon />
            </IconButton>
            <TextField
              variant="outlined"
              placeholder="Search Workflows"
              name="searchTerm"
              value={formData.searchTerm}
              onChange={handleFormDataChange}
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
              <TableHead sx={{ backgroundColor: "#ECEFF7" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Last Run
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Next Run
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Deployed
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Activity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWorkflows.map((workflow, index) => (
                  <TableRow key={index} className="workflowTableRow">
                    <TableCell align="center">{workflow.name}</TableCell>
                    <TableCell align="center">{workflow.lastRun}</TableCell>
                    <TableCell align="center">{workflow.nextRun}</TableCell>
                    <TableCell align="center">
                      <CircleIcon
                        style={{ color: workflow.deployed ? "green" : "red" }}
                      />
                    </TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center">
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
                        <MenuItem onClick={() => alert("Edit")}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                        <MenuItem onClick={() => alert("Run")}>Run</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <form onSubmit={handleCreateWorkflow}>
          <Box className="createDialog" sx={{ p: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Intelli Flow Cloud
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
                name="newWorkflowName"
                value={formData.newWorkflowName}
                onChange={handleFormDataChange}
              />
              <label>Description</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                name="newWorkflowDescription"
                value={formData.newWorkflowDescription}
                onChange={handleFormDataChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
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
