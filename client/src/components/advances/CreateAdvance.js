import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

import NumberFormat from "react-number-format";

import firebase from "../common/firebase";

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
});

const advanceTypes = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Commodity",
    label: "Commodity",
  },
];

const commodities = [
  {
    value: "Seedlings",
    label: "Seedlings",
  },
  {
    value: "Fertilizer",
    label: "Fertilizer",
  },
  {
    value: "Chemicals",
    label: "Chemicals",
  },
  {
    value: "Polythene tubes",
    label: "Polythene tubes",
  },
];

const paymentModes = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Coffee",
    label: "Coffee",
  },
];

class CreateAdvances extends Component {
  constructor() {
    super();
    this.state = {
      advanceType: "",
      advanceAmount: "",
      commodityAdvanced: "",
      commodityValue: "",
      paymentMode: "",
      pricePerKg: 0,
      totalCoffeeWeight: 0,

      // inputValues
      amount: false,
      commodity: false,

      //errors
      errors: [],
      show: "none",
    };
  }

  componentDidMount() {
    // targetID retrieved from another component using onClick event listener
    //console.log(this.props.id);

    this.getPriceByDistrict();
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

  handleActivation = (event) => {
    if (event.target.value !== "Cash") {
      // Clear form before proceeding
      this.setState({
        advanceAmount: "",
        commodityAdvanced: "",
        commodityValue: "",
        paymentMode: "",
        totalCoffeeWeight: "",
      });
      this.handleCashInput();
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({
        // Clear form before proceeding
        advanceAmount: "",
        commodityAdvanced: "",
        commodityValue: "",
        paymentMode: "",
        totalCoffeeWeight: "",
      });
      this.handleCommodityInput();
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCashInput() {
    this.setState({
      amount: true,
      commodity: false,
    });
  }
  handleCommodityInput() {
    this.setState({ amount: false, commodity: true });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Check for empty fields
  isEmpty = (value) => {
    return (
      value === null ||
      value.length === 0 ||
      value === "" ||
      value === undefined
    );
  };

  openAlert = () => {
    this.setState({ show: "block" });
  };

  closeAlert = () => {
    this.setState({ show: "none" });
  };

  // Validate input
  onValidate = (
    advanceType,
    paymentMode,
    advanceAmount,
    commodityValue,
    commodityAdvanced,
    pricePerKg,
    totalCoffeeWeight
  ) => {
    // Store errors for all fields in an array
    const errors = [];

    if (advanceType === "") {
      errors.push("Advance type can't be empty");
    }
    if (paymentMode === "") {
      errors.push("Payment mode can't be empty");
    }
    if (advanceType === "Cash" && advanceAmount === undefined) {
      errors.push("Advance amount is required");
    }
    if (advanceType === "Commodity" && commodityAdvanced === "") {
      errors.push("Commodity advanced is required");
    }
    if (advanceType === "Commodity" && commodityValue === undefined) {
      errors.push("Commodity value is required");
    }
    if (totalCoffeeWeight === undefined) {
      errors.push(
        "Total coffee weight missing; fill in advance amount or commodity value"
      );
    }
    if (totalCoffeeWeight < 1) {
      errors.push(
        "Total coffee weight must not be less than 1; increment advance amount or commodity value"
      );
    }
    if (advanceType === "Cash" && advanceAmount !== "" && advanceAmount < 1) {
      errors.push("Advance amount must be greater than zero");
    }
    if (
      advanceType === "Commodity" &&
      commodityValue !== "" &&
      commodityValue < 1
    ) {
      errors.push("Commodity value must be greater than zero");
    }

    if (pricePerKg === undefined) {
      errors.push("Price per kg is required");
    }

    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.onValidate(
      this.state.advanceType,
      this.state.paymentMode,
      this.state.advanceAmount,
      this.state.commodityValue,
      this.state.commodityAdvanced,
      this.state.pricePerKg,
      this.state.totalCoffeeWeight
    );
    if (errors.length > 0) {
      this.setState({ errors });
      this.openAlert();
      return;
    } else {
      // Clear error stack if no errors; then hide error alert box
      this.setState({ errors: [], show: "none" });
    }

    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;

    // get our form data out of state
    const advance = {
      advanceType: this.state.advanceType,
      advanceAmount: !this.state.advanceAmount ? 0 : this.state.advanceAmount,
      commodityAdvanced: this.state.commodityAdvanced,
      commodityValue: !this.state.commodityValue
        ? 0
        : this.state.commodityValue,
      paymentMode: this.state.paymentMode,
      pricePerKg: this.state.pricePerKg,
      totalCoffeeWeight: this.state.totalCoffeeWeight,

      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo",
      }),
    };

    const advanceRef = firebase.database().ref(`advances/${key}`);

    advanceRef.push(advance);
    this.setState({
      advanceType: "",
      advanceAmount: "",
      commodityAdvanced: "",
      commodityValue: "",
      paymentMode: "",
      pricePerKg: "",
      totalCoffeeWeight: "",
    });
  };

  render() {
    //const { classes } = this.props;
    const {
      advanceAmount,
      commodityValue,
      pricePerKg,
      totalCoffeeWeight,
      errors,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Box component="span" display={this.state.show}>
                <Alert
                  variant="standard"
                  severity="error"
                  onClose={this.closeAlert}
                >
                  <AlertTitle>Error</AlertTitle>
                  <ul>
                    {errors.map((msg, index) => (
                      <li key={index}> {msg} </li>
                    ))}
                  </ul>
                </Alert>
              </Box>
              <br />
              <Typography variant="h5" gutterBottom>
                Advances
              </Typography>
            </Grid>

            <Grid item lg={6} sm={12}>
              <TextField
                required
                id="advanceType"
                select
                name="advanceType"
                value={this.state.advanceType}
                onChange={(event) => this.handleActivation(event)}
                label="Advance type*"
                fullWidth
                helperText="Please select advance type"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {advanceTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={6} sm={12}>
              <TextField
                id="paymentMode"
                select
                name="paymentMode"
                value={this.state.paymentMode}
                onChange={this.onChange}
                label="Mode of payment"
                fullWidth
                helperText="Please select mode of payment"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {paymentModes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <NumberFormat
                value={advanceAmount}
                thousandSeparator={true}
                disabled={this.state.amount}
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;

                  this.setState({
                    advanceAmount: floatValue,
                    totalCoffeeWeight: floatValue / pricePerKg,
                  });
                }}
                customInput={TextField}
                label="Advance amount"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="commodityAdvanced"
                disabled={this.state.commodity}
                select
                name="commodityAdvanced"
                value={this.state.commodityAdvanced}
                onChange={this.onChange}
                label="Commodity Advanced"
                fullWidth
                helperText="Please select commodity advanced"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {commodities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <NumberFormat
                disabled={this.state.commodity}
                value={commodityValue}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={2}
                onValueChange={(values) => {
                  const { floatValue } = values;

                  this.setState({
                    commodityValue: floatValue,
                    totalCoffeeWeight: floatValue / pricePerKg,
                  });
                }}
                customInput={TextField}
                label="Commodity value"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <NumberFormat
                disabled={true}
                value={pricePerKg}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({
                    pricePerKg: floatValue,
                    totalCoffeeWeight:
                      (advanceAmount / floatValue) |
                      (commodityValue / floatValue),
                  });
                }}
                customInput={TextField}
                label="Price Per Kg"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <NumberFormat
                disabled={true}
                value={totalCoffeeWeight}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={2}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  this.setState({ totalCoffeeWeight: floatValue });
                }}
                customInput={TextField}
                label="Total coffee weight"
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
                color="primary"
                style={{ background: "midnightblue" }}
              >
                Save Advance
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateAdvances);
