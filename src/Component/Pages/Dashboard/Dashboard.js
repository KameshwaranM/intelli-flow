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

const Dashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4">Dashboard</Typography>
          </Box>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">
                    Welcome to Intelli Flow!
                  </Typography>
                  <Typography variant="body1">
                    Execute your first Automation in 5 easy steps.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary">
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  height: { xs: 'auto', md: '405px' },
                  width: '100%',
                }}
              >
                <Typography variant="h6">Workflow Runs</Typography>
                {/* Add content here */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      height: { xs: 'auto', md: '190px' },
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6">Task Runs</Typography>
                    {/* Add content here */}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      height: { xs: 'auto', md: '190px' },
                      width: '100%',
                    }}
                  >
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
