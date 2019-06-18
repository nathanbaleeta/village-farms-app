import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import RegistrationSummary from "../analytics/RegistrationSummary";
import ProcurementSummary from "../analytics/ProcurementSummary";
import AdvancesSummary from "../analytics/AdvancesSummary";

import FarmHistoryStatus from "../analytics/FarmHistoryStatus";

import AdvancesReport from "../analytics/AdvancesReport";
import SalesReport from "../analytics/SalesReport";
import AdvancesMode from "../analytics/AdvancesMode";
import FarmerRegistrationReport from "../analytics/FarmerRegistrationReport";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Analytics extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Typography
          variant="display1"
          align="center"
          style={{ color: "black" }}
        >
          Data Analytics
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item lg={4} sm={6} xs={12}>
            <RegistrationSummary />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <FarmHistoryStatus />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <AdvancesSummary />
          </Grid>
        </Grid>
        <br />

        <Typography
          variant="display1"
          align="center"
          style={{ color: "black" }}
        >
          Summary Statistics
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item lg={3} sm={6} xs={12}>
            <ProcurementSummary />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AdvancesReport />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AdvancesMode />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <SalesReport />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <FarmerRegistrationReport />
          </Grid>

          <br />
        </Grid>
      </div>
    );
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Analytics);