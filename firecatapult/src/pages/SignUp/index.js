import React from "react";
import { Route } from "react-router-dom";

import Billing from "./Billing";
import BusinessInfo from "./BusinessInfo";
import SignUp from "./SignUp";

const SignUpRoutes = () => (
  <>
    <Route path="/signup" exact component={SignUp} />
    <Route path="/signup/business-info" exact component={BusinessInfo} />
    <Route path="/signup/billing" exact component={Billing} />
  </>
);

export default SignUpRoutes;
