import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";

import firebase from "../common/firebase";

const styles = theme => ({});

const advanceTypes = [
  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Commodity",
    label: "Commodity"
  }
];

const commodities = [
  {
    value: "Seedlings",
    label: "Seedlings"
  },
  {
    value: "Fertilizer",
    label: "Fertilizer"
  },
  {
    value: "Chemicals",
    label: "Chemicals"
  },
  {
    value: "Polythene tubes",
    label: "Polythene tubes"
  }
];

const paymentModes = [
  {
    value: "Cash",
    label: "Cash"
  },
  {
    value: "Coffee",
    label: "Coffee"
  }
];
class CreateAdvances extends React.Component {
  constructor() {
    super();
    this.state = {
      advanceType: "",
      advanceAmount: "",
      commodityAdvanced: "",
      commodityValue: "",
      paymentMode: "",
      pricePerKg: 0,
      totalCoffeeWeight: "",

      // inputValues
      amount: false,
      commodity: false,

      //errors
      errors: []
    };
  }

  componentDidMount() {
    // targetID retrieved from another component using onClick event listener
    //console.log(this.props.id);

    //console.log(this.props.district);

    this.getPriceByDistrict();
  }

  // Retrieve price data from firebase
  getPriceByDistrict = () => {
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

      // Filter row which matches farmer district and generate resultset
      const resultset = newState.filter(row => {
        return row.district === this.props.district;
      });

      //console.log(resultset);

      resultset.length > 0
        ? this.setState({
            pricePerKg: resultset[0].pricePerKg
          })
        : this.setState({
            pricePerKg: 0
          });
    });
  };

  // remove commas before saving to firebase
  removeCommas = num => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  handleActivation = event => {
    if (event.target.value !== "Cash") {
      // Clear form before proceeding
      this.setState({
        advanceAmount: "",
        commodityAdvanced: "",
        commodityValue: "",
        paymentMode: "",
        totalCoffeeWeight: ""
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
        totalCoffeeWeight: ""
      });
      this.handleCommodityInput();
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleCashInput() {
    this.setState({
      amount: true,
      commodity: false
    });
  }
  handleCommodityInput() {
    this.setState({ amount: false, commodity: true });
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  // Check for empty fields
  isEmpty(value) {
    return value == null || value.length === 0;
  }

  // Validate input
  onValidate = (advanceType, paymentMode, pricePerKg, totalCoffeeWeight) => {
    // Store errors for all fields in a single array
    const errors = [];

    if (advanceType.length === 0) {
      errors.push("Advance type can't be empty");
    }
    if (paymentMode.length === 0) {
      errors.push("Payment mode can't be empty");
    }
    if (pricePerKg.length < 1) {
      errors.push("Price per Kg can't be empty");
    }
    if (totalCoffeeWeight.length < 1) {
      errors.push("Total coffee weight can't be empty");
    }

    return errors;
  };

  handleSubmit = event => {
    event.preventDefault();

    const errors = this.onValidate(
      this.state.advanceType,
      this.state.paymentMode,
      this.state.pricePerKg,
      this.state.totalCoffeeWeight
    );
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;

    // get our form data out of state
    const advance = {
      advanceType: this.state.advanceType,
      advanceAmount: this.isEmpty(this.state.advanceAmount)
        ? 0
        : this.removeCommas(this.state.advanceAmount),
      commodityAdvanced: this.state.commodityAdvanced,
      commodityValue: this.isEmpty(this.state.commodityValue)
        ? 0
        : this.removeCommas(this.state.commodityValue),
      //commodityValue: this.state.commodityValue,
      paymentMode: this.state.paymentMode,
      pricePerKg: this.removeCommas(this.state.pricePerKg),
      totalCoffeeWeight: this.removeCommas(this.state.totalCoffeeWeight),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
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
      totalCoffeeWeight: ""
    });
  };

  render() {
    const {
      advanceAmount,
      commodityValue,
      pricePerKg,
      totalCoffeeWeight
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom>
                Advances
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="advanceType"
                select
                name="advanceType"
                value={this.state.advanceType}
                onChange={event => this.handleActivation(event)}
                label="Advance type*"
                fullWidth
                helperText="Please select advance type"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {advanceTypes.map(option => (
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
                onValueChange={values => {
                  const { floatValue } = values;

                  this.setState({
                    advanceAmount: floatValue,
                    totalCoffeeWeight: floatValue / pricePerKg
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
                  shrink: true
                }}
              >
                {commodities.map(option => (
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
                onValueChange={values => {
                  const { floatValue } = values;

                  this.setState({
                    commodityValue: floatValue,
                    totalCoffeeWeight: floatValue / pricePerKg
                  });
                }}
                customInput={TextField}
                label="Commodity value"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
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
                  shrink: true
                }}
              >
                {paymentModes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <NumberFormat
                disabled={true}
                value={pricePerKg}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={values => {
                  const { floatValue } = values;
                  this.setState({
                    pricePerKg: floatValue,
                    totalCoffeeWeight:
                      (advanceAmount / floatValue) |
                      (commodityValue / floatValue)
                  });
                }}
                customInput={TextField}
                label="Price Per Kg"
                fullWidth
                margin="normal"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <NumberFormat
                disabled={true}
                value={totalCoffeeWeight}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={2}
                onValueChange={values => {
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
                style={{ background: "mediumblue" }}
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
