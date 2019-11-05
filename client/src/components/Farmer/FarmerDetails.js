import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//import { Link } from "react-router-dom";

import firebase from "../common/firebase";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PhoneIcon from "@material-ui/icons/Phone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import CakeOutlinedIcon from "@material-ui/icons/CakeOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PollIcon from "@material-ui/icons/Poll";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import NatureOutlinedIcon from "@material-ui/icons/NatureOutlined";
import HourglassEmptySharpIcon from "@material-ui/icons/HourglassEmptySharp";
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

import CreateAdvance from "../advances/CreateAdvance";

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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,

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
    marginTop: theme.spacing.unit * 3,
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

      // Procurement edit & listing
      procurementData: [],
      advanceCounter: "",

      // Advances edit & listing
      advancesData: [],

      // Advance dialog settings
      isVisible: false
    };
  }

  componentDidMount() {
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

      console.log(this.state.advanceCounter);
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

        //Dialog box
        open: false
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleVisible = () => {
    this.setState({ isVisible: true });
  };

  handleInVisible = () => {
    this.setState({ isVisible: false });
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

  handleSubmit = event => {};

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Paper square className={classes.root} elevation="1">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<PersonIcon />} label="PROFILE" />
                <Tab icon={<PhoneIcon />} label="PROCUREMENTS" />
                <Tab icon={<FavoriteIcon />} label="ADVANCES" />
                <Tab icon={<PollIcon />} label="REPORTS" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sm={3}>
                      <br />
                      <Avatar
                        alt="Avatar icon"
                        src="/static/images/avatar/1.png"
                        className={classes.bigAvatar}
                      />
                    </Grid>
                    <Grid item xs={9} sm={9}>
                      <br />
                      <Typography
                        variant="h3"
                        component="h4"
                        style={{ fontWeight: "bold" }}
                      >
                        {this.state.title}.{" "}
                        {this.state.firstname + " " + this.state.lastname}
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <WcOutlinedIcon /> &nbsp;&nbsp; {this.state.sex}
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <AccountCircleIcon /> &nbsp;&nbsp;{" "}
                        {this.state.maritalStatus}
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <PhoneIcon /> &nbsp;&nbsp; {this.state.phone}
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <RoomOutlinedIcon /> &nbsp;&nbsp; Lives in{" "}
                        {this.state.traditionalAuthority}, {this.state.district}
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <CakeOutlinedIcon /> &nbsp;&nbsp; Farm opened in{" "}
                        <b>{this.state.yearOpened}</b>
                      </Typography>
                      <br />
                      <Divider />
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <NatureOutlinedIcon /> &nbsp;&nbsp; Acreage{" "}
                        <b>{this.state.acreage}</b>
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <HourglassEmptySharpIcon /> &nbsp;&nbsp; Year1{" "}
                        &nbsp;&nbsp;
                        <b>{this.state.year1}</b>
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <HourglassEmptySharpIcon /> &nbsp;&nbsp; Year2{" "}
                        &nbsp;&nbsp;
                        <b>{this.state.year2}</b>
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <HourglassEmptySharpIcon /> &nbsp;&nbsp; Year3{" "}
                        &nbsp;&nbsp;
                        <b>{this.state.year3}</b>
                      </Typography>
                      <br />
                      <Divider />
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <PaymentOutlinedIcon /> &nbsp;&nbsp; Mobile Money
                        Registered &nbsp;&nbsp;
                        <b>{this.state.mmRegistered}</b>
                      </Typography>
                      <br />
                      <Typography variant="h6" gutterBottom align="left">
                        <PaymentOutlinedIcon /> &nbsp;&nbsp; Mobile Money
                        Payments &nbsp;&nbsp;
                        <b>{this.state.mmPayment}</b>
                      </Typography>
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
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Procurement
                  </Fab>
                  <br />
                  <br />
                  <br />
                  {/* Procurement details for farmer*/}
                  <Paper className={classes.tableRoot}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Advance balance</TableCell>
                          <TableCell align="left">
                            Cash available today
                          </TableCell>
                          <TableCell align="left">Coffee type</TableCell>
                          <TableCell align="left">Price per Kg</TableCell>
                          <TableCell align="left">Total value sale</TableCell>
                          <TableCell align="left">Pay now</TableCell>
                          <TableCell align="left">Amount paid</TableCell>
                          <TableCell align="left">
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
                    color="primary"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleVisible.bind(this)}
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
                          <TableCell>Advance type</TableCell>
                          <TableCell align="left">Advance amount</TableCell>
                          <TableCell align="left">Commodity</TableCell>
                          <TableCell align="left">Mode of payment</TableCell>
                          <TableCell align="left">Price per kg</TableCell>
                          <TableCell align="left">
                            Total Coffee Weight
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.advancesData.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.advanceType}
                            </TableCell>
                            <TableCell align="left">
                              {row.advanceAmount}
                            </TableCell>
                            <TableCell align="left">
                              {row.commodityAdvanced}
                            </TableCell>
                            <TableCell align="left">
                              {row.paymentMode}
                            </TableCell>
                            <TableCell align="left">{row.pricePerKg}</TableCell>
                            <TableCell align="left">
                              {row.totalCoffeeWeight}
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

        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "mediumblue"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "white" }}
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
        >
          <DialogTitle
            id="simple-dialog-title1"
            color="default"
            style={{
              backgroundColor: "mediumblue"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "white" }}
            >
              Create Advance
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateAdvance id={this.state.id} />
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
