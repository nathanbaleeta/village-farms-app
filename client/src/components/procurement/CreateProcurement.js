import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});

class CreateProcurement extends React.Component {
  constructor() {
    super();
    this.state = {
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: ""
    };
  }

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
      .ref("procurement/-LZUABJm0f5vqmasA9qy");

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
          <Typography component="h1" variant="h4" align="center">
            Add Procurement
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="advanceBalance"
                name="advanceBalance"
                value={advanceBalance}
                onChange={this.onChange}
                label="Advance Balance"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="cashAvalaibletoday"
                name="cashAvalaibletoday"
                value={cashAvailabletoday}
                onChange={this.onChange}
                label="Is cash avalaible today"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="coffeeType"
                name="coffeeType"
                value={coffeeType}
                onChange={this.onChange}
                label="Coffee Type"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="pricePerKg"
                name="pricePerKg"
                value={pricePerKg}
                onChange={this.onChange}
                label="Price Per Kg"
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
