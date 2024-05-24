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
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={LogoImage} alt="Logo" style={{ width: 210, marginBottom: 10 }} />
          </Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={handlePopperOpen}
          >
            <Typography><span style={{fontSize:"20px", fontWeight:"500"}}>Business Name</span> <br /> Project Name</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
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
                    <ListItem button key={text} sx={{ pl: 4 }}>
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
            <Typography variant="body1">Help</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Box>
                <Box
                  sx={{ cursor: "pointer", display: "flex" }}
                  gap={2}
                  onClick={handleProfileMenuOpen}
                >
                  <Box>
                    <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
                  </Box>
                  <Box>
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
                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
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
          <Paper
            sx={{
              mt: 1,
              p: 2,
              width: 300, // Adjusted width
              border: "1px solid black",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Business Name</Typography>
              <Typography variant="body2" sx={{ background: "lightgray", borderRadius: "3px", padding: "2px 4px" }}>FREE</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
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
            <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
