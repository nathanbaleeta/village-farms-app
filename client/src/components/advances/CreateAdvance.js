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
      pricePerKg: "",
      totalCoffeeWeight: "",

      // inputValues
      amount: false,
      commodity: false
    };
  }

  componentWillMount() {
    // targetID retrieved from another component using onClick event listener
    console.log(this.props.id);
  }

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
      this.handleCashInput();
      this.setState({ [event.target.name]: event.target.value });
    } else {
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

  handleSubmit = event => {
    event.preventDefault();

    // target ID retrieved from another component using onClick event listener
    const key = this.props.id;

    // get our form data out of state
    const advance = {
      advanceType: this.state.advanceType,
      advanceAmount: this.isEmpty(this.state.advanceAmount)
        ? 0
        : this.removeCommas(this.state.advanceAmount),
      //advanceAmount: this.state.advanceAmount,
      commodityAdvanced: this.state.commodityAdvanced,

      commodityValue: this.state.commodityValue,
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
                value={this.state.advanceAmount}
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

                  this.setState({ commodityValue: floatValue });
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
                value={pricePerKg}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={values => {
                  const { floatValue } = values;
                  this.setState({
                    pricePerKg: floatValue,
                    totalCoffeeWeight: advanceAmount / floatValue
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
