import React, { useState } from "react";
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
  ListItem,
  ListItemText,
} from "@mui/material";
import LogoImage from "../../Assets/Intellil-Flow-Logo.png";
import "./FirstLogin.css";
import "../OnBoarding/Pages/Login/login.css";

const FirstLogin = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
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
            style={{ width: 180, marginBottom: 20 }}
          />
          <List
            className="drawerList"
            sx={{ marginTop: "525px", width: "100%" }}
          >
            <ListItem button>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
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
              />
              <label>Description</label>
              <input
                className="first-time-login-card-input"
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
