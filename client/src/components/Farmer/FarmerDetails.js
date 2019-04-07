import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

import firebase from "../common/firebase";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PollIcon from "@material-ui/icons/Poll";

import Advances from "./Advances";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  bigAvatar: {
    width: 60,
    height: 60
  },
  fab: {
    margin: theme.spacing.unit
  }
});

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
class FarmerDetails extends React.Component {
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
      village: "",
      district: "",
      yearOpened: "",
      matureTrees: "",
      immatureTrees: "",
      hectarage: "",

      value: 0,
      males: 0,
      females: 0,

      // Procurement create
      advanceBalance: "",
      cashAvailabletoday: "",
      coffeeType: "",
      pricePerKg: "",
      todayValueSale: "",
      valueOfSaleLiability: "",
      weight: "",

      // Procurement edit
      procurementData: []
    };
  }

  componentDidMount() {
    const key = this.props.match.params.id;

    // Farmer procurement data.
    const procurementRef = firebase.database().ref(`procurement/${key}`);
    procurementRef.on("value", snapshot => {
      let procurementInfo = {};
      let newState = [];
      snapshot.forEach(function(childSnapshot) {
        // handle read data.
        var p = childSnapshot.val();

        procurementInfo = {
          advanceBalance: p.advanceBalance,
          cashAvailabletoday: p.cashAvailabletoday,
          coffeeType: p.coffeeType,
          pricePerKg: p.pricePerKg,
          todayValueSale: p.todayValueSale,
          valueOfSaleLiability: p.valueOfSaleLiability,
          weight: p.weight
        };
        // Add procurement objecet to array
        newState.push(procurementInfo);
      });
      this.setState({
        procurementData: newState
      });

      console.log(this.state.procurementData);
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

      const village = snapshot.child("village").val();
      const traditionalAuthority = snapshot.child("traditionalAuthority").val();
      const district = snapshot.child("district").val();

      const yearOpened = snapshot.child("yearOpened").val();
      const matureTrees = snapshot.child("matureTrees").val();
      const immatureTrees = snapshot.child("immatureTrees").val();
      const hectarage = snapshot.child("hectarage").val();

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
        village: village,
        traditionalAuthority: traditionalAuthority,
        district: district,
        yearOpened: yearOpened,
        matureTrees: matureTrees,
        immatureTrees: immatureTrees,
        hectarage: hectarage,

        //Dialog box
        open: false
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpen = id => {
    this.setState({ open: true });
    //console.log(id);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
      //.ref("procurement/-LbT3BAlIMK18oBJSnZl");
      .ref(`procurement/${this.state.id}`);

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
    const { classes } = this.props;
    const { value, procurementData } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={3} sm={3}>
            <Link to="/farmers" className={classes.link}>
              <Fab
                color="primary"
                size="small"
                align="center"
                aria-label="Add"
                className={classes.fab}
              >
                <ArrowBackIcon />
              </Fab>
            </Link>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography variant="display1" component="h4">
              Farmer Details
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={3} sm={3}>
            <Card className={classes.card}>
              <CardHeader />
              <CardContent align="center">
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/profile.jpeg"
                  className={classes.bigAvatar}
                />

                <Typography
                  variant="h6"
                  component="h4"
                  style={{ fontWeight: "bold" }}
                >
                  {this.state.title}.{" "}
                  {this.state.firstname + " " + this.state.lastname}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Lives in {this.state.village},{" "}
                  {this.state.traditionalAuthority}, {this.state.district}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Farm opened in <b>{this.state.yearOpened}</b>
                </Typography>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Hectarage
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.hectarage}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Mature
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.matureTrees}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography variant="title" gutterBottom align="center">
                      Immature
                    </Typography>
                    <Typography
                      variant="title"
                      gutterBottom
                      align="center"
                      color="Primary"
                    >
                      {this.state.immatureTrees}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
            <Paper className={classes.root} elevation={1} align="center">
              <Fab
                color="primary"
                size="medium"
                align="center"
                aria-label="Add"
                className={classes.fab}
              >
                <PersonIcon />
              </Fab>
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={5} sm={5}>
                  <Typography variant="body1" gutterBottom align="left">
                    Gender:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Marital status:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Mobile:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    MM Registered?:
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Payments via MM?:
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={7}>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.sex}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.maritalStatus}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.phone}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.mmRegistered}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    {this.state.mmPayment}
                  </Typography>
                </Grid>
              </Grid>
              <br />

              <br />
            </Paper>
            <br />
          </Grid>
          <Grid item xs={9} sm={9}>
            <Paper square className={classes.root} elevation="0">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<PhoneIcon />} label="PROCUREMENTS" />
                <Tab icon={<FavoriteIcon />} label="ADVANCES" />
                <Tab icon={<PollIcon />} label="REPORTS" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Fab
                    color="primary"
                    variant="extended"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleOpen.bind(this, this.state.id)}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Procurement
                  </Fab>
                  <br />
                  <br />
                  <br />

                  {/* Procurement details for farmer*/}

                  <Grid container spacing={24}>
                    {this.state.procurementData.map((p, index) => (
                      <Grid item xs={6} sm={6}>
                        <Card className={classes.card}>
                          <CardContent>
                            <Grid container spacing={24}>
                              <Grid item xs={5} sm={5}>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Advance balance:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Cash available today:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Coffee type:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Price per kg:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Total value sale:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  Weight:
                                </Typography>
                              </Grid>
                              <Grid item xs={7} sm={7}>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.advanceBalance}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.cashAvailabletoday}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.coffeeType}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.todayValueSale}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.valueOfSaleLiability}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  align="left"
                                >
                                  {p.weight}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  {/* Procurement details for farmer*/}
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Advances />
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <Advances />
                </TabContainer>
              )}
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
              backgroundColor: "navy"
            }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Add Procurement
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* Create Procurement */}
            <form onSubmit={this.handleSubmit}>
              <br />
              <br />

              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="advanceBalance"
                    name="advanceBalance"
                    value={this.state.advanceBalance}
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
                    value={this.state.cashAvailabletoday}
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
                    value={this.state.coffeeType}
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
                    value={this.state.pricePerKg}
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
                    value={this.state.todayValueSale}
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
                    value={this.state.valueOfSaleLiability}
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
                    value={this.state.weight}
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
            {/* Create Procurement */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerDetails);
