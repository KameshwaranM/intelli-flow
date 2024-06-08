import React, { useEffect, useState } from "react";
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
  InputAdornment,
  Select,
  LinearProgress,
  TablePagination,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import "../WorkflowDashboard/WorkflowDashboard.css";
import Sidebar from "../../Sidebar/Sidebar";
import {
  URL_Create_Workflow,
  URL_Get_Workflow_Name,
} from "../../API/ProjectAPI";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Executions = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [error, setError] = useState("");
  const [sessionKey, setSessionKey] = useState(null);

  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    setSessionKey(sessionKey);
  }, []);

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => {
    setOpenCreateDialog(false);
    setNewWorkflowName("");
    setNewWorkflowDescription("");
  };
  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleMenuOpen = (event, workflow) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkflow(workflow);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateWorkflow = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        URL_Create_Workflow,
        {
          projectname: localStorage.getItem("projectname"),
          workflowname: newWorkflowName,
          description: newWorkflowDescription,
        },
        {
          headers: {
            SESSIONKEY: sessionKey,
          },
        }
      );
      setError("Workflow Created Successfully");
      toast.success("Workflow Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      handleCreateClose();
      setWorkflows([...workflows, response.data.workflow]);
    } catch (error) {
      console.error("Error creating workflow:", error);
      let errorMessage = "An unexpected error occurred.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch(URL_Get_Workflow_Name, {
          method: "GET",
          headers: {
            SESSIONKEY: localStorage.getItem("sessionKey"),
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.type === "error") {
          throw new Error(data.message);
        }
  
        // Ensure the data is an array
        if (Array.isArray(data.data)) {
          setWorkflows(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    // Fetch workflows initially
    fetchWorkflows();
  
    // Set up an interval to fetch workflows every 2 seconds
    const intervalId = setInterval(fetchWorkflows, 2000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteWorkflow = () => {
    setWorkflows(workflows.filter((workflow) => workflow !== selectedWorkflow));
    handleDeleteClose();
    handleMenuClose();
  };

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow && // Ensure workflow is defined
      workflow.workflowname &&
      workflow.workflowname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleOpenEditor = () => {
    window.location.href = "/Workflow_Editor";
  };

  return (
    <Box className="workflowContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
            <h2 className="intelli-flow-right-side-headline">Executions</h2>
          </Box>
          <Box className="workflowActions">
            <IconButton
              onClick={handleCreateOpen}
              sx={{ transform: "scale(1.5)" }}
            >
              <AddCircleIcon sx={{ width: "25px" }} />
            </IconButton>
            <TextField
              variant="outlined"
              placeholder="Search Execution"
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
                    Start Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    End Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      padding: "10px",
                    }}
                  >
                    Status
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
                {paginatedWorkflows && paginatedWorkflows.length > 0 ? (
                  paginatedWorkflows.map((workflow) => (
                    workflow && ( // Ensure workflow is defined
                      <TableRow
                        key={workflow.createdbyuserid}
                        className="workflowTableRow"
                      >
                        <TableCell sx={{ padding: "7px" }} align="center">
                          {workflow.workflowname}
                        </TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">
                          {workflow.createddate}
                        </TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">
                          {workflow.description || "N/A"}
                        </TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">
                          <CircleIcon
                            style={{
                              color: workflow.deployed ? "green" : "red",
                              transform: "scale(0.8)",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">
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
                        <TableCell sx={{ padding: "7px" }} align="center">
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
                    )
                  ))
                ) : (
                  <TableRow>
                    <TableCell sx={{ color: "red" }} colSpan={6} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
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
        <form onSubmit={handleCreateWorkflow}>
          <Box className="createDialog" sx={{ p: 2 }}>
            <DialogContent>
              <Typography variant="h5" gutterBottom>
                Create New Execution
              </Typography>
              <Typography sx={{ marginBottom: "15px" }} gutterBottom>
                Start by naming your project - each account may contain multiple
                projects. You can use projects to organize your Tasks and
                Workflows.
              </Typography>
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
              <Button
                onClick={handleCreateClose}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">
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
      <ToastContainer />
    </Box>
  );
};

export default Executions;
