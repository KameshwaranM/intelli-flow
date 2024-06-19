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
  TablePagination,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import "../Vault/Vault.css"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../Sidebar/Sidebar";
import {
  URL_Create_Workflow,
  URL_Get_Workflow_Name,
} from "../../API/ProjectAPI";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vault = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [error, setError] = useState("");
  const [sessionKey, setSessionKey] = useState(null);
  const [newEntry, setNewEntry] = useState({
    credName: "",
    credType: "",
    version: "",
    username: "",
    password: "",
    sshKey: "",
    passphrase: "",
    communityString: "",
    sudoYn: false,
    enable: false,
  });

  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    setSessionKey(sessionKey);
  }, []);

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => {
    setOpenCreateDialog(false);
  };

  const handleClose = () => {
    setOpenCreateDialog(false);
  };

  const handleAdd = () => {
    setData([...data, { ...newEntry, actions: "Actions" }]);
    setNewEntry({
      credName: "",
      credType: "",
      version: "",
      username: "",
      password: "",
      sshKey: "",
      passphrase: "",
      communityString: "",
      sudoYn: false,
      enable: false,
    });
    handleClose();
  };

  // useEffect(() => {
  //   const fetchWorkflows = async () => {
  //     try {
  //       const response = await fetch("", {
  //         method: "GET",
  //         headers: {
  //           SESSIONKEY: localStorage.getItem("sessionKey"),
  //         },
  //       });
  
  //       if (!response.ok) {
  //       console.log("response", response);
  //         return;
  //       }
  
  //       const data = await response.json();
  
  //       if (data.type === "error") {
  //         console.error(`Server error: ${data.message}`);
  //         setError(data.message);
  //         return; 
  //       }
  
  //       if (Array.isArray(data.data)) {
  //         setWorkflows(data.data);
  //       } else {
  //         console.error("Invalid data format");
  //         setError("Invalid data format");
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       setError("Failed to fetch workflows. Please try again later.");
  //     }
  //   };
  
  //   fetchWorkflows();
  //   const intervalId = setInterval(fetchWorkflows, 2000);
  //   return () => clearInterval(intervalId);
  // }, []);


  const handleCredTypeChange = (e) => {
    setNewEntry({
      ...newEntry,
      credType: e.target.value,
      version: "",
      username: "",
      password: "",
      sshKey: "",
      passphrase: "",
      communityString: "",
    });
  };

  const handleVersionChange = (e) => {
    setNewEntry({
      ...newEntry,
      version: e.target.value,
      username: "",
      password: "",
      communityString: "",
    });
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedVault = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="vaultContainer">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box className="vaultHeader">
            <h2 className="intelli-flow-right-side-headline">Vault</h2>
          </Box>
          <Box className="vaultActions">
            <IconButton
              onClick={handleCreateOpen}
              sx={{ transform: "scale(1.5)" }}
            >
              <AddCircleIcon sx={{ width: "25px" }} />
            </IconButton>
            <TextField
              variant="outlined"
              placeholder="Search Vault"
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
          <TableContainer component={Paper} className="vaultTableContainer">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    CRED Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    CRED Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "15px", fontWeight: "600" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVault && paginatedVault.length > 0 ? (
                  filteredData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell sx={{ padding: "7px" }} align="center">{row.credName}</TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">{row.credType}</TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">{row.username}</TableCell>
                        <TableCell sx={{ padding: "7px" }} align="center">
                          <IconButton color="primary" aria-label="edit">
                              <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" aria-label="delete">
                              <DeleteIcon />
                          </IconButton>
                        </TableCell>
                    </TableRow>
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
              count={filteredData.length}
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
      <Dialog open={openCreateDialog} onClose={handleCreateClose} maxWidth="md" fullWidth>
                <DialogTitle>Add New Credential</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter the details for the new credential.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Cred Name"
                    fullWidth
                    value={newEntry.credName}
                    onChange={(e) =>
                    setNewEntry({ ...newEntry, credName: e.target.value })
                    }
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Cred Type</InputLabel>
                    <Select
                    value={newEntry.credType}
                    onChange={handleCredTypeChange}
                    label="Cred Type"
                    >
                    <MenuItem value="SSH">SSH</MenuItem>
                    <MenuItem value="WINRM">WINRM</MenuItem>
                    <MenuItem value="SSH Key">SSH Key</MenuItem>
                    <MenuItem value="HTTP">HTTP</MenuItem>
                    <MenuItem value="HTTPS">HTTPS</MenuItem>
                    <MenuItem value="SNMP">SNMP</MenuItem>
                    <MenuItem value="PAM">PAM</MenuItem>
                    </Select>
                </FormControl>
                {["SSH", "WINRM", "HTTP", "HTTPS", "PAM"].includes(
                    newEntry.credType
                ) && (
                    <>
                    <TextField
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={newEntry.username}
                        onChange={(e) =>
                        setNewEntry({ ...newEntry, username: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        fullWidth
                        type="password"
                        value={newEntry.password}
                        onChange={(e) =>
                        setNewEntry({ ...newEntry, password: e.target.value })
                        }
                    />
                    </>
                )}
                {newEntry.credType === "SSH Key" && (
                    <>
                    <TextField
                        margin="dense"
                        label="SSH Key"
                        fullWidth
                        multiline
                        rows={4}
                        value={newEntry.sshKey}
                        onChange={(e) =>
                        setNewEntry({ ...newEntry, sshKey: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={newEntry.username}
                        onChange={(e) =>
                        setNewEntry({ ...newEntry, username: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Passphrase"
                        fullWidth
                        type="password"
                        value={newEntry.passphrase}
                        onChange={(e) =>
                        setNewEntry({ ...newEntry, passphrase: e.target.value })
                        }
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={newEntry.sudoYn}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, sudoYn: e.target.checked })
                            }
                        />
                        }
                        label="Sudo Y/N"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={newEntry.enable}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, enable: e.target.checked })
                            }
                        />
                        }
                        label="Enable"
                    />
                    </>
                )}
                {newEntry.credType === "SSH" && (
                    <>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={newEntry.sudoYn}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, sudoYn: e.target.checked })
                            }
                        />
                        }
                        label="Sudo Y/N"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={newEntry.enable}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, enable: e.target.checked })
                            }
                        />
                        }
                        label="Enable"
                    />
                    </>
                )}
                {newEntry.credType === "SNMP" && (
                    <>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Version</InputLabel>
                        <Select
                        value={newEntry.version}
                        onChange={handleVersionChange}
                        label="Version"
                        >
                        <MenuItem value="v2">v2</MenuItem>
                        <MenuItem value="v3">v3</MenuItem>
                        </Select>
                    </FormControl>
                    {newEntry.version === "v2" && (
                        <TextField
                        margin="dense"
                        label="Community String"
                        fullWidth
                        value={newEntry.communityString}
                        onChange={(e) =>
                            setNewEntry({
                            ...newEntry,
                            communityString: e.target.value,
                            })
                        }
                        />
                    )}
                    {newEntry.version === "v3" && (
                        <>
                        <TextField
                            margin="dense"
                            label="Username"
                            fullWidth
                            value={newEntry.username}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, username: e.target.value })
                            }
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            fullWidth
                            type="password"
                            value={newEntry.password}
                            onChange={(e) =>
                            setNewEntry({ ...newEntry, password: e.target.value })
                            }
                        />
                        </>
                    )}
                    </>
                )}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
      </Dialog>     
      <ToastContainer />
    </Box>
  );
};

export default Vault;