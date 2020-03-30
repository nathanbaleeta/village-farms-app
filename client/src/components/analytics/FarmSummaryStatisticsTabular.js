import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import firebase from "../common/firebase";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
    color: theme.palette.text.primary
  },
  card: {
    padding: "10px"
  },
  table: {
    width: "100%"
  }
});

class FarmSummaryStatisticsTabular extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    const {} = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <Typography variant="h6" align="center" gutterBottom>
              Summary Statistics
            </Typography>

            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Farmer count
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    190
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,

                      fontWeight: "bold"
                    }}
                  >
                    Acreage
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    89.2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Advances
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    4
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Advance value
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    400k
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Tree count(under 1 yr)
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    400
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Tree count(2 yr)
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    400
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Tree count(3+ yr)
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: "mediumBlue",
                      fontSize: 16
                    }}
                  >
                    400
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

FarmSummaryStatisticsTabular.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmSummaryStatisticsTabular);
