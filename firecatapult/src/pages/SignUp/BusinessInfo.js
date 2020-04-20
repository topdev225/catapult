import React from "react";
import { Box, Typography } from "@material-ui/core";

import { BlackButton } from "../../components/buttons";

import { BusinessAddressForm } from "../../components/forms";

const BusinessInfo = () => (
  <>
    <Typography variant="h1" component="h1">
      Business Info
    </Typography>

    <form noValidate autoComplete="off">
      <BusinessAddressForm />

      <Box mt={2} style={{ textAlign: "right", width: "100%" }}>
        <BlackButton type="submit" text="NEXT" />
      </Box>
    </form>
  </>
);

export default BusinessInfo;
