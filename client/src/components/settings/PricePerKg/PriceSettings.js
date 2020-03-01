import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import EditIcon from "@material-ui/icons/Edit";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import numeral from "numeral";

import AddPriceSetting from "./AddPriceSetting";

import firebase from "../../common/firebase";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

class PriceSettings extends Component {
  state = {
    pricePerKg: "",
    district: "",

    priceData: []
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    const pricesRef = firebase
      .database()
      .ref("settings")
      .child("prices");

    pricesRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district,
          pricePerKg: items[item].pricePerKg,
          dateConfigured: items[item].dateConfigured
        });
      }

      //console.log(newState);
      this.setState({
        priceData: newState
      });
      //console.log(this.state.districts);
    });

    // procurement price setting.
    const priceRef = firebase
      .database()
      .ref("settings")
      .orderByKey();
    priceRef.on("value", snapshot => {
      let priceConfig = "";
      snapshot.forEach(function(childSnapshot) {
        priceConfig = childSnapshot.child("pricePerKg").val();
      });
      this.setState({
        pricePerKg: priceConfig
      });
      //console.log(this.state.pricePerKg);
    });
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePriceSetting = event => {
    event.preventDefault();

    // get our form data out of state
    //const date = Date.now();
    console.log(Date(Date.now()));
    const priceConfig = {
      pricePerKg: this.state.pricePerKg,
      district: this.state.district,
      dateConfigured: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    const settingsRef = firebase.database().ref("settings");

    settingsRef.push(priceConfig);
  };

  onEditPrice = row => {};

  render() {
    const { classes } = this.props;
    const { priceData } = this.state;

    return (
      <Fragment>
        <AddPriceSetting />
        <br />

        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "black",
                    background: "lightGray",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  District
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    color: "black",
                    background: "lightGray",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  Price per kg
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "black",
                    background: "lightGray",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  Created on
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "black",
                    background: "lightGray",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceData.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    {row.district}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    {numeral(row.pricePerKg).format("0,0[.]00")}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    {row.dateConfigured}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    <EditIcon onClick={this.onEditPrice.bind(this, row)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

PriceSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PriceSettings);
