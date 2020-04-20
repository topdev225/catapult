import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Card, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Elements } from "react-stripe-elements";
import Form from "./Card";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    padding: theme.spacing(2)
  }
}));

const Settings = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Payment information
      </Typography>
      <Card className={classes.card}>
        <Elements>
          <Form />
        </Elements>

        <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
          <Button
            size="small"
            type="submit"
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>

      <Grid container>
        <Grid item container alignItems="center" xs={6}>
          <Box mt={2}>
            <Link component={RouterLink} to={`/settings`} color="secondary">
              Back
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
