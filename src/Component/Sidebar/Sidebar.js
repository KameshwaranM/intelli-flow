import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Collapse,
  Popper,
  Paper,
  ClickAwayListener,
  Switch,
  FormControlLabel,
  Button, 
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoImage from "../../Assets/Intellil-Flow-Logo.png";
import { ThemeContext } from "../Theme/Theme";
import "./Sidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FitbitIcon from '@mui/icons-material/Fitbit';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import UserEmail from "./User&Email";

const SidebarMenu = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [businessname , setBusinessName] = useState(null);
  const [projectname , setProjectName] = useState(null);
  const [ username , setUserName] = useState(null);

  useEffect(() => {
    const UserName = localStorage.getItem("userEmail")
    setUserName(UserName)
  })

  const activeStyle = {
    backgroundColor: "#D0D0D0",
    color : "black"
  };

  useEffect(() => {
    const BusinessName = localStorage.getItem("businessname")
    setBusinessName(BusinessName)
  })

  useEffect(() => {
    const ProjectName = localStorage.getItem("projectname")
    setProjectName(ProjectName)
  })

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleBusinessSetClicked = () => {
      navigate('/BusinessName/Settings/Account')
  } 
 
  const handleNavigation = (path) => {
    navigate(path);
 };

  const handleOpenCreateWorkflow = () => {
    navigate("/Create_Project")
  }
  
  const handleopenProject = () => {
    window.location.href = "/BusinessName/Settings/Project"
  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePopperOpen = (event) => {
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
  };

  const handlePopperClose = () => {
    setPopperAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popperOpen = Boolean(popperAnchorEl);
  const id = open ? "simple-popper" : undefined;
  const popperId = popperOpen ? "business-popper" : undefined;

  return (
    <>
      <Drawer
        variant="permanent"
        className="drawer-container"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box component="button" onClick={() => handleNavigation(window.location.href="/Dashboard")} className="logo-container">
            <img src={LogoImage} alt="Logo" style={{ width: 190 }} />
          </Box>
          <Box className="business-name" onClick={handlePopperOpen}>
            <Typography className="business-name-p">{businessname}</Typography>
            <Typography className="project-name-p">{projectname}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              <ListItem
                button
                onClick={() => handleNavigation("/Dashboard")}
                style={{
                  ...(window.location.pathname === "/Dashboard" ? activeStyle : {}),
                }}
              >
                <DashboardIcon className="sidebar-icons"/><ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Workflow_Dashboard")}
                style={{
                  ...(window.location.pathname === "/Workflow_Dashboard" || window.location.pathname === "/Workflow_Editor" || window.location.pathname === "/FlowFormBuilder" ? activeStyle : {}),
                }}
              >
                <AccountTreeIcon className="sidebar-icons"/><ListItemText primary="Workflows" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Executions")}
                style={{
                  ...(window.location.pathname === "/Executions" ? activeStyle : {}),
                }}
              >
                <FitbitIcon className="sidebar-icons"/><ListItemText primary="Executions" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Ad_hoc_Execution")}
                style={{
                  ...(window.location.pathname === "/Ad_hoc_Execution" ? activeStyle : {}),
                }}
              >
                <AutoGraphIcon className="sidebar-icons"/><ListItemText primary="Ad hoc Execution" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Schedules")}
                style={{
                  ...(window.location.pathname === "/Schedules" ? activeStyle : {}),
                }}
              >
                <ScheduleIcon className="sidebar-icons"/><ListItemText primary="Schedules" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Reports")}
                style={{
                  ...(window.location.pathname === "/Reports" ? activeStyle : {}),
                }}
              >
                <SummarizeIcon className="sidebar-icons"/><ListItemText primary="Reports" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Vault")}
                style={{
                  ...(window.location.pathname === "/Vault" ? activeStyle : {}),
                }}
              >
                <AccountBalanceWalletIcon className="sidebar-icons"/><ListItemText primary="Vault" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/Devices")}
                style={{
                  ...(window.location.pathname === "/Devices" ? activeStyle : {}),
                }}
              >
                <PhonelinkIcon className="sidebar-icons"/><ListItemText primary="Devices" />
              </ListItem>
              
              {/* Settings */}
              <ListItem button onClick={handleSettingsClick}
              style={{
                ...(window.location.pathname === "/General" || window.location.pathname === "/Account_Settings" || window.location.pathname === "/On_Prem_Executor" ? activeStyle : {}),
              }}>
                <SettingsApplicationsIcon className="sidebar-icons" />
                <ListItemText primary="Settings" />
                {settingsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                      <ListItem button key="General" onClick={() => handleNavigation("/General")} sx={{ pl: 4 , ...(window.location.pathname === "/General" ? activeStyle : {})}}>
                        <ListItemText
                          sx={{ paddingLeft: "10px" }}
                          primary="General"
                        />
                      </ListItem>
                      <ListItem button key="Account Settings" onClick={() => handleNavigation("/Account_Settings")} sx={{ pl: 4 , ...(window.location.pathname === "/Account_Settings" ? activeStyle : {})}}>
                        <ListItemText
                          sx={{ paddingLeft: "10px" }}
                          primary="Account Settings"
                        />
                      </ListItem>
                      <ListItem button key="On-Prem Executor" onClick={() => handleNavigation("/On_Prem_Executor")} sx={{ pl: 4 , ...(window.location.pathname === "/On_Prem_Executor" ? activeStyle : {})}}>
                        <ListItemText
                          sx={{ paddingLeft: "10px" }}
                          primary="On-Prem Executor"
                        />
                      </ListItem>
                </List>
              </Collapse>
            </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
            <>
              <ListItem
                button
                onClick={() => handleNavigation("/Help")}
                style={{
                  ...(window.location.pathname === "/Help" ? activeStyle : {}),
                }}
              >
                <HelpOutlineIcon className="sidebar-icons"/><ListItemText primary="Help" />
              </ListItem>
            </>
            {/* <IconButton>
              <HelpOutlineIcon />
            </IconButton>
            <Typography variant="body1">Help</Typography> */}
          <Box className="profile-container">
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Box>
                <Box
                  className="profile-avatar-container"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar alt={username} src="/static/images/avatar/1.jpg" />
                  {/* <Box className="profile-info">
                    <Typography className="user-profile-username">Ramanan AR</Typography>
                    <Typography className="user-profile-useremail">{username}</Typography>
                  </Box> */}
                  <UserEmail />
                </Box>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="right-end"
                  style={{ zIndex: 1201 }}
                >
                  <Paper sx={{ mt: 1, p: 2 }}>
                    <Box className="popper-content">
                      <LightModeIcon className="popper-content-dark-light-icon" />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={darkMode}
                            onChange={toggleDarkMode}
                          />
                        }
                      />
                      <DarkModeIcon className="popper-content-dark-light-icon" />
                    </Box>
                    <Divider />
                    {[
                      { text: "Profile", path: "/Your_Profile" },
                      { text: "API Keys", path: "/API_Keys" },
                      { text: "Preferences", path: "/Preferences" },
                      { text: "Feature previews", path: "/Feature_Previews" },
                      { text: "Security", path: "/Security" },
                      { text: "Sign out", path: "/Sign_Out" },
                    ].map((item) => (
                      <MenuItem key={item.text} onClick={() => handleNavigation(item.path)}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </Paper>
                </Popper>
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>
      </Drawer>
      <Popper
        id={popperId}
        open={popperOpen}
        anchorEl={popperAnchorEl}
        placement="right"
        style={{ zIndex: 1201 }}  
      >
        <ClickAwayListener onClickAway={handlePopperClose}>
          <Paper className="business-popper-content">
            <Box className="business-header">
              <Typography variant="h6">{businessname}</Typography>
              <Typography className="business-badge" variant="body2">
                FREE
              </Typography>
              <Box className="business-actions">
                <IconButton size="small" onClick={handleBusinessSetClicked}>
                  <SettingsIcon />
                </IconButton>
                <IconButton size="small" onClick={handleOpenCreateWorkflow} >
                  <AddCircleIcon  />
                </IconButton>
              </Box>
            </Box>
            <div className="sidebar-business-card-project">
              <label>{projectname}</label>
            </div>
            <Box className="business-browse">
              <Button onClick={handleopenProject} variant="contained" color="primary" size="small">
                Browse all
              </Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SidebarMenu;