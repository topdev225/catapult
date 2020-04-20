import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Elements } from "react-stripe-elements";

import { BlackButton } from "../../components/buttons";
import Form from "../../pages/Settings/Card";

const Billing = () => (
  <>
    <Typography variant="h1" component="h1">
      Billing
    </Typography>

    <form noValidate autoComplete="off">
      <Elements>
        <Form />
      </Elements>

      <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
        <BlackButton type="submit" text="FINISH" />
      </Box>
    </form>
  </>
);

export default Billing;
