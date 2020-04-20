import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import BusinessAddress from "./BusinessAddress";
import ChangePassword from "./ChangePassword";
import Overview from "./SettingsOverview";
import PaymentInfo from "./PaymentInfo";
import PersonalInfo from "./PersonalInfo";

import UploadAsset from "./UploadAsset";

import { userSelector } from "../../modules/auth";

const useStyles = makeStyles(theme => ({
  videoContainer: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "56.25%"
  },
  responsiveIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    maxWidth: "100%",
    maxHeight: "100%",
    border: 0
  }
}));

const SettingsLayout = ({ currentUser }) => {
  const classes = useStyles();

  const [uploadDarkLogo, setUploadDarkLogo] = useState(false);
  const [uploadLightLogo, setUploadLightLogo] = useState(false);

  useEffect(() => {
    setUploadDarkLogo(false);
    setUploadLightLogo(false);
  }, [currentUser]);

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Route path="/settings" exact component={Overview} />
        <Route path="/settings/payment-info" exact component={PaymentInfo} />
        <Route path="/settings/personal-info" exact component={PersonalInfo} />
        <Route
          path="/settings/business-address"
          exact
          component={BusinessAddress}
        />

        <Route
          path="/settings/change-password"
          exact
          component={ChangePassword}
        />
      </Grid>
      <Grid item style={{ width: 280 }}>
        <Box mb={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Logos
          </Typography>
        </Box>

        <Box mb={1}>Dark Logo (light backgrounds)</Box>

        <Box mb={3}>
          {currentUser.dark_brand_logo && !uploadDarkLogo ? (
            <div className={classes.videoContainer}>
              <img
                src={currentUser.dark_brand_logo}
                className={classes.responsiveIframe}
                alt=""
              />
            </div>
          ) : (
            <UploadAsset inputName="dark_brand_logo" />
          )}
          <Link
            component="button"
            onClick={() => {
              setUploadDarkLogo(!uploadDarkLogo);
            }}
            color="secondary"
          >
            {uploadDarkLogo ? "keep image" : "change image"}
          </Link>
        </Box>

        <Box mb={1}>Light Logo (dark backgrounds)</Box>

        <Box mb={3}>
          {currentUser.light_brand_logo && !uploadLightLogo ? (
            <div className={classes.videoContainer}>
              <img
                src={currentUser.light_brand_logo}
                className={classes.responsiveIframe}
                alt=""
              />
            </div>
          ) : (
            <UploadAsset inputName="light_brand_logo" />
          )}
          <Link
            component="button"
            onClick={() => {
              setUploadLightLogo(!uploadLightLogo);
            }}
            color="secondary"
          >
            {uploadLightLogo ? "keep image" : "change image"}
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Box mb={3}>
          <Typography variant="h5" component="h2" gutterBottom>
            Live reads
          </Typography>
        </Box>
        {/* <UploadAsset inputName="first_insert" /> */}
        {currentUser.first_insert ? (
          <div className={classes.videoContainer}>
            <iframe
              src={currentUser.first_insert}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              title="video"
              className={classes.responsiveIframe}
            />
          </div>
        ) : (
          <>
            <Typography variant="body2">
              {/* <Box textAlign="center">
                <Warning />
              </Box> */}
              Looks like you're still missing your ad inserts. They should be on
              their way. Feel free to{" "}
              <Link
                href="mailto:help@firecatapult.com"
                target="_top"
                rel="noopener noreferrer"
                color="secondary"
              >
                contact us
              </Link>
              .
            </Typography>
          </>
        )}

        {currentUser.second_insert && (
          <div className={classes.videoContainer}>
            <iframe
              src={currentUser.second_insert}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              title="video"
              className={classes.responsiveIframe}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

const mapState = state => ({
  currentUser: userSelector(state)
});

export default connect(mapState)(SettingsLayout);
