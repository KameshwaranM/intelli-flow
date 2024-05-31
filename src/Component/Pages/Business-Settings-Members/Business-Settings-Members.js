import React, { useState } from "react";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import "./Business-Settings-Members.css";
import Sidebar from "../../Sidebar/Sidebar";

const BusinessSettingsMember = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Anand Parthiban",
      email: "Anandaraaj.parthiab@gmail.com",
      accountrole: "Owner",
      lastlogin: "May 09th 2024",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
  });
  const [showOptions, setShowOptions] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setMembers([
      ...members,
      {
        ...formData,
        id: members.length + 1,
        accountrole: formData.role,
        lastlogin: currentDate,
      },
    ]);
    setFormData({ name: "", email: "", role: "admin" });
    closeModal();
  };

  const toggleOptions = (id) => {
    setShowOptions(showOptions === id ? null : id);
  };

  const handleEdit = (id) => {
    const member = members.find((member) => member.id === id);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.accountrole,
    });
    openModal();
  };

  const handleDelete = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Account Role",
      selector: (row) => row.accountrole,
    },
    {
      name: "Last Login",
      selector: (row) => row.lastlogin,
    },
    {
      cell: (row) => (
        <div>
          <button onClick={() => toggleOptions(row.id)}>⋮</button>
          {showOptions === row.id && (
            <div className="options">
              <button onClick={() => handleEdit(row.id)}>Edit</button>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </div>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="BS-members">
      <Sidebar />
      <div className="BS-members-container">
      <h2 className="intelli-flow-right-side-headline">Members</h2>
        {/* <div className="Member-toolbar">
        <button onClick={openModal} className="Member-plus-button">
          +
        </button>
        <div className="Member-search-container">
          <FaSearch className="Member-search-icon" />
          <input
            type="text"
            placeholder="Search Projects"
            className="Member-search-box"
          />
        </div>
      </div> */}
        <div className="bsSearch">
          <FaPlusCircle onClick={openModal} className="bsProjPlusIcon" />
          <form action="" className="bsProjSearchBar">
            <FaSearch className="bsProjSearch-icon" />
            <input type="text" placeholder="Search Projects" />
          </form>
        </div>
        <Dialog open={modalIsOpen} onClose={closeModal}>
          <form onSubmit={handleFormSubmit}>
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
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label>Email</label>
                <input
                  className="first-time-login-card-input"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="role">Account Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                  <option value="owner">Owner</option>
                </select>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeModal} variant="contained" color="error">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Invite
                </Button>
              </DialogActions>
            </Box>
          </form>
        </Dialog>

        <div className="Member-ProjTable">
          <DataTable columns={columns} data={members} className="dataTable" />
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsMember;
