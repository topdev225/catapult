import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Form } from 'formik';

import { BlackButton } from "../../components/buttons";

const SignIn = ({
  values: { username, password },
	touched,
	errors,
  isSubmitting,
  isValid,
  handleChange,
  setFieldTouched
}) => {
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Typography variant="h1" component="h1">
        Sign In
      </Typography>
  
      <Form noValidate autoComplete="off">
        <TextField
          id="username"
          label="Email"
          fullWidth
          name="username"
          margin="normal"
          variant="outlined"
          error={Boolean(touched.username && errors.username)}
          helperText={touched.username ? errors.username : ''}
          onChange={change.bind(null, "username")}
        />
        <TextField
          id="Password"
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          name="password"
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password ? errors.password : ''}
          onChange={change.bind(null, "password")}
        />
  
        <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
          <BlackButton type="submit" text="SIGN IN" disabled={!isValid || isSubmitting} />
        </Box>
      </Form>
    </>
  )
};

export default SignIn;
