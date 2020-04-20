import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import { changePassword } from '../../modules/auth';

import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { passwordValidationSchema, passwordConfirmationValidationSchema } from '../../helpers/validationSchemas';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    padding: theme.spacing(2)
  }
}));

const ChangePassword = ({
  changePassword
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    password: '',
    passwordAgain: '',
    currentPassword: ''
  });

  console.log('form values', formValues)

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Change password
      </Typography>
      <Formik
        initialValues={{ password: '', passwordAgain: '' }}
        validationSchema={yup.object().shape({
          password: passwordValidationSchema,
          passwordAgain: passwordConfirmationValidationSchema
        })}
        onSubmit={values => {
          setFormValues(values);
          setOpenDialog(true);
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Card className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    error={Boolean(props.touched.password && props.errors.password)}
                    helperText={props.touched.password ? props.errors.password : ''}
                    value={props.values.password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="passwordAgain"
                    label="Confirm New Password"
                    type="password"
                    autoComplete="confirm-new-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    error={Boolean(props.touched.passwordAgain && props.errors.passwordAgain)}
                    helperText={props.touched.passwordAgain ? props.errors.passwordAgain : ''}
                    value={props.values.passwordAgain}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </Grid>
              </Grid>
              <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
              </Box>
            </Card>
          </Form>
        )}
      />

      <Grid container>
        <Grid item container alignItems="center" xs={6}>
          <Box mt={2}>
            <Link component={RouterLink} to={`/settings`} color="secondary">
              Back
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <Formik
          initialValues={{ currentPassword: '' }}
          validationSchema={yup.object().shape({
            currentPassword: passwordValidationSchema
          })}
          onSubmit={async (values, props) => {
            props.setSubmitting(true);
            try {
              await changePassword(values.currentPassword, formValues.password);
              props.setSubmitting(false);
              setOpenDialog(false);
            } catch (error) {
              props.setSubmitting(false);
              alert('Your current password is incorrect')
            }
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">Enter your current password</DialogTitle>
              <DialogContent>
                <TextField
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  autoComplete="new-password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  error={Boolean(props.touched.currentPassword && props.errors.currentPassword)}
                  helperText={props.touched.currentPassword ? props.errors.currentPassword : ''}
                  value={props.values.currentPassword}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary" disabled={props.isSubmitting}>
                  Update
                </Button>
              </DialogActions>
            </Form>            
          )}
        />
      </Dialog>
    </>
  );
};

const mapState = null;
const mapProps = {
  changePassword
}

export default connect(mapState, mapProps)(ChangePassword);
