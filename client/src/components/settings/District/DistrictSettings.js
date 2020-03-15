import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import DeleteIcon from "@material-ui/icons/Delete";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import firebase from "../../common/firebase";

import AddDistrict from "./AddDistrict";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
    districts: []
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    const districtsRef = firebase
      .database()
      .ref("settings")
      .child("districts");

    districtsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district,
          created: items[item].created
        });
      }

      //console.log(newState);
      this.setState({
        districts: newState
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
      console.log(this.state.pricePerKg);
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

  onDeleteDistrict = row => {
    firebase
      .database()
      .ref("settings")
      .child("districts")
      .child(row.id)
      .remove();
  };

  render() {
    const { classes } = this.props;
    const { districts } = this.state;

    return (
      <Fragment>
        <AddDistrict />
        <br />

        <Paper className={classes.tableRoot}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "white",
                    background: "midnightblue",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  District
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    color: "white",
                    background: "midnightblue",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {districts.map(row => (
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
                    align="left"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    <DeleteIcon
                      onClick={this.onDeleteDistrict.bind(this, row)}
                    />
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
