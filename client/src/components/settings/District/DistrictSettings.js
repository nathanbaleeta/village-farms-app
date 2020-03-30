import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//import MenuItem from "@material-ui/core/MenuItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
    key: "",
    pricePerKg: "",
    district: "",
    districts: [],

    visible: false
  };

  showDialog = () => {
    this.setState({ visible: true });
  };

  closeDialog = () => {
    this.setState({ visible: false });
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
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdateDistrict = id => {
    this.showDialog();
    const key = id;

    const pricingRef = firebase
      .database()
      .ref("settings")
      .child("districts")
      .child(key);

    pricingRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        district: snapshot.child("district").val()
      });
    });
  };

  onSubmitDistrict = event => {
    event.preventDefault();

    //Form validation for updating district
    if (
      this.state.district === null ||
      this.state.district === undefined ||
      this.state.district === ""
    ) {
      event.preventDefault();
      return;
    } else {
      // get our form data out of state
      const districtObj = {
        district: this.state.district,
        dateConfigured: new Date().toLocaleString("en-GB", {
          timeZone: "Africa/Maputo"
        })
      };
      // Update price setting info for district
      const priceRef = firebase
        .database()
        .ref("settings")
        .child("districts")
        .child(this.state.key);
      priceRef
        .update(districtObj)
        .then(function() {
          console.log("Synchronization succeeded");
          console.log(this.state);
        })
        .catch(function(error) {
          console.log("Synchronization failed");
        });
    }
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
    const { districts, district } = this.state;

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
                  Edit
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
                  Delete
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
                    <EditIcon
                      onClick={this.onUpdateDistrict.bind(this, row.id)}
                    />
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

        <Dialog
          id="myDialog"
          maxWidth="sm"
          open={this.state.visible}
          aria-labelledby="form-dialog-title"
          onClose={this.closeDialog}
          style={{
            zoom: "80%"
          }}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "white"
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{ color: "midnightblue" }}
            >
              Update district
            </Typography>
          </DialogTitle>
          <DialogContent style={{ overflow: "hidden" }}>
            <form onSubmit={this.onSubmitDistrict}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" align="left" color="default">
                    [Used in Price per kg setting]
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="district"
                    name="district"
                    label="District"
                    fullWidth
                    className={classes.textField}
                    value={district}
                    onChange={this.onChange}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    style={{
                      backgroundColor: "midnightblue",
                      color: "white"
                    }}
                  >
                    Update district
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

PriceSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PriceSettings);
