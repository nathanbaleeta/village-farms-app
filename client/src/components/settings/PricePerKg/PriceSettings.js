import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import NumberFormat from "react-number-format";

import numeral from "numeral";
import moment from "moment";

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
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
});

class PriceSettings extends Component {
  state = {
    key: "",
    pricePerKg: 0,
    district: "",
    dateConfigured: "",
    visible: false,

    priceData: [],
    districts: []
  };

  showDialog = () => {
    this.setState({ visible: true });
  };

  closeDialog = () => {
    this.setState({ visible: false });
  };

  componentWillMount() {
    this.populateDistricts();

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

  populateDistricts = () => {
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
          district: items[item].district
        });
      }

      //console.log(newState);
      this.setState({
        districts: newState
      });
      //console.log(this.state.districts);
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePriceSetting = event => {
    event.preventDefault();

    //Form validation for adding price setting
    if (
      this.state.pricePerKg === null ||
      this.state.pricePerKg === undefined ||
      this.state.district === ""
    ) {
      event.preventDefault();
      return;
    } else {
      // get our form data out of state
      const priceConfig = {
        pricePerKg: this.state.pricePerKg,
        district: this.state.district,
        dateConfigured: new Date().toLocaleString("en-GB", {
          timeZone: "Africa/Maputo"
        })
      };
      // Update price setting info for district
      const priceRef = firebase
        .database()
        .ref("settings")
        .child("prices")
        .child(this.state.key);
      priceRef
        .update(priceConfig)
        .then(function() {
          console.log("Synchronization succeeded");
          console.log(this.state);
        })
        .catch(function(error) {
          console.log("Synchronization failed");
        });
    }
  };

  onEditPrice = id => {
    this.showDialog();
    const key = id;

    const pricingRef = firebase
      .database()
      .ref("settings")
      .child("prices")
      .child(key);

    pricingRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        pricePerKg: snapshot.child("pricePerKg").val(),
        district: snapshot.child("district").val()
      });
    });
  };

  onDeletePrice = row => {
    firebase
      .database()
      .ref("settings")
      .child("prices")
      .child(row.id)
      .remove();
  };

  render() {
    const { classes } = this.props;
    const { priceData, pricePerKg, district, districts } = this.state;

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
                  Price per kg
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
                  Modified
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "white",
                    background: "midnightblue",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "white",
                    background: "midnightblue",
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                ></TableCell>
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
                    {moment(
                      `${row.dateConfigured}`,
                      "DD-MM-YYYYHH:mm:ssZ"
                    ).fromNow()}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    <EditIcon onClick={this.onEditPrice.bind(this, row.id)} />
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      color: "black",
                      fontSize: 16
                    }}
                  >
                    <DeleteIcon onClick={this.onDeletePrice.bind(this, row)} />
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
              style={{ color: "black" }}
            >
              Update Price Per Kg
            </Typography>
          </DialogTitle>
          <DialogContent style={{ overflow: "hidden" }}>
            <form onSubmit={this.handlePriceSetting}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" align="left" color="primary">
                    [Used in Procurement/ Advance modules]
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    disabled
                    required
                    id="district"
                    select
                    name="district"
                    value={district}
                    onChange={this.onChange}
                    label="District"
                    fullWidth
                    helperText="Please select district"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {districts.map(option => (
                      <MenuItem key={option.id} value={option.district}>
                        {option.district}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <NumberFormat
                    value={pricePerKg}
                    thousandSeparator={true}
                    allowNegative={false}
                    decimalScale={2}
                    onValueChange={values => {
                      const { floatValue } = values;
                      this.setState({
                        pricePerKg: floatValue
                      });
                    }}
                    customInput={TextField}
                    label="Price per kg"
                    fullWidth
                    margin="normal"
                    autoComplete="off"
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
                    Update price
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
