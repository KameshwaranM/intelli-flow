import React, { useState, useContext } from "react";
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
  TextField,
  Button,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import LogoImage from "../../Assets/Intellil-Flow-Logo.png";
import { ThemeContext } from "../Theams/Theam";
import "./Sidebar.css"

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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
            <img src={LogoImage} alt="Logo" style={{ width: 150 }} />
          </Box>
          <Box className="business-name" onClick={handlePopperOpen}>
            <Typography>
              Business Name <br /> Project Name
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box className="list-container">
          <List>
            <ListItem button onClick={() => handleNavigation("/Dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/Workflow_Dashboard")}>
              <ListItemText primary="Workflows" />
            </ListItem>
            {[
              "Executions",
              "Ad hoc Execution",
              "Schedules",
              "Reports",
              "Vault",
              "Devices",
            ].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleSettingsClick}>
              <ListItemText primary="Settings" />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["General", "Account Settings", "On-Prem Executor"].map(
                  (text) => (
                    <ListItem button key={text} className="settings-collapse">
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </Collapse>
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Box className="help-container" mb={2}>
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
            <Typography variant="body1">Help</Typography>
          </Box>
          <Box className="profile-container">
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Box>
                <Box
                  className="profile-avatar-container"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
                  <Box className="profile-info">
                    <Typography variant="body2">Ramanan AR</Typography>
                    <Typography variant="body2">ramanan@gmail.com</Typography>
                  </Box>
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
                      <LightModeIcon />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={darkMode}
                            onChange={toggleDarkMode}
                          />
                        }
                      />
                      <DarkModeIcon />
                    </Box>
                    <Divider />
                    {[
                      "Profile",
                      "API Keys",
                      "Preferences",
                      "Feature previews",
                      "Security",
                      "Sign out",
                    ].map((text) => (
                      <MenuItem key={text} onClick={handleProfileMenuClose}>
                        {text}
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
              <Typography variant="h6">Business Name</Typography>
              <Typography className="business-badge" variant="body2">
                FREE
              </Typography>
              <Box className="business-actions">
                <IconButton size="small">
                  <SettingsIcon />
                </IconButton>
                <IconButton size="small">
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Box mt={2}>
              <TextField
                variant="outlined"
                fullWidth
                defaultValue="Project Name"
                InputProps={{
                  style: { padding: "0px 5px" },
                }}
              />
            </Box>
            <Box className="business-browse">
              <Button variant="contained" color="primary" size="small">
                Browse all
              </Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default Sidebar;
