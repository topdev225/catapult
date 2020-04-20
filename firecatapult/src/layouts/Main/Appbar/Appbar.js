import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";

import AccountMenu from "./AccountMenu";

import QuestionIcon from "./question-icon.svg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1rem",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBar: {
    // backgroundColor: 'white' ,
    // color: '#c1c1c1',
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    "& a": {
      color: "inherit"
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const StyledToolbar = withStyles(theme => ({
  regular: {
    minHeight: "60px"
  }
}))(Toolbar);

function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "Search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="Your cart" color="inherit">
              <ShoppingCartIcon style={{ fontSize: "1.3rem" }} />
            </IconButton>
            <Tooltip title="Contact Support" placement="bottom">
              <a
                href="mailto:help@firecatapult.com"
                target="_top"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="Help" color="inherit">
                  <img src={QuestionIcon} width={20} alt="Contact support" />
                </IconButton>
              </a>
            </Tooltip>
            <Link to="/settings">
              <IconButton aria-label="Settings" color="inherit">
                <SettingsIcon style={{ fontSize: "1.3rem" }} />
              </IconButton>
            </Link>

            <AccountMenu />
          </div>
        </StyledToolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
