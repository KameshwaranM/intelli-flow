import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Sidebar from "../../Sidebar/Sidebar";
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" className="main-content">
        <Container maxWidth="xl">
          <Box className="dashboard-header">
            <Typography variant="h4">Dashboard</Typography>
          </Box>
          <Grid container spacing={2} className="grid-container">
            <Grid item xs={12}>
              <Card className="welcome-card">
                <CardContent>
                  <Typography variant="h6">Welcome to Intelli Flow!</Typography>
                  <Typography variant="body1">
                    Execute your first Automation in 5 easy steps.
                  </Typography>
                  <CardActions className="card-actions">
                    <Button variant="contained" color="primary">
                      Get Started
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper className="workflow-runs-paper">
                <Typography variant="h6">Workflow Runs</Typography>
                {/* Add content here */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper className="task-runs-paper">
                    <Typography variant="h6">Task Runs</Typography>
                    {/* Add content here */}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className="upcoming-runs-paper">
                    <Typography variant="h6">Upcoming Runs</Typography>
                    {/* Add content here */}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>

  );
};

export default Dashboard;
