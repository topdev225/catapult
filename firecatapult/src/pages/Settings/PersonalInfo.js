import React from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link as RouterLink } from "react-router-dom";
import { Form, withFormik } from 'formik';
import { updateUser, userSelector } from "../../modules/auth";

import {
  Box,
  Button,
  Grid,
  Card,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    padding: theme.spacing(2)
  }
}));

const withForm = withFormik({
	mapPropsToValues: ({ currentUser: {
    first_name = '',
    last_name = ''
  } }) => ({
    firstName: first_name,
    lastName: last_name
	}),
	handleSubmit: async ({
    firstName,
    lastName
	}, {
		props: {
      currentUser: {
        username,
        zip_code,
        state,
        city,
        email,
        address1,
        business_name
      },
      updateUser
		},
		setSubmitting
	}) => {
		try {
			setSubmitting(true);
			await updateUser({
        username: username,
        email: email,
        business_name,
        address1,
        city,
        state,
        zip_code,
        first_name: firstName,
        last_name: lastName,
      });
		} catch (error) {
			console.log('Sign In Error: ', error);
			setSubmitting(false);
		}
	}
});

const Settings = ({
  values,
  handleChange
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Personal Information
      </Typography>
      <Card className={classes.card}>
        <Form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First name"
                placeholder=""
                helperText=""
                fullWidth
                margin="normal"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                placeholder=""
                helperText=""
                fullWidth
                margin="normal"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                id="password"
                label="Password"
                placeholder=""
                helperText=""
                fullWidth
                margin="normal"
                variant="outlined"
                value="123456"
              /> */}
              <Link
                to="change-password"
                component={RouterLink}
                color="secondary"
              >
                Change password
              </Link>
            </Grid>
          </Grid>

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
        </Form>
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

const mapState = state => ({
  currentUser: userSelector(state)
});

const mapDispatch = {
  updateUser
};

export default compose(
  connect(mapState, mapDispatch),
  withForm
)(Settings);
