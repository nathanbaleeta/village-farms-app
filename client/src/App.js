import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

import FarmerList from "./components/Farmer/FarmerList";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <Header />
    <main className={classes.main}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/farmers" component={FarmerList} />
        <Route path="/procurement" />
        <Route path="/advances" />
        <Route path="/reports" />
        <Route path="/settings" />
      </Switch>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
