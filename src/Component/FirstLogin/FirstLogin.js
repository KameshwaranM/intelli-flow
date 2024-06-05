import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Drawer,
  IconButton,
  Avatar,
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
import { URL_Create_Project } from "../API/ProjectAPI";
import axios from 'axios';
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FirstLogin = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const [sessionkey , setSessionKey] = useState(null);

  useEffect(() => {
    const sessionkey = localStorage.getItem("sessionKey")
    setSessionKey(sessionkey)
  }
)

const handleCreateProject = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(URL_Create_Project, {
      projectname: projectName,
      description: description
    }, {
      headers: {
        'SESSIONKEY': sessionkey
      }
    });
    console.log("response", response);
    setError("Project Created Successfully");
    toast.success('Project Created Successfully', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    localStorage.setItem("projectname",projectName);
    setTimeout(() => {
      window.location.href = "/Dashboard";
    }, 3000);

  } catch (error) {
    console.error('Error fetching data:', error);

    let errorMessage = 'An unexpected error occurred.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    setError(errorMessage);
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
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
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
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
            style={{ width: 190, marginBottom: 20, marginTop:4 }}
          />
          <Box
            className="drawerList"
            sx={{ marginTop: "560px" , textAlign:"center" }}
          >
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
            <div style={{marginTop:"10px", textAlign:"-webkit-center"}}>
            <Box
                  className="profile-avatar-containers"
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
            onSubmit={handleCreateProject}
          >
            <Typography variant="h5" gutterBottom>
              Welcome to Intelli Flow Cloud
            </Typography>
            <Typography gutterBottom>
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
          <div>
        <ToastContainer />
      </div>
        </Container>
      </div>
    </Box>
  );
};

export default FirstLogin;
