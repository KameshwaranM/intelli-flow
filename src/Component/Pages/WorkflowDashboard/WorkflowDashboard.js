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
import "./WorkflowDashboard.css";
import Sidebar from "../../Sidebar/Sidebar";
import {
  URL_Create_Workflow,
  URL_Delete_Workflow_Name,
  URL_GET_Workflow_DATA,
  URL_GET_Workflow_Form,
  URL_Get_Workflow_Name,
} from "../../API/ProjectAPI";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkflowDashboard = () => {
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
  const [showWorkflowsApp, setShowWorkflowsApp] = useState(false);
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
        console.log("response", response);
          return;
        }
  
        const data = await response.json();
  
        if (data.type === "error") {
          console.error(`Server error: ${data.message}`);
          setError(data.message);
          return; 
        }
  
        if (Array.isArray(data.data)) {
          setWorkflows(data.data);
          // data.data.forEach((workflow) => {
          //   console.log("Workflow ID:", workflow.workflowid);
          // });
        } else {
          console.error("Invalid data format");
          setError("Invalid data format");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch workflows. Please try again later.");
      }
    };
  
    fetchWorkflows();
    const intervalId = setInterval(fetchWorkflows, 2000);
    return () => clearInterval(intervalId);
  }, []);
  


  const handleDeleteWorkflow = async () => {
    try {
      const sessionKey = localStorage.getItem('sessionKey');
      if (!sessionKey) {
        throw new Error('Session key not found');
      }
  
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'SESSIONKEY': sessionKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workflowname: selectedWorkflow.workflowname
        })
      };
  
      const response = await fetch(URL_Delete_Workflow_Name, requestOptions);
  
      if (!response.ok) {
        // Handle specific HTTP error status
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to delete the workflow');
      }
  
      const data = await response.json();
      console.log('Item deleted successfully', data);
      
      setWorkflows(workflows.filter((workflow) => workflow !== selectedWorkflow));
      handleDeleteClose();
      handleMenuClose();
  
      toast.success("Workflow Deleted Successfully", {
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
  
    } catch (error) {
      console.error('Error deleting item:', error.message || error.toString());
  
      toast.error(`Error: ${error.message || error.toString()}`, {
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

  

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow &&
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

  // const handleOpenForm = () =>{
  //   window.location.href = `/FlowFormBuilder?workflowname=${selectedWorkflow.workflowname}`
  // }


  const handleOpenEditor = async (event) => {
    event.preventDefault();
    try {
      const API = URL_GET_Workflow_DATA;
      const res = await axios.post(API, {
        projectname: localStorage.getItem("projectname"),
        workflowname: selectedWorkflow.workflowname,
      }, {
        headers: {
          SESSIONKEY: sessionKey,
        },
      });
  
      if (res.status === 200) {
        console.log("Data sent successfully:", res.data);
        console.log("Data sent successfully:", res.data.id);
        localStorage.setItem('restoredata', res.data.data );
        console.log("Data sent successfully:", res.data.data);
        window.location.href = `/Workflow_Editor?Id=${res.data.id}`;
        // const iframeUrl = `http://localhost:3001?projectId=${res.data.id}`;
        // window.location.href = '/Workflow_Editor'; 
        
      } else {
        console.log("Failed to send data. Status code:", res.status);
      }
    } catch (error) {
      console.log("Error:", error);
      const errorMessage = error.response?.data?.message || "No message available";
      console.log("Response data message:", errorMessage);
    }
  };

  const handleOpenForm = async (event) => {
    event.preventDefault();
    try {
      const API = URL_GET_Workflow_Form;
      const res = await axios.post(API, {
        projectname: localStorage.getItem("projectname"),
        workflowname: selectedWorkflow.workflowname,
      }, {
        headers: {
          SESSIONKEY: sessionKey,
        },
      });
  
      if (res.status === 200) {
        console.log("Data sent successfully:", res.data.data);
        const formData = JSON.stringify(res.data.data);
        localStorage.setItem('restoreform', formData);
        window.location.href = `/FlowFormBuilder?workflowname=${selectedWorkflow.workflowname}`
      } else {
        console.log("Failed to send data. Status code:", res.status);
      }
    } catch (error) {
      console.log("Error:", error);
      const errorMessage = error.response?.data?.message || "No message available";
      console.log("Response data message:", errorMessage);
    }
  };


  // const handleDeleteOpen = async (selectedWorkflow) => {
  //   try {
  //     const sessionKey = localStorage.getItem('sessionKey'); 
  //     const requestOptions = {
  //       method: 'DELETE',
  //       headers: {
  //         'SESSIONKEY': sessionKey,
  //         'Content-Type': 'application/json' 
  //       },
  //       body:{
  //         workflowname: selectedWorkflow.workflowname 
  //       }
  //     };
  
  //     const response = await fetch(URL_Delete_Workflow_Name, requestOptions);
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
      
  //     const data = await response.json();
  //     console.log('Item deleted successfully', data);
  //   } catch (error) {
  //     console.error('Error deleting item', error);
  //   }
  // };
  
  return (
    <Box className="workflowContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
            <h2 className="intelli-flow-right-side-headline">Workflows</h2>
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
                    align="left"
                    sx={{ fontSize: "15px", fontWeight: "600" , padding: "10px" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "15px", fontWeight: "600" , padding: "10px" }}
                  >
                    Description
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    sx={{ fontSize: "15px", fontWeight: "600" , padding: "10px" }}
                  >
                    Next Run
                  </TableCell> */}
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      padding: "10px"
                    }}
                  >
                    Deployed
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "15px", fontWeight: "600", padding: "10px" }}
                  >
                    Activity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600"  }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedWorkflows && paginatedWorkflows.length > 0 ? (
                  paginatedWorkflows.map((workflow  , index) => (
                    workflow && ( 
                      <TableRow
                        key={index}
                        className="workflowTableRow"
                      >
                        <TableCell sx={{ padding: "7px 10px" }} align="left">
                          {workflow.workflowname}<br />
                          <span style={{fontSize:"10px"}}>created {workflow.createddate}</span>
                        </TableCell>
                        <TableCell sx={{ padding: "7px 10px" }} align="left">
                          {workflow.description}
                        </TableCell>
                        {/* <TableCell sx={{ padding: "7px 10px" }} align="left">
                          {workflow.nextrun || "N/A"}
                        </TableCell> */}
                        <TableCell sx={{ padding: "7px 10px" }} align="left">
                          <CircleIcon
                            style={{
                              color: workflow.status,
                              transform: "scale(0.8)",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: "7px 10px" }} align="left">
                          <Box sx={{ display: "flex", alignItems: "left" }}>
                            <LinearProgress
                              variant="buffer"
                              value={0.5}
                              sx={{ flexGrow: 1, mr: 1 , color: workflow.status }}
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
                            <MenuItem onClick={() => handleDeleteOpen(workflow.workflowid)}>Delete</MenuItem>
                            <MenuItem onClick={handleOpenForm}>Create Form</MenuItem>
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

      <Dialog open={openCreateDialog} onClose={handleCreateClose}>
        <form onSubmit={handleCreateWorkflow}>
          <Box className="createDialog" sx={{ p: 2 }}>
            <DialogContent>
              <Typography variant="h5" gutterBottom>
                Create New Workflow
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

export default WorkflowDashboard;
