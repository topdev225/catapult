import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Grid,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import AvatarImage from "./avatar.png";
import myCatapult from "./my-catapult.png";
import { userSelector } from "../../../modules/auth";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: "transparent",
    cursor: "pointer",
    height: 40,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    width: 40
  },
  menuHeader: {
    backgroundColor: "#262f35",
    color: "#fff",
    padding: theme.spacing(1.5),
    "& b": {
      color: "#fff"
    }
  },
  myCatapult: {
    width: "120px"
  },
  menuLink: {
    color: "inherit",
    textDecoration: "none",
    "&.active, &:hover": {
      backgroundColor: "#262f35"
    },
    "&[disabled]": {
      cursor: "default",
      pointerEvents: "none"
    }
  }
}));

const StyledMenu = withStyles(theme => ({
  paper: {
    marginTop: "10px",
    width: "280px"
  },
  list: {
    padding: 0
  }
}))(props => (
  <Menu
    elevation={8}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const mapState = state => ({
  currentUser: userSelector(state)
});

function CustomizedMenus({ currentUser, routerPush }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Avatar onClick={handleClick} className={classes.avatar}>
        <AccountCircleIcon style={{ fontSize: "40px" }} />
      </Avatar>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.menuHeader}>
          <Box mb={1}>
            <img
              src={myCatapult}
              className={classes.myCatapult}
              alt="my catapult"
            />
          </Box>
          <Grid container direction="column" alignItems="flex-end">
            <div>
              <b>{`${currentUser.first_name} ${currentUser.last_name}`}</b>
            </div>
            <small>{currentUser.business_name}</small>
          </Grid>
        </Box>

        <NavLink to="/settings" exact className={classes.menuLink}>
          <StyledMenuItem>
            <ListItemText primary="Account Info" />
          </StyledMenuItem>
        </NavLink>
        <div className={classes.menuLink} disabled={true}>
          <StyledMenuItem disabled={true}>
            <ListItemText primary="Payment History" />
          </StyledMenuItem>
        </div>
        <div className={classes.menuLink} disabled={true}>
          <StyledMenuItem disabled={true}>
            <ListItemText primary="Buy Credits" />
          </StyledMenuItem>
        </div>
        <Divider light />
        <StyledMenuItem
          onClick={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("uid");
            window.location.href = "/";
          }}
        >
          <ListItemText primary="Log out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default connect(mapState)(CustomizedMenus);
