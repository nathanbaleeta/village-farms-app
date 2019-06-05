import React, { Component } from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import Login from "../Authentication/Login";

import Header from "../Layout/Header";

import Analytics from "../analytics/Analytics";

import FarmerList from "../Farmer/FarmerList";
import FarmerDetails from "../Farmer/FarmerDetails";
import EditFarmer from "../Farmer/EditFarmer";
import ProcurementList from "../procurement/ProcurementList";
import AdvancesList from "../advances/AdvancesList";
import SalesList from "../sales/SalesList";

import GeneralSettings from "../settings/GeneralSettings";

import ProtectedRoute from "./ProtectedRoute";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.authenticated ? (
          <span>
            <CssBaseline />
            <Header />
          </span>
        ) : (
          <span>
            <CssBaseline />
            <Header />
          </span>
        )}
        <br />
        <br />
        <br />
        <br />
        <main className={classes.main}>
          <Switch>
            <Route exact path="/" component={Analytics} />
            <Route path="/farmers" component={FarmerList} />
            <Route path="/show/:id" component={FarmerDetails} />
            <Route path="/farmers/edit" component={EditFarmer} />
            <Route path="/procurement" component={ProcurementList} />
            <Route path="/advances" component={AdvancesList} />
            <Route path="/sales" component={SalesList} />

            <Route path="/reports" />
            <Route path="/settings" component={GeneralSettings} />

            <Route path="/users" />
            <Route path="/login" component={Login} />

            <ProtectedRoute
              authenticated={this.props.authenticated}
              path="/farmers1"
              component={FarmerList}
            />

            <ProtectedRoute
              authenticated={this.props.authenticated}
              path="/advances1"
              component={AdvancesList}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
