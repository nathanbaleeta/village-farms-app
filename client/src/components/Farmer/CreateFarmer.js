import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import NumberFormat from "react-number-format";

import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { districts } from "../common/districtList";
import { titles } from "../common/titleList";
import { genders } from "../common/genderList";
import { maritalStatuses } from "../common/maritalStatusList";
import { mmOptions } from "../common/mobileMoneyOptions";
import { mmPayments } from "../common/mobileMoneyPayments";
import { lookup } from "../common/traditionalAuthorityList";
import firebase from "../common/firebase";

const styles = (theme) => ({
  saveFarmerButton: {
    background: "midnightblue",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",
      yearOpened: "",
      year1: "",
      year2: "",
      year3: "",
      acreage: "",

      //districts: [],

      dataValue: "Chitipa",

      //errors
      errors: [],
      show: "none",
    };
  }

  componentDidMount() {
    //this.populateDistricts();
  }

  /* populateDistricts = () => {
    const districtsRef = firebase.database().ref("settings").child("districts");

    districtsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          district: items[item].district,
        });
      }

      //console.log(newState);
      this.setState({
        districts: newState,
      });
      //console.log(this.state.districts);
    });
  }; */

  toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // remove commas before saving to firebase
  removeCommas = (num) => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  onChangeDistrict = (e) => {
    this.setState({
      dataValue: e.target.value,
      district: e.target.value,
      traditionalAuthority: "",
    });
    console.log(e.target.value);
  };

  handleDateChange = (date) => {
    this.setState({
      yearOpened: date.toISOString().substr(0, 10), // trim timestamp using regular expression
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openAlert = () => {
    this.setState({ show: "block" });
  };

  closeAlert = () => {
    this.setState({ show: "none" });
  };

  onValidate = (
    firstname,
    lastname,
    title,
    sex,
    maritalStatus,
    phone,
    mmRegistered,
    mmPayment,
    district,
    traditionalAuthority,
    yearOpened,
    acreage,
    year1,
    year2,
    year3
  ) => {
    // Store errors for all fields in an array
    const errors = [];

    if (firstname === "") {
      errors.push("Firstname is required");
    }
    if (lastname === "") {
      errors.push("Lastname is required");
    }
    if (title === "") {
      errors.push("Title is required");
    }
    if (sex === "") {
      errors.push("Gender is required");
    }
    if (maritalStatus === "") {
      errors.push("Marital status is required");
    }
    if (phone === "") {
      errors.push("Phone is required");
    }
    if (mmRegistered === "") {
      errors.push("Mobile Money registered field is required");
    }
    if (mmPayment === "") {
      errors.push("Mobile Money Payments field is required");
    }
    if (district === "") {
      errors.push("District is required");
    }
    if (traditionalAuthority === "") {
      errors.push("Traditional authority is required");
    }
    if (yearOpened === "") {
      errors.push("Date opened is required");
    }
    if (acreage === "") {
      errors.push("Acreage is required");
    }
    if (year1 === "") {
      errors.push("Year 1 tree count is required");
    }
    if (year2 === "") {
      errors.push("Year 2 tree count is required");
    }
    if (year3 === "") {
      errors.push("Year 3 tree count is required");
    }

    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.onValidate(
      this.state.firstname,
      this.state.lastname,
      this.state.title,
      this.state.sex,
      this.state.maritalStatus,
      this.state.phone,
      this.state.mmRegistered,
      this.state.mmPayment,
      this.state.district,
      this.state.traditionalAuthority,
      this.yearOpened,
      this.state.acreage,
      this.state.year1,
      this.state.year2,
      this.state.year3
    );
    if (errors.length > 0) {
      this.setState({ errors });
      this.openAlert();
      return;
    } else {
      // Clear error stack if no errors; then hide error alert box
      this.setState({ errors: [], show: "none" });
    }

    // get our form data out of state
    const farmer = {
      firstname: this.toTitleCase(this.state.firstname),
      lastname: this.toTitleCase(this.state.lastname),
      title: this.state.title,
      sex: this.state.sex,
      maritalStatus: this.state.maritalStatus,
      phone: this.state.phone,
      mmRegistered: this.state.mmRegistered,
      mmPayment: this.state.mmPayment,
      district: this.state.district,
      traditionalAuthority: this.state.traditionalAuthority,
      yearOpened: this.state.yearOpened,
      year1: !this.state.year1 ? 0 : this.removeCommas(this.state.year1),
      year2: !this.state.year2 ? 0 : this.removeCommas(this.state.year2),
      year3: !this.state.year3 ? 0 : this.removeCommas(this.state.year3),
      acreage: !this.state.acreage ? 0 : this.removeCommas(this.state.acreage),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo",
      }),
    };

    console.log(farmer);

    //Save farmer module
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.push(farmer);
    this.setState({
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      district: "",
      traditionalAuthority: "",

      yearOpened: "",
      year1: "",
      year2: "",
      year3: "",
      acreage: "",
    });
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      title,
      sex,
      maritalStatus,
      phone,
      mmRegistered,
      mmPayment,
      district,
      traditionalAuthority,
      yearOpened,
      year1,
      year2,
      year3,
      acreage,
      //districts,
    } = this.state;

    const { dataValue, errors } = this.state;
    const options = lookup[dataValue];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            Autobiography
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6} sm={6}>
              <TextField
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={this.onChange}
                label="Firstname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item lg={6} sm={6}>
              <TextField
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={this.onChange}
                label="Lastname"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item lg={6} sm={6}>
              <TextField
                id="title"
                select
                name="title"
                value={title}
                onChange={this.onChange}
                label="Title*"
                fullWidth
                helperText="Please select title"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {titles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6} sm={6}>
              <TextField
                id="sex"
                select
                name="sex"
                value={sex}
                onChange={this.onChange}
                label="Sex*"
                fullWidth
                helperText="Please select gender"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6} sm={6}>
              <TextField
                id="maritalStatus"
                select
                name="maritalStatus"
                value={maritalStatus}
                onChange={this.onChange}
                label="Marital Status*"
                fullWidth
                helperText="Please select marital status"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {maritalStatuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6} sm={6}>
              <InputMask
                required
                mask="265999999999"
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
            <Grid item lg={6} sm={6}>
              <TextField
                id="mmRegistered"
                select
                name="mmRegistered"
                value={mmRegistered}
                onChange={this.onChange}
                label="Mobile Money Registered*"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {mmOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6} sm={6}>
              <TextField
                required
                id="mmPayment"
                select
                name="mmPayment"
                value={mmPayment}
                onChange={this.onChange}
                label="Receive payments on MM"
                fullWidth
                helperText="Please select option"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {mmPayments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="district"
                select
                name="district"
                value={district}
                onChange={this.onChangeDistrict}
                label="District"
                fullWidth
                helperText="Please select district"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {districts.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="traditionalAuthority"
                select
                name="traditionalAuthority"
                value={traditionalAuthority}
                onChange={this.onChange}
                label="Traditional Authority"
                fullWidth
                helperText="Please select Traditional Authority"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.text}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <br />
              <Typography variant="h5" gutterBottom>
                Farm History and Status
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  //margin="normal"
                  //id="date-picker-dialog"
                  label="Year Farm opened"
                  format="dd-MM-yyyy"
                  fullWidth
                  value={yearOpened}
                  //defaultValue="dd-MM-yyyy"
                  customInput={TextField}
                  onChange={this.handleDateChange}
                  maxDate={Date.now() - 7776000000} // Disables dates less than 3 months
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputAdornmentProps={{ position: "end" }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} sm={6}>
              <NumberFormat
                value={acreage}
                thousandSeparator={true}
                onValueChange={(values) => {
                  const { formattedValue } = values;

                  this.setState({ acreage: formattedValue });
                }}
                customInput={TextField}
                label="Acreage under cultivation"
                helperText="(Enter in Acres)"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item lg={4} sm={6}>
              <NumberFormat
                value={year1}
                thousandSeparator={true}
                onValueChange={(values) => {
                  const { formattedValue } = values;

                  this.setState({ year1: formattedValue });
                }}
                customInput={TextField}
                label="Year 1"
                helperText="Tree count which are 1 year"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item lg={4} sm={6}>
              <NumberFormat
                value={year2}
                thousandSeparator={true}
                onValueChange={(values) => {
                  const { formattedValue } = values;

                  this.setState({ year2: formattedValue });
                }}
                customInput={TextField}
                label="Year 2"
                helperText="Tree count which are 2 years"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item lg={4} sm={6}>
              <NumberFormat
                value={year3}
                thousandSeparator={true}
                onValueChange={(values) => {
                  const { formattedValue } = values;

                  this.setState({ year3: formattedValue });
                }}
                customInput={TextField}
                label="Year 3"
                helperText="Tree count above 3 years"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item lg={12} sm={12}>
              <br />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                className={classes.saveFarmerButton}
              >
                Save Farmer
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFarmer);
