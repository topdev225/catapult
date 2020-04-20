import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  videoTime: {
    backgroundColor: "#262f35",
    borderRadius: "5px",
    color: "white",
    lineHeight: 1,
    padding: "4px 8px 3px",
    fontSize: "12px",
    fontWeight: 500,
    position: "absolute",
    bottom: "10px",
    right: "10px"
  }
}));

const VideoTime = ({ length }) => {
  const classes = useStyles();

  return (
    <Box className={classes.videoTime}>
      {length.toString().slice(0, -2)}:{length.toString().slice(-2)}
    </Box>
  );
};

export default VideoTime;
