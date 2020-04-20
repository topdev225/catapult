import React from "react";
import clsx from "clsx";
import { withRouter, Link, NavLink } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Zoom
} from "@material-ui/core";
import Logo from "./logo.svg";
import qs from 'qs';

import { sidebarLinks } from "./constants";

const drawerWidth = 240;

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#262f35",
    boxShadow: theme.shadows[2],
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    marginLeft: theme.spacing(-1),
    padding: theme.spacing(0.75),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  }
}))(Tooltip);

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    paper: {
      backgroundColor: "#181E22"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    list: {
      padding: 0
    },
    navLink: {
      display: "block",
      "&.active, &:hover": {
        backgroundColor: "#262f35"
      },
      "&[disabled]": {
        pointerEvents: "none"
      }
    },
    listItem: {
      height: "60px",
      justifyContent: "center",
      padding: 0
    },
    listLogo: {
      color: "yellow",
      minWidth: "26px"
    },
    listItemIcon: {
      color: "white",
      minWidth: "22px"
    }
  };
});

const Sidebar = ({
  location
}) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, classes.drawerClose)}
      classes={{
        paper: clsx(classes.paper, classes.drawerClose)
      }}
    >
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Link to="/">
            <ListItemIcon className={classes.listLogo}>
              <img src={Logo} width={26} alt="Catapult" />
            </ListItemIcon>
          </Link>
        </ListItem>

        {sidebarLinks.map(({ disabled, icon, linkTo, title, popupRoute, popupType, style }) => {
          let to = null
          if (popupRoute) {
            to = {
              ...location,
              search: qs.stringify({
                ...qs.parse(location.search.substring(1)),
                popup: popupType
              })
            }
          } else {
            to = linkTo
          }

          return (
            <NavLink
              to={to}
              exact
              key={title}
              className={classes.navLink}
              disabled={disabled}
            >
              <StyledTooltip
                title={title}
                placement="right"
                TransitionComponent={Zoom}
              >
                <ListItem className={classes.listItem} disabled={disabled}>
                  <ListItemIcon className={classes.listItemIcon} style={style}>
                    {icon}
                  </ListItemIcon>
                </ListItem>
              </StyledTooltip>
            </NavLink>
          )
        })}
      </List>
    </Drawer>
  );
};

export default withRouter(Sidebar);
