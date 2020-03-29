import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FarmerCount from "../analytics/FarmerCount";
import AdvancesCount from "../analytics/AdvancesCount";
import TreeCount from "../analytics/TreeCount";

import AcreageCalculator from "../analytics/AcreageCalculator";

import AdvancesCalculator from "../analytics/AdvancesCalculator";
import ProcurementSummary from "../analytics/ProcurementSummary";

import AdvancesReport from "../analytics/AdvancesReport";
import SalesReport from "../analytics/SalesReport";
import AdvancesMode from "../analytics/AdvancesMode";
import FarmerRegistrationReport from "../analytics/FarmerRegistrationReport";

import Demo1 from "../analytics/Demo1";
import Demo2 from "../analytics/Demo2";
import FarmersByGender from "../analytics/FarmersByGender";
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

class Analytics extends Component {
  render() {
    //const { classes } = this.props;

    return (
      <Fragment>
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            Data Analytics
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item lg={2} sm={6} xs={12}>
              <FarmerCount />
            </Grid>
            <Grid item lg={2} sm={6} xs={12}>
              <AcreageCalculator />
            </Grid>
            <Grid item lg={2} sm={6} xs={12}>
              <AdvancesCount />
            </Grid>

            <Grid item lg={2} sm={6} xs={12}>
              <AdvancesCalculator />
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <TreeCount />
            </Grid>
          </Grid>
          <br />
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
              <FarmersByGender />
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
      </Fragment>
    );
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Analytics);
