import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: "160px",
    fontSize: "12px !important",
  },
});

const UserEmail = () => {
  const classes = useStyles();
  const [ username , setUserName] = useState(null);

  useEffect(() => {
    const UserName = localStorage.getItem("userEmail")
    setUserName(UserName)
  }
)

  return (
    <Box className="profile-info">
        <Typography className={classes.ellipsis}>Ramanan AR{username}</Typography>
        <Typography className={classes.ellipsis}>{username}</Typography>
    </Box>
  );
};

export default UserEmail;