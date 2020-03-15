import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import RegistrationSummary from "../analytics/RegistrationSummary";
import ProcurementSummary from "../analytics/ProcurementSummary";
import AdvancesSummary from "../analytics/AdvancesSummary";
import TreeCountSummary from "../analytics/TreeCountSummary";
//import SalesSummary from "../analytics/SalesSummary";

import FarmHistoryStatus from "../analytics/FarmHistoryStatus";

import AdvancesReport from "../analytics/AdvancesReport";
import SalesReport from "../analytics/SalesReport";
import AdvancesMode from "../analytics/AdvancesMode";
import FarmerRegistrationReport from "../analytics/FarmerRegistrationReport";

import Demo1 from "../analytics/Demo1";
import Demo2 from "../analytics/Demo2";
import Demo3 from "../analytics/Demo3";
import Demo4 from "../analytics/Demo4";
import Demo7 from "../analytics/Demo7";

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
        <Typography variant="h4" align="center" gutterBottom>
          Experimental demos
        </Typography>

        <Grid container spacing={4}>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo1 />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo2 />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo3 />
          </Grid>

          <br />
        </Grid>

        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo4 />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo7 />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Demo3 />
          </Grid>

          <br />
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Data Analytics
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <RegistrationSummary />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <FarmHistoryStatus />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AdvancesSummary />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TreeCountSummary />
          </Grid>
          {/*  <Grid item lg={3} sm={6} xs={12}>
            <SalesSummary />
          </Grid> */}
        </Grid>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Summary Reports
        </Typography>
        <br />
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xs={12}>
            <FarmerRegistrationReport />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ProcurementSummary />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <AdvancesReport />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <SalesReport />
          </Grid>

          <br />
        </Grid>
        <br />
        <br />
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Summary Statistics
        </Typography>
        <br />
        <br />
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xs={12}>
            <AdvancesMode />
          </Grid>

          <br />
        </Grid>

        <br />
        <br />
        <br />
      </div>
    );
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Analytics);
