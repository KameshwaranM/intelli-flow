import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Paper, IconButton, Menu, MenuItem, Divider, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../Sidebar/Sidebar';
import './Profile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [ username , setUserName] = useState(null);

  useEffect(() => {
    const UserName = localStorage.getItem("userEmail")
    setUserName(UserName)
  })

  const user = {
    name: "Kameshwaran M",
    handle: "rho309-cuello-expanse",
    email: "kameshwaran1209@gmail.com",
    userId: "2b824005-54da-4911-a0cf-44f3bb9ce90c",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate('/Profile_Your_Edit');
    handleMenuClose();
  };

  const handleResetPasswordClick = () => {
    navigate('/Profile_Reset_PWD');
    handleMenuClose();
  };

  return (
    <>
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SidebarMenu />
      <Box sx={{ flex: 3}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:"0px 20px", marginBottom: 2 }}>
        <h2 className="intelli-flow-right-side-headline">Profile</h2>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleEditClick}>
              <EditIcon sx={{ marginRight: 2 }} /> Edit
            </MenuItem>
            <MenuItem onClick={handleResetPasswordClick}>
              <LockResetIcon sx={{ marginRight: 2 }} /> Reset Password
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{padding:"0px 20px"}}>
        <Paper elevation={6} sx={{ padding: 4, maxWidth: 1000, margin: 'auto', position: 'relative', marginTop: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 , position:"absolute" }}>
            <Avatar src="/static/images/avatar/1.jpg" alt={user.name} sx={{ width: 100, height: 100, marginRight: 2, position: 'relative' }} />
            <IconButton
                className="edit-icon"
                onClick={handleEditClick}
                sx={{ position: 'absolute', bottom: 2, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
              >
                <EditIcon />
              </IconButton>
           
          </Box>
          <Divider sx={{ marginBottom: 2, marginTop: 15 }} />
          <Box sx={{ marginBottom: 2 }}>
      
          <Typography variant="body1">Name: <br/><h5 style={{marginTop:"8px"}}>{user.name}</h5></Typography>
          <br/>
  
            <Typography variant="body1">Handle: <br/><h5 style={{marginTop:"8px"}}>{user.handle}</h5></Typography>
            <br/>
            <Typography variant="body1">Email:<br/><h5 style={{marginTop:"8px"}}>{username}</h5></Typography>
            <br/>
            <Typography variant="body1">User ID:<br/><h5 style={{marginTop:"8px"}}>{user.userId}</h5></Typography>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
        </Paper>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default UserProfile;