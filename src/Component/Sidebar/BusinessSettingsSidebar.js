import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import UserEmail from "./User&Email";


const BusinessSettingsSidebar = () => {
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
  }
  )

  const activeStyle = {
    backgroundColor: "#D0D0D0",
    color : "black"
  };

  useEffect(() => {
    const BusinessName = localStorage.getItem("businessname")
    setBusinessName(BusinessName)
  }
)
useEffect(() => {
  const ProjectName = localStorage.getItem("projectname")
  setProjectName(ProjectName)
}
)

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleBusinessSetClicked = () => {
    navigate('/Dashboard')
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
          <Box className="logo-container">
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
                onClick={() =>
                  handleNavigation("/BusinessName/Settings/Account")
                }
                style={{
                  ...(window.location.pathname === "/BusinessName/Settings/Account" ? activeStyle : {}),
                }}
              >
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  handleNavigation("/BusinessName/Settings/Project")
                }
                style={{
                  ...(window.location.pathname === "/BusinessName/Settings/Project" ? activeStyle : {}),
                }}
              >
                <ListItemText primary="Projects" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  handleNavigation("/BusinessName/Settings/Members")
                }
                style={{
                  ...(window.location.pathname === "/BusinessName/Settings/Members" ? activeStyle : {}),
                }}
              >
                <ListItemText primary="Members" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  handleNavigation("/BusinessName/Settings/Billing")
                }
                style={{
                  ...(window.location.pathname === "/BusinessName/Settings/Billing" ? activeStyle : {}),
                }}
              >
                <ListItemText primary="Billing" />
              </ListItem>
              <ListItem button onClick={handleSettingsClick}>
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
          <Box className="profile-container">
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Box>
                <Box
                  className="profile-avatar-container"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
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
              <lable>{projectname}</lable>
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

export default BusinessSettingsSidebar;