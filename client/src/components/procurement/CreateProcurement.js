import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MenuItem from "@material-ui/core/MenuItem";

import firebase from "../common/firebase";

const styles = theme => ({});

const coffeeTypes = [
  {
    value: "Cherry",
    label: "Cherry"
  },
  {
    value: "Parchment",
    label: "Parchment"
  },
  {
    value: "Mbuni",
    label: "Mbuni"
  }
];

const cashAvailability = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];
class CreateProcurement extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: ""
    };
  }

  componentDidMount() {}

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const procurement = {
      advanceBalance: this.state.advanceBalance,
      cashAvailabletoday: this.state.cashAvailabletoday,
      coffeeType: this.state.coffeeType,
      pricePerKg: this.state.pricePerKg,
      todayValueSale: this.state.todayValueSale,
      valueOfSaleLiability: this.state.valueOfSaleLiability,
      weight: this.state.weight
    };

    //Save farmer module
    const procurementRef = firebase
      .database()
      .ref("procurement/-LbT3BAlIMK18oBJSnZl");

    procurementRef.push(procurement);
    this.setState({
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: ""
    });
  };

  render() {
    const {
      advanceBalance,
      cashAvailabletoday,
      coffeeType,
      pricePerKg,
      todayValueSale,
      valueOfSaleLiability,
      weight
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <br />

          <Grid container spacing={24}>
            <Typography variant="body1" gutterBottom align="left">
              {this.state.id}
            </Typography>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="advanceBalance"
                name="advanceBalance"
                value={advanceBalance}
                onChange={this.onChange}
                label="Advance Balance"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                id="cashAvailabletoday"
                select
                name="cashAvailabletoday"
                value={cashAvailabletoday}
                onChange={this.onChange}
                label="Cash available today?*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {cashAvailability.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                id="coffeeType"
                select
                name="coffeeType"
                value={coffeeType}
                onChange={this.onChange}
                label="Coffee type*"
                fullWidth
                helperText="Please select coffee type"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {coffeeTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="pricePerKg"
                name="pricePerKg"
                value={pricePerKg}
                onChange={this.onChange}
                label="Price Per Kg"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="todayValueSale"
                name="todayValueSale"
                value={todayValueSale}
                onChange={this.onChange}
                label="Today Value Sale"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="valueOfSaleLiability"
                name="valueOfSaleLiability"
                value={valueOfSaleLiability}
                onChange={this.onChange}
                label="Value of sale liability"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="weight"
                name="weight"
                value={weight}
                onChange={this.onChange}
                label="Weight"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Add Procurement
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateProcurement);
