import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { StripeProvider } from "react-stripe-elements";

import Routes from './Routes';
import theme from "./theme";

import "./App.scss";


const App = ({ history }) => (
  <ThemeProvider theme={theme}>
    <StripeProvider apiKey="pk_test_12345">
      <Router history={history}>
        <Routes history={history} />
      </Router>
    </StripeProvider>
  </ThemeProvider>
);

export default App;
