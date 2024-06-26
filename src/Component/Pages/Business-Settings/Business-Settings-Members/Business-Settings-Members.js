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
import "./Business-Settings-Members.css";
import BusinessSettingsSidebar from "../../../Sidebar/BusinessSettingsSidebar";

const BusinessSettingsMember = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [members, setMembers] = useState([
    {
      name: "Anand Parthiban",
      email: "Anandaraaj.parthiab@gmail.com",
      role: "Owner",
      lastLogin: "May 09th, 2024",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, SetNewMemberEmail] = useState("");
  const [newMemberRole, SetNewMemberRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => setOpenCreateDialog(false);
  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(project);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateProject = () => {
    if (newMemberName && newMemberEmail) {
      setMembers([
        ...members,
        {
          name: newMemberName,
          email: newMemberEmail,
          role: newMemberRole,
          lastLogin: new Date().toISOString(),
        },
      ]);
      setNewMemberName("");
      SetNewMemberEmail("");
      setSnackbarMessage("Member id created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCreateClose();
    } else {
      setSnackbarMessage("Please provide a valid Name and Email");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteProject = () => {
    setMembers(members.filter((member) => member !== selectedMember));
    setSnackbarMessage("Project deleted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleDeleteClose();
    handleMenuClose();
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const paginatedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  return (
    <Box className="workflowContainer membersContainer">
      <BusinessSettingsSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="workflowHeader">
            <h2 className="intelli-flow-right-side-headline">Members</h2>
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
                    Email
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Account Role
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" , padding:"10px" }}
                  >
                    Last Login
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  ></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {paginatedMembers.map((member, index) => (
                  <TableRow key={index} className="workflowTableRow membersTableRow" >
                    <TableCell sx={{padding:"7px"}} align="center">{member.name}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{member.email}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{member.role}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">{member.lastLogin}</TableCell>
                    <TableCell sx={{padding:"7px"}} align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, member)}
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
              count={filteredMembers.length}
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
        <form onSubmit={handleCreateProject}>
          <Box className="createDialog" sx={{ p: 2 }}>
            <Typography variant="h5"  gutterBottom>
              Invite New Member
            </Typography>
            <DialogContent>
              <label>Name</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
              <label>Email</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={newMemberEmail}
                onChange={(e) => SetNewMemberEmail(e.target.value)}
              />
              <label htmlFor="role">Account Role</label>
              <select
                className="first-time-login-card-input"
                id="role"
                name="role"
                value={newMemberRole}
                onChange={(e) => SetNewMemberRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="owner">Owner</option>
              </select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">
                Invite
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
          <Button onClick={handleDeleteProject} color="primary">
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
export default BusinessSettingsMember;
