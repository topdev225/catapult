import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const StyledButton = withStyles(theme => ({
  root: {
    backgroundColor: "#181E22",
    borderRadius: "5px",
    color: "white",
    height: "50px",
    minWidth: "100px"
  }
}))(Button);

const BlackButton = ({ text, ...props }) => (
  <StyledButton variant="contained" color="primary" {...props}>
    {text}
  </StyledButton>
);

export default BlackButton;
