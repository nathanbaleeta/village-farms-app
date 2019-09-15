import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({
  saveSalesButton: {
    //background: "mediumblue"
    background: "orange"
  }
});

const goods = [
  {
    value: "Coffee",
    label: "Coffee"
  },
  {
    value: "Bananas",
    label: "Bananas"
  },
  {
    value: "Vegetables",
    label: "Vegetables"
  },
  {
    value: "Pigs",
    label: "Pigs"
  },
  {
    value: "Chickens",
    label: "Chickens"
  }
];

class CreateSale extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      goodsPurchased: "",
      phone: "",
      unitPrice: "",
      quantity: "",
      totalPrice: ""
    };
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCalculateTotalPrice = () => {
    this.setState({
      totalPrice: this.state.quantity * this.state.unitPrice
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const sale = {
      firstname: this.capitalize(this.state.firstname),
      lastname: this.capitalize(this.state.lastname),
      address: this.state.address,
      goodsPurchased: this.state.goodsPurchased,
      phone: this.state.phone,
      unitPrice: parseInt(this.state.unitPrice),
      quantity: parseInt(this.state.quantity),
      totalPrice: parseInt(this.state.totalPrice),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    //Save sale record
    const salesRef = firebase.database().ref("sales");

    salesRef.push(sale);
    this.setState({
      firstname: "",
      lastname: "",
      address: "",
      goodsPurchased: "",
      phone: "",
      unitPrice: "",
      quantity: "",
      totalPrice: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      address,
      goodsPurchased,
      phone,
      unitPrice,
      quantity,
      totalPrice
    } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <br />
          <Typography variant="h5" gutterBottom>
            Sales record
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={this.onChange}
                label="Firstname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={this.onChange}
                label="Lastname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                multiline
                rowsMax="4"
                fullWidth
                helperText="Press enter to achieve multiple lines"
                value={address}
                onChange={this.onChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="goodsPurchased"
                select
                name="goodsPurchased"
                value={goodsPurchased}
                onChange={this.onChange}
                label="Goods purchased*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {goods.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <InputMask
                mask="(+265) 999 999 999"
                value={phone}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    helperText="For example: 772 123 456"
                    autoComplete="phone"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="unitPrice"
                name="unitPrice"
                value={unitPrice}
                onChange={this.onChange}
                label="Unit Price"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={this.onChange}
                label="Quantity"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                onClick={this.handleCalculateTotalPrice}
                label="Total Price"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <br />
            <br />
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="secondary"
                className={classes.saveSalesButton}
              >
                Create Sale
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CreateSale);
