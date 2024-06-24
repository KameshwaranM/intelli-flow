import React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '150px',
  },
});

const UserEmail = ({ username }) => {
  const classes = useStyles();

  return (
    <Box className="profile-info">
        <Typography className="user-profile-username">Ramanan AR</Typography>
        <Typography className="user-profile-useremail">{username}</Typography>
    </Box>
  );
};

export default UserEmail;