import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(1.5),
    width: "100%"
  }
}));

const StyledAppBar = withStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    margin: "0 auto",
    maxWidth: "1110px"
  }
}))(AppBar);

const StyledTab = withStyles(theme => ({
  root: {
    color: "#3E464C",
    fontSize: "0.875rem",
    minWidth: "72px",
    "&:last-child": {
      marginRight: 0
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: "46px"
    }
  }
}))(Tab);

function ScrollableTabsButtonAuto({
  selectedCategory,
  onSelectCategory
}) {
  const classes = useStyles();

  function handleChange(event, newValue) {
    onSelectCategory(newValue);
  }

  return (
    <div className={classes.root}>
      <StyledAppBar position="static" color="default" elevation={0}>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <StyledTab label="All" value='all' {...a11yProps(0)} />
          <StyledTab label="Celebrity" value='Celebrity' {...a11yProps(1)} />
          <StyledTab label="Finance" value='Finance' {...a11yProps(2)} />
          <StyledTab label="Sports" value='Sports' {...a11yProps(3)} />
          <StyledTab label="Travel" value='Travel' {...a11yProps(4)} />
          <StyledTab label="Parenting" value="Parenting" {...a11yProps(5)} />
          <StyledTab label="Beauty" value="Beauty" {...a11yProps(6)} />
          <StyledTab label="Fitness" value="Fitness" {...a11yProps(7)} />
          <StyledTab label="Gambling" value="Gambling" {...a11yProps(8)} />
          <StyledTab label="Engineering" value="Engineering" {...a11yProps(9)} />
          <StyledTab label="DIY" value="DIY" {...a11yProps(10)} />
          <StyledTab label="Food" value="Food" {...a11yProps(11)} />
        </Tabs>
      </StyledAppBar>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}

export default ScrollableTabsButtonAuto;
