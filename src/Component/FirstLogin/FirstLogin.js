import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Drawer,
  List,
  IconButton,
  Avatar,
  ListItem,
  ListItemText,
  Popper,
  Paper,
  FormControlLabel,
  Switch,
  Divider,
  MenuItem,
} from "@mui/material";
import LogoImage from "../../Assets/Intellil-Flow-Logo.png";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./FirstLogin.css";
import "../OnBoarding/Pages/Login/login.css";
import { ThemeContext } from "../Theme/Theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const FirstLogin = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const descriptionRegex = /^[a-zA-Z0-9 ]+$/;

    if (!nameRegex.test(projectName) || !descriptionRegex.test(description)) {
      setError(true);
      setOpen(true);
      setTimeout(() => {
        navigate("/Dashboard");
      }, 3000);
    } else {
      setError(false);
      setOpen(true);
      setTimeout(() => {
        navigate("/Dashboard");
      }, 3000);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box
      className="loginPageContainer"
      display="flex"
      minHeight="100vh"
      overflow="hidden"
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 197,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 200,
            boxSizing: "border-box",
            height: "100vh",
            backgroundColor: "#f7f7f766",
          },
        }}
      >
        <Box
          className="drawerContent"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: 150, marginBottom: 20 }}
          />
          <Box
            className="drawerList"
            sx={{ marginTop: "560px" }}
          >
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
            <div style={{marginTop:"10px"}}>
            <Box
                  className="profile-avatar-container"
                  onClick={handleProfileMenuOpen}
                >
            <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
            </Box>
            </div>
            <Popper
                  id={id}
                  open={opens}
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
        </Box>
      </Drawer>
      <div className="first-time-login-card-bg">
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            component="form"
            className="formContainer"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
              color:"black"
            }}
            onSubmit={handleCreate}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Intelli Flow Cloud
            </Typography>
            <Typography align="center" gutterBottom>
              Start by naming your project - each account may contain multiple
              projects. You can use projects to organize your Tasks and
              Workflows.
            </Typography>
            <div className="first-time-login-input">
              <label>Name</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyPress={(event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  const regex = /^[A-Za-z\s]*$/;
                  if (!regex.test(keyValue)) {
                    event.preventDefault();
                  }
                }}
              />
              <label>Description</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={(event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  const regex = /^[A-Za-z\s]*$/;
                  if (!regex.test(keyValue)) {
                    event.preventDefault();
                  }
                }}
              />
              <Box
                className="createButtonContainer"
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ width: "20%" }}
                  className="createButton"
                >
                  Create
                </Button>
              </Box>
            </div>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={error ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {error
                ? "Error creating project"
                : "Project created successfully."}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </Box>
  );
};

export default FirstLogin;
