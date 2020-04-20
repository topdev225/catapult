import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Divider, Grid, Link, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowRight } from "@material-ui/icons";
import { userSelector } from "../../modules/auth";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    padding: theme.spacing(3),
    "& a:hover": {
      textDecoration: "none"
    }
  }
}));

const Settings = ({ currentUser }) => {
  const classes = useStyles();
  const {
    business_name: businessName,
    client,
    address1,
    first_name,
    last_name,
    email
  } = currentUser;
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Account settings
      </Typography>
      <Card className={classes.card}>
        <Link
          component={RouterLink}
          to={`/settings/business-address`}
          color="inherit"
        >
          <Grid container>
            <Grid item xs={10}>
              <Box p={2}>
                <Box mb={3}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Box mb={1}>
                        <label>BUSINESS NAME</label>
                      </Box>
                      <b className="semibold">{businessName}</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Box mb={1}>
                        <label>CLIENT</label>
                      </Box>
                      <b className="semibold">{client}</b>
                    </Grid>
                  </Grid>
                </Box>
                <Box mb={1}>
                  <label>ADDRESS</label>
                </Box>
                <b className="semibold">{address1}</b>
              </Box>
            </Grid>
            <Grid xs={2} item container justify="center" alignItems="center">
              <KeyboardArrowRight />
            </Grid>
          </Grid>
        </Link>

        <Box my={3}>
          <Divider />
        </Box>

        <Link
          component={RouterLink}
          to={`/settings/personal-info`}
          color="inherit"
        >
          <Grid container>
            <Grid xs={10}>
              <Box p={2}>
                <Box mb={3}>
                  <Grid container>
                    <Grid xs={6}>
                      <Box mb={1}>
                        <label>NAME</label>
                      </Box>
                      <b className="semibold">{`${first_name} ${last_name}`}</b>
                    </Grid>
                    <Grid xs={6}>
                      <Box mb={1}>
                        <label>EMAIL</label>
                      </Box>
                      <b className="semibold">{email}</b>
                    </Grid>
                  </Grid>
                </Box>

                <Box mb={1}>
                  <label>PASSWORD</label>
                </Box>
                <b className="semibold">********</b>
              </Box>
            </Grid>

            <Grid xs={2} item container justify="center" alignItems="center">
              <KeyboardArrowRight />
            </Grid>
          </Grid>
        </Link>

        <Box my={3}>
          <Divider />
        </Box>

        {/* <Link
          component={RouterLink}
          to={`/settings/payment-info`}
          color="inherit"
        > */}
        <div>
          <Grid container>
            <Grid xs={10}>
              <Box p={2}>
                <Box mb={3}>
                  <Grid container>
                    <Grid xs={6}>
                      <Box mb={1}>
                        <label>PAYMENT METHOD</label>
                      </Box>
                      <b className="semibold">**** 1234</b>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid xs={2} item container justify="center" alignItems="center">
              {/* <KeyboardArrowRight /> */}
            </Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
};

const mapState = state => ({
  currentUser: userSelector(state)
});

export default connect(mapState)(Settings);
