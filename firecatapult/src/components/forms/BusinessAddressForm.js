import React from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import USStates from '../../constants/states.json';

const BusinessAddressForm = ({
  values,
  onChange
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="businessName"
            name="businessName"
            label="Business name"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.businessName}
            onChange={onChange.bind(null, 'businessName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="client"
            name="client"
            label="Client"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.client}
            onChange={onChange.bind(null, 'client')}
          />
        </Grid>
      </Grid>

      <TextField
        id="businessAddress"
        name="address1"
        label="Address"
        placeholder=""
        helperText=""
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.address1}
        onChange={onChange.bind(null, 'address1')}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            id="city"
            name="city"
            label="City"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.city}
            onChange={onChange.bind(null, 'city')}
          />
        </Grid>

        <Grid item sm={3}>
          <TextField
            id="state"
            name="state"
            label="State"
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            select
            value={values.state}
            onChange={onChange.bind(null, 'state')}
          >
            {Object.keys(USStates).map(code => (
              <MenuItem key={code} value={code}>{USStates[code]}</MenuItem>  
            ))}
          </TextField>
        </Grid>

        <Grid item xs sm={4}>
          <TextField
            id="zip"
            name="zipCode"
            label="Zip code"
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.zipCode}
            onChange={onChange.bind(null, 'zipCode')}
          />
        </Grid>
      </Grid>

      {/* <TextField
            id="businessDescription"
            label="Business description"
            multiline
            rows="3"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
          /> */}
    </>
  );
};
export default BusinessAddressForm;
