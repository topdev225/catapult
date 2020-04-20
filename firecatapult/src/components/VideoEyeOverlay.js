import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EyeIcon from "@material-ui/icons/RemoveRedEye";

const useStyles = makeStyles(theme => ({
  eyeIcon: {
    fill: "#fff",
    fontSize: "3rem"
  },
  eyeOverlay: {
    backgroundColor: "rgba(0,0,0,0.25)",
    opacity: 0,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      opacity: 1
    }
  }
}));

const VideoEyeOverlay = () => {
  const classes = useStyles();

  return (
    <div className={classes.eyeOverlay}>
      <EyeIcon className={classes.eyeIcon} />
    </div>
  );
};

export default VideoEyeOverlay;
