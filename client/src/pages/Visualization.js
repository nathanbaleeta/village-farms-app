import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import RegistrationSummary from "../components/analytics/RegistrationSummary";
import FarmHistoryStatus from "../components/analytics/FarmHistoryStatus";
import AdvancesSummary from "../components/analytics/AdvancesSummary";
import ProcurementSummary from "../components/analytics/ProcurementSummary";
import AdvancesReport from "../components/analytics/AdvancesReport";
import AdvancesMode from "../components/analytics/AdvancesMode";

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

class Visualization extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <RegistrationSummary />
          </Grid>
          <Grid item xs={3}>
            <FarmHistoryStatus />
          </Grid>
          <Grid item xs={3}>
            <AdvancesSummary />
          </Grid>
          <Grid item xs={3}>
            <ProcurementSummary />
          </Grid>

          {/* <Grid item xs={4}>
            <Paper className={classes.paper}>
              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          */}
        </Grid>
        <br />
        <Typography variant="headline" align="center">
          Advances
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <AdvancesReport />
          </Grid>
          <Grid item xs={3}>
            <AdvancesMode />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
        </Grid>
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
