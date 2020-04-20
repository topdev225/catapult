import React from "react";
import { Box, Grid, TextField, Typography } from "@material-ui/core";

import { BlackButton } from "../../components/buttons";

const SignUp = () => (
  <>
    <Typography variant="h1" component="h1">
      Sign Up
    </Typography>

    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="firstName"
            label="First name"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="lastName"
            label="Last name"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <TextField
        id="email"
        label="Email"
        placeholder=""
        helperText=""
        fullWidth
        type="email"
        name="email"
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="password"
        label="Password"
        placeholder=""
        helperText=""
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
      />

      <TextField
        id="outlined-password-input"
        label="Confirm Password"
        type="password"
        autoComplete="confirm-password"
        margin="normal"
        variant="outlined"
        fullWidth
      />

      <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
        <BlackButton type="submit" text="SIGN UP" />
      </Box>
    </form>
  </>
);

export default SignUp;
