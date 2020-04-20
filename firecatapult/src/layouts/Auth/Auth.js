import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import BgImage from "./assets/bg.png";
import Logo from "./assets/Catapult-Logo-white-yellow.svg";

const useStyles = makeStyles(theme => ({
  leftSide: {
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "#181E22",
      backgroundImage: `url(${Logo})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      position: "absolute",
      left: "0",
      top: "0",
      width: "50%"
    }
  },
  rightSide: {
    backgroundImage: `url(${BgImage})`,
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "120%",
    height: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      right: "0",
      top: "0",
      width: "50%"
    }
  },
  formHolder: {
    maxWidth: "420px",
    width: "100%",
    "& h1": {
      color: "#0F1F24",
      fontSize: "28px",
      fontWeight: 500,
      marginBottom: "10px"
    }
  }
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />

      <div className={classes.leftSide} />
      <div className={classes.rightSide}>
        <div className={classes.formHolder}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
