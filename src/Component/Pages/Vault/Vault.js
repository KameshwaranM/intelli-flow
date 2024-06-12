import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Vault = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          halfWidth
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CRED Name</TableCell>
              <TableCell>CRED Type</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.credName}</TableCell>
                <TableCell>{row.credType}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
    </Box>
  );
};

export default Vault;