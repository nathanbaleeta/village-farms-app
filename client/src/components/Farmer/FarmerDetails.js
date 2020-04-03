import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { Link } from "react-router-dom";

import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PhoneIcon from "@material-ui/icons/Phone";

import FavoriteIcon from "@material-ui/icons/Favorite";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import CakeOutlinedIcon from "@material-ui/icons/CakeOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import DeleteIcon from "@material-ui/icons/Delete";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

import LandscapeIcon from "@material-ui/icons/Landscape";
import NatureIcon from "@material-ui/icons/Nature";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";

import CreateProcurement from "../procurement/CreateProcurement";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import CreateAdvance from "../advances/CreateAdvance";

import firebase from "../common/firebase";
import numeral from "numeral";

import { titles } from "../common/titleList";
import { genders } from "../common/genderList";
import { maritalStatuses } from "../common/maritalStatusList";
import { mmOptions } from "../common/mobileMoneyOptions";
import { mmPayments } from "../common/mobileMoneyPayments";
import { lookup } from "../common/traditionalAuthorityList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    flexGrow: 1
  },

  smallAvatar: {
    width: 60,
    height: 60
  },
  bigAvatar: {
    width: 220,
    height: 220,
    margin: "auto"
  },
  fab: {
    margin: theme.spacing.unit
  },

  tableRoot: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class FarmerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstname: "",
      lastname: "",
      title: "",
      sex: "",
      maritalStatus: "",
      phone: "",
      mmRegistered: "",
      mmPayment: "",
      traditionalAuthority: "",
      district: "",
      yearOpened: "",
      year1: "",
      year2: "",
      year3: "",
      immatureTrees: "",
      acreage: "",
      passport_photo: "",
      url: "",
      progress: 0,

      // Dashboard registration summary
      value: 0,
      males: 0,
      females: 0,

      // Procurement create
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      weight: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",

      districts: [],

      dataValue: "Chitipa",

      // Farmer dialog settings
      show: false,

      // Procurement edit & listing
      procurementData: [],
      advanceCounter: "",

      // Advances edit & listing
      advancesData: [],

      // Advance dialog settings
      isVisible: false,

      // Editing settings
      isEditing: false
    };
  }

  componentDidMount() {
    this.populateDistricts();

    const key = this.props.match.params.id;
    //console.log(key);
    /********************** Retrieve advance balance *********************/
    const advanceRef = firebase
      .database()
      .ref(`advances/${key}`)
      .orderByKey();
    advanceRef.on("value", snapshot => {
      let advanceCounter = 0;
      //console.log(advanceCounter);
      snapshot.forEach(function(childSnapshot) {
        // Mature trees counter; convert string to int
        advanceCounter =
          advanceCounter + parseInt(childSnapshot.child("advanceAmount").val());
        //console.log(advanceCounter);
      });
      this.setState({
        advanceCounter: advanceCounter
      });

      //console.log(this.state.advanceCounter);
    });
    /********************** Retrieve advance balance *********************/

    // Farmer procurement data.
    const procurementRef = firebase.database().ref(`procurement/${key}`);
    procurementRef.on("value", snapshot => {
      let procurementInfo = {};
      let newState = [];
      let advanceBalance = this.state.advanceCounter;
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var p = childSnapshot.val();
        //console.log(childSnapshot.key);

        procurementInfo = {
          id: childSnapshot.key,
          advanceBalance: advanceBalance,
          cashAvailabletoday: p.cashAvailabletoday,
          coffeeType: p.coffeeType,
          pricePerKg: p.pricePerKg,
          todayValueSale: p.todayValueSale,
          valueOfSaleLiability: p.valueOfSaleLiability,
          weight: p.weight,
          payNow: p.payNow,
          amountPaid: p.amountPaid,
          outstandingBalance: p.outstandingBalance
        };
        // Add procurement objecet to array
        newState.push(procurementInfo);
      });
      this.setState({
        procurementData: newState
      });

      //console.log(this.state.procurementData);
    });

    // Farmer advances data.
    const advancesRef = firebase.database().ref(`advances/${key}`);
    advancesRef.on("value", snapshot => {
      let advanceInfo = {};
      let newState = [];
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var a = childSnapshot.val();
        //console.log(childSnapshot.key);

        advanceInfo = {
          advanceID: childSnapshot.key,
          advanceType: a.advanceType,
          advanceAmount: a.advanceAmount,
          commodityAdvanced: a.commodityAdvanced,
          commodityValue: a.commodityValue,
          paymentMode: a.paymentMode,
          pricePerKg: a.pricePerKg,
          totalCoffeeWeight: a.totalCoffeeWeight
        };
        // Add advance object to array
        newState.push(advanceInfo);
      });
      this.setState({
        advancesData: newState
      });

      //console.log(this.state.advancesData);
    });

    // Farmer registration data.
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef.on("value", snapshot => {
      // handle read data.
      const firstname = snapshot.child("firstname").val();
      const lastname = snapshot.child("lastname").val();
      const title = snapshot.child("title").val();
      const sex = snapshot.child("sex").val();
      const maritalStatus = snapshot.child("maritalStatus").val();

      const phone = snapshot.child("phone").val();
      const mmRegistered = snapshot.child("mmRegistered").val();
      const mmPayment = snapshot.child("mmPayment").val();

      const traditionalAuthority = snapshot.child("traditionalAuthority").val();
      const district = snapshot.child("district").val();

      const yearOpened = snapshot.child("yearOpened").val();
      const year1 = snapshot.child("year1").val();
      const year2 = snapshot.child("year2").val();
      const year3 = snapshot.child("year3").val();
      const acreage = snapshot.child("acreage").val();

      const url = snapshot.child("url").val();

      this.setState({
        id: key,
        firstname: firstname,
        lastname: lastname,
        title: title,
        sex: sex,
        maritalStatus: maritalStatus,
        phone: phone,
        mmRegistered: mmRegistered,
        mmPayment: mmPayment,
        traditionalAuthority: traditionalAuthority,
        district: district,
        yearOpened: yearOpened,
        year1: year1,
        year2: year2,
        year3: year3,
        acreage: acreage,
        url: url,

        //Dialog box
        open: false
      });
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

  onEdit = e => {
    this.setState({
      isEditing: true
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleVisible = () => {
    this.setState({ isVisible: true });
  };

  handleInVisible = () => {
    this.setState({ isVisible: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,

      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      weight: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: ""
    });
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeTodayValueSale = () => {
    this.setState({
      todayValueSale: this.state.pricePerKg * this.state.weight
    });
  };

  onDeleteAdvance = row => {
    //console.log(row.advanceID);

    firebase
      .database()
      .ref("advances")
      .child(this.props.match.params.id)
      .child(row.advanceID)
      .remove();
  };

  openDialog = () => {
    this.setState({ show: true });
  };

  closeDialog = () => {
    this.setState({ show: false });
  };

  updateFarmer(id) {
    console.log(id);

    this.openDialog();
  }

  onSaveFarmer = event => {
    event.preventDefault();

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
      acreage: !this.state.acreage ? 0 : this.removeCommas(this.state.acreage)
    };

    //Update farmer module
    const key = this.state.id;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef
      .update(farmer)
      .then(function() {
        console.log("Synchronization succeeded");
        console.log(this.state);
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // remove commas before saving to firebase
  removeCommas = num => {
    //Convert number to string before attempting string manipulation
    let str = num.toString();

    // Check if string contains comma before attempting to sanitize
    let result = str.includes(",") ? str.replace(/,/g, "") : str;
    return Number(result);
  };

  onChangePhoto(e) {
    e.preventDefault();

    // Save image in variable
    const file = e.target.files[0];

    // create a random id
    const randomId = Math.random()
      .toString(36)
      .substring(2);

    // Upload passport photo to firebase
    const uploadTask = firebase
      .storage()
      .ref(`/passport-photos/${randomId}`)
      .put(file);

    uploadTask
      .then(snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress)
        //this.setState({ progress });
        return snapshot.ref.getDownloadURL();
      })
      .then(url => {
        this.setState({ url: url });
        //Update farmer URL
        const key = this.state.id;
        firebase
          .database()
          .ref(`farmers/${key}/url`)
          .set(url);
      });
  }

  render() {
    const { classes } = this.props;
    const { districts, dataValue, value } = this.state;

    const tradAuthorities = lookup[dataValue];

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Paper square className={classes.root} elevation="0">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="default"
              >
                <Tab
                  icon={<PersonIcon />}
                  label="PROFILE"
                  style={{
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                />
                <Tab
                  icon={<ShoppingBasketIcon />}
                  label="PROCUREMENTS"
                  style={{
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                />
                <Tab
                  icon={<PaymentIcon />}
                  label="ADVANCES"
                  style={{
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                />
                {/* <Tab icon={<PollIcon />} label="REPORTS" /> */}
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Grid container spacing={4}>
                    <Grid item lg={3} sm={6} xs={12}>
                      <Fragment>
                        <input
                          color="primary"
                          accept="image/*"
                          type="file"
                          onChange={e => this.onChangePhoto(e)}
                          id="icon-button-file"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="icon-button-file">
                          <Avatar
                            alt="Profile photo"
                            src={
                              this.state.url || "/static/images/avatar/1.png"
                            }
                            className={classes.bigAvatar}
                          />
                        </label>
                      </Fragment>

                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        color="primary"
                        align="center"
                      >
                        <Link
                          to="#"
                          style={{
                            color: "darkblue",
                            textDecoration: "none",
                            fontSize: 13
                          }}
                        >
                          Tap photo to change
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={9} sm={12} xs={12}>
                          <Typography
                            variant="h3"
                            component="h4"
                            style={{
                              fontWeight: "normal",
                              color: "midnightblue"
                            }}
                          >
                            {this.state.title}.{" "}
                            {this.state.firstname + " " + this.state.lastname}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} sm={12} xs={12}>
                          <br />
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={this.updateFarmer.bind(
                              this,
                              this.state.id
                            )}
                          >
                            Edit Farmer
                          </Button>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item lg={1} sm={2} xs={2}>
                          <WcOutlinedIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {this.state.sex}
                          </Typography>
                        </Grid>
                        <br />
                        <Grid item lg={1} sm={2} xs={2}>
                          <FavoriteIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {this.state.maritalStatus}
                          </Typography>
                        </Grid>
                        <br />

                        <Grid item lg={1} sm={2} xs={2}>
                          <PhoneIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {this.state.phone}
                          </Typography>
                        </Grid>
                        <br />

                        <Grid item lg={1} sm={2} xs={2}>
                          <RoomOutlinedIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            Lives in {this.state.traditionalAuthority},{" "}
                            {this.state.district}
                          </Typography>
                        </Grid>
                        <br />

                        <Grid item lg={1} sm={2} xs={2}>
                          <CakeOutlinedIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            Farm opened in {this.state.yearOpened}
                          </Typography>
                        </Grid>
                        <br />
                      </Grid>

                      <Divider />
                      <br />
                      <Grid container spacing={2}>
                        <Grid item lg={1} sm={2} xs={2}>
                          <LandscapeIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {this.state.acreage} acres
                          </Typography>
                        </Grid>
                        <Grid item lg={1} sm={2} xs={2}>
                          <NatureIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {numeral(this.state.year1).format("0,0[.]00")} below
                            1 year
                          </Typography>
                        </Grid>

                        <Grid item lg={1} sm={2} xs={2}>
                          <NatureIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {numeral(this.state.year2).format("0,0[.]00")} at 2
                            years
                          </Typography>
                        </Grid>

                        <Grid item lg={1} sm={2} xs={2}>
                          <NatureIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            {numeral(this.state.year3).format("0,0[.]00")} at 3
                            years
                          </Typography>
                        </Grid>
                      </Grid>

                      <Divider />
                      <br />
                      <Grid container spacing={2}>
                        <Grid item lg={1} sm={2} xs={2}>
                          <PaymentOutlinedIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            MM Registered{" "}
                            <Switch
                              checked={
                                this.state.mmRegistered === "Yes" ? true : false
                              }
                              inputProps={{
                                "aria-label": "secondary checkbox"
                              }}
                            />
                          </Typography>
                        </Grid>

                        <br />
                        <Grid item lg={1} sm={2} xs={2}>
                          <PaymentOutlinedIcon />
                        </Grid>
                        <Grid item lg={11} sm={10} xs={10}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            align="left"
                            style={{ color: "midnightblue" }}
                          >
                            MM Payments{" "}
                            <Switch
                              checked={
                                this.state.mmPayment === "Yes" ? true : false
                              }
                              inputProps={{
                                "aria-label": "secondary checkbox"
                              }}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Fab
                    color="primary"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleOpen.bind(this)}
                    style={{
                      backgroundColor: "#FFBF00",
                      color: "black"
                    }}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Procurement
                  </Fab>
                  <br />
                  {/* Procurement details for farmer*/}
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
                            Advance balance
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
                            Cash available today
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
                            Coffee type
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
                            Price per Kg
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
                            Total value sale
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
                            Pay now
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
                            Amount paid
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
                            Outstanding balance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.procurementData.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.advanceBalance}
                            </TableCell>
                            <TableCell align="left">
                              {row.cashAvailabletoday}
                            </TableCell>

                            <TableCell align="left">{row.coffeeType}</TableCell>
                            <TableCell align="left">{row.pricePerKg}</TableCell>
                            <TableCell align="left">
                              {row.totalValueSale}
                            </TableCell>
                            <TableCell align="left">{row.payNow}</TableCell>
                            <TableCell align="left">{row.amountPaid}</TableCell>
                            <TableCell align="left">
                              {row.outstandingBalance}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>

                  {/* Procurement details for farmer*/}
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <Fab
                    color="default"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleVisible.bind(this)}
                    style={{
                      backgroundColor: "#FFBF00",
                      color: "black"
                    }}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Advance
                  </Fab>
                  <br />

                  {/* Farmer Advances listings */}
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
                            Advance type
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
                            Advance amount
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
                            Commodity
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
                            Commodity Value
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
                            Mode of payment
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
                            Total Coffee Weight
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
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.advancesData.map(row => (
                          <TableRow key={row.id}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {row.advanceType}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {numeral(row.advanceAmount).format("0,0[.]00")}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {row.commodityAdvanced}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {numeral(row.commodityValue).format("0,0[.]00")}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {row.paymentMode}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {numeral(row.pricePerKg).format("0,0[.]00")}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              {numeral(row.totalCoffeeWeight).format(
                                "0,0[.]00"
                              )}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                color: "black",
                                fontSize: 16
                              }}
                            >
                              <Typography
                                variant="subheading"
                                align="center"
                                color="default"
                              >
                                <DeleteIcon
                                  onClick={this.onDeleteAdvance.bind(this, row)}
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                  {/* Farmer Advances listings*/}
                  <br />
                </TabContainer>
              )}
              {value === 3 && <TabContainer />}
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Farmer Dialog */}

        <Dialog
          id="myDialog"
          maxWidth="sm"
          open={this.state.show}
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
              backgroundColor: "white",
              color: "black",
              borderBottom: "2px solid midnightblue"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "midnightblue" }}
            >
              Edit Farmer
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.onSaveFarmer}>
              <Typography variant="h5" gutterBottom>
                Autobiography
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    label="Firstname"
                    fullWidth
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    label="Lastname"
                    fullWidth
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="title"
                    select
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    label="Title*"
                    fullWidth
                    helperText="Please select title"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {titles.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="sex"
                    select
                    name="sex"
                    value={this.state.sex}
                    onChange={this.onChange}
                    label="Sex*"
                    fullWidth
                    helperText="Please select gender"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {genders.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    id="maritalStatus"
                    select
                    name="maritalStatus"
                    value={this.state.maritalStatus}
                    onChange={this.onChange}
                    label="Marital Status*"
                    fullWidth
                    helperText="Please select marital status"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {maritalStatuses.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        style={{
                          zoom: "70%"
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <InputMask
                    mask="265999999999"
                    value={this.state.phone}
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
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  </InputMask>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    id="mmRegistered"
                    select
                    name="mmRegistered"
                    value={this.state.mmRegistered}
                    onChange={this.onChange}
                    label="Mobile Money Registered*"
                    fullWidth
                    helperText="Please select option"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {mmOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="mmPayment"
                    select
                    name="mmPayment"
                    value={this.state.mmPayment}
                    onChange={this.onChange}
                    label="Receive payments on MM*"
                    fullWidth
                    helperText="Please select option"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {mmPayments.map(option => (
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
                    value={this.state.district}
                    onChange={this.onChangeDistrict}
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
                <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="traditionalAuthority"
                    name="traditionalAuthority"
                    value={this.state.traditionalAuthority}
                    select
                    onChange={this.onChange}
                    label="Traditional Authority"
                    fullWidth
                    helperText="Please select Traditional Authority"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {tradAuthorities.map(ta => (
                      <MenuItem key={ta.id} value={ta.text}>
                        {ta.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant="h5" gutterBottom>
                    Farm History and Status
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      //margin="normal"
                      id="date-picker-dialog"
                      label="Year Farm opened"
                      format="dd-MM-yyyy"
                      fullWidth
                      value={this.state.yearOpened}
                      defaultValue="dd-MM-yyyy"
                      onChange={this.handleDateChange}
                      maxDate={new Date(Date.now() - 7776000000)} // Disables dates less than 3 months
                      InputLabelProps={{
                        shrink: true
                      }}

                      //InputAdornmentProps={{ position: "end" }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year1}
                    thousandSeparator={true}
                    onValueChange={values => {
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
                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year2}
                    thousandSeparator={true}
                    onValueChange={values => {
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

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.year3}
                    thousandSeparator={true}
                    onValueChange={values => {
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

                <Grid item xs={6} sm={6}>
                  <NumberFormat
                    value={this.state.acreage}
                    thousandSeparator={true}
                    onValueChange={values => {
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

                <Grid item xs={12} sm={12}>
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    color="primary"
                    //className={classes.updateFarmerButton}
                  >
                    Update Farmer
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Farmer Dialog */}

        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
          style={{
            zoom: "80%"
          }}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "white",
              borderBottom: "2px solid midnightblue"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "midnightblue" }}
            >
              Add Procurement
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateProcurement id={this.state.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          id="advanceDialog"
          open={this.state.isVisible}
          aria-labelledby="form-dialog-title"
          onClose={this.handleInVisible}
          style={{
            zoom: "80%"
          }}
        >
          <DialogTitle
            id="simple-dialog-title1"
            color="default"
            style={{
              backgroundColor: "white",
              borderBottom: "2px solid midnightblue"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "midnightblue" }}
            >
              Create Advance
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateAdvance id={this.state.id} district={this.state.district} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleInVisible} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FarmerDetails);
