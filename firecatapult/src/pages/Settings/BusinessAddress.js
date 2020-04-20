import React from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link as RouterLink } from "react-router-dom";
import { Form, withFormik } from 'formik';

import { Box, Button, Grid, Card, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { BusinessAddressForm } from "../../components/forms";
import { updateUser, userSelector } from "../../modules/auth";

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
    business_name = '',
    client = '',
    address1 = '',
    city = '',
    state = '',
    zip_code = ''
  } }) => ({
    businessName: business_name,
    client,
    address1,
    city,
    state,
    zipCode: zip_code
	}),
	handleSubmit: async ({
    businessName,
    client,
    address1,
    city,
    state,
    zipCode
	}, {
		props: {
      currentUser,
      updateUser
		},
		setSubmitting
	}) => {
		try {
			setSubmitting(true);
			await updateUser({
        username: currentUser.username,
        email: currentUser.email,
        business_name: businessName,
        address1,
        client,
        city,
        state,
        zip_code: zipCode
      });
		} catch (error) {
			console.log('Sign In Error: ', error);
			setSubmitting(false);
		}
	}
});

const Settings = ({
  values,
  handleChange,
  setFieldTouched
}) => {
  const classes = useStyles();
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Business Information
      </Typography>
      <Card className={classes.card}>
        <Form className={classes.container} noValidate autoComplete="off">
          <BusinessAddressForm values={values} onChange={change} />
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
