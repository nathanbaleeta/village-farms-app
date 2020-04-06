import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";

import Snackbar from "../Farmer/Snackbar";

import firebase from "../common/firebase";

const styles = (theme) => ({});

const coffeeTypes = [
  {
    value: "Cherry",
    label: "Cherry",
  },
  {
    value: "Parchment",
    label: "Parchment",
  },
  {
    value: "Mbuni",
    label: "Mbuni",
  },
];

const cashAvailability = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const payNowOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];
class CreateProcurement extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      advanceBalance: 0,
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: 0,
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: "",

      payNow: "",
      amountPaid: "",
      outstandingBalance: "",

      totalAmountPaid: 0,

      // Price per kg readOnly property
      readOnly: true,
    };
  }

  componentWillMount() {
    //Get price catalog for districts
    this.getPriceByDistrict();

    // Get advance balance
    this.getAdvanceBalance();
  }

  // Retrieve price data from firebase
  getPriceByDistrict = () => {
    const pricesRef = firebase.database().ref("settings").child("prices");

    pricesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district,
          pricePerKg: items[item].pricePerKg,
          dateConfigured: items[item].dateConfigured,
        });
      }

      // Filter row which matches farmer district and generate resultset
      const resultset = newState.filter((row) => {
        return row.district === this.props.district;
      });

      //console.log(resultset);

      resultset.length > 0
        ? this.setState({
            pricePerKg: resultset[0].pricePerKg,
          })
        : this.setState({
            pricePerKg: 0,
          });
    });
  };

  /********************** Retrieve Advance Balance *********************/

  getAdvanceBalance = () => {
    //Retrieve total amount paid
    const key = this.props.id;
    let amountPaidCounter = 0;
    const procureRef = firebase
      .database()
      .ref(`procurement/${key}`)
      .orderByKey();
    procureRef.on("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        // Mature trees counter; convert string to int
        amountPaidCounter =
          amountPaidCounter + parseInt(childSnapshot.child("amountPaid").val());
      });
    });

    //Retrieve advance amount and subtract amount paid to get advance balance
    const advanceRef = firebase.database().ref(`advances/${key}`).orderByKey();
    advanceRef.on("value", (snapshot) => {
      let advanceCounter = 0;
      snapshot.forEach(function (childSnapshot) {
        // Mature trees counter; convert string to int
        advanceCounter =
          (advanceCounter +
            parseInt(childSnapshot.child("advanceAmount").val())) |
          parseInt(childSnapshot.child("commodityValue").val());
      });
      // Convert advanceBalance into negative to represent debt owed
      this.setState({
        advanceBalance: -Math.abs(advanceCounter) + amountPaidCounter,
      });
    });
  };
  /********************** Retrieve Advance Balance *********************/

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;
    event.preventDefault();

    // get our form data out of state
    const procurement = {
      advanceBalance: this.state.advanceBalance,
      cashAvailabletoday: this.state.cashAvailabletoday,
      coffeeType: this.state.coffeeType,
      pricePerKg: this.state.pricePerKg,
      todayValueSale: this.state.todayValueSale,
      valueOfSaleLiability: this.state.valueOfSaleLiability,
      weight: this.state.weight,

      payNow: this.state.payNow,
      amountPaid: this.state.amountPaid,
      outstandingBalance: this.state.outstandingBalance,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo",
      }),
    };

    const procurementRef = firebase.database().ref(`procurement/${key}`);

    procurementRef.push(procurement);
    this.setState({
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: "",

      payNow: "",
      amountPaid: "",
      outstandingBalance: "",
    });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Grid container spacing={2}>
            <Snackbar />
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                Procurement
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <NumberFormat
                value={this.state.advanceBalance}
                thousandSeparator={true}
                disabled={true}
                allowNegative={true}
                onValueChange={(values) => {
                  const { floatValue } = values;

                  this.setState({
                    advanceBalance: floatValue,
                  });
                }}
                customInput={TextField}
                label="Advance Balance"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="coffeeType"
                select
                name="coffeeType"
                value={this.state.coffeeType}
                onChange={this.onChange}
                label="Coffee type*"
                fullWidth
                helperText="Please select coffee type"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {coffeeTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={true}
                value={this.state.pricePerKg}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    pricePerKg: floatValue,
                  });
                }}
                customInput={TextField}
                label="Price Per Kg"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={false}
                value={this.state.weight}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    weight: floatValue,
                    todayValueSale: this.state.pricePerKg * floatValue,
                  });
                }}
                customInput={TextField}
                label="Weight"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={true}
                value={this.state.todayValueSale}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    todayValueSale: floatValue,
                    valueOfSaleLiability:
                      Math.abs(this.state.advanceBalance) - floatValue,
                  });
                }}
                customInput={TextField}
                label="Today Value Sale"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={true}
                value={this.state.valueOfSaleLiability}
                thousandSeparator={true}
                allowNegative={true}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    valueOfSaleLiability: floatValue,
                  });
                }}
                customInput={TextField}
                label="Value of sale liability"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                Payment of Farmer
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                id="cashAvailabletoday"
                select
                name="cashAvailabletoday"
                value={this.state.cashAvailabletoday}
                onChange={this.onChange}
                label="Cash available today?*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {cashAvailability.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="payNow"
                select
                name="payNow"
                value={this.state.payNow}
                onChange={this.onChange}
                label="Pay now?*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {payNowOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={false}
                value={this.state.amountPaid}
                thousandSeparator={true}
                allowNegative={true}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    amountPaid: floatValue,
                    outstandingBalance:
                      this.state.valueOfSaleLiability - floatValue,
                  });
                }}
                customInput={TextField}
                label="Amount paid"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <NumberFormat
                disabled={true}
                value={this.state.outstandingBalance}
                thousandSeparator={true}
                allowNegative={true}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    outstandingBalance: floatValue,
                  });
                }}
                customInput={TextField}
                label="Outstanding balance"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <br />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                style={{ background: "midnightblue" }}
              >
                Add Procurement
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CreateProcurement);
