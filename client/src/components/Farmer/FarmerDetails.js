import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";

import firebase from "../common/firebase";

import Fab from "@material-ui/core/Fab";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PollIcon from "@material-ui/icons/Poll";

import Procurements from "./Procurements";
import Advances from "./Advances";

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
    width: 100,
    height: 100
  },
  fab: {
    margin: theme.spacing.unit
  }
});

class FarmerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      sex: "",
      maritalStatus: "",
      traditionalAuthority: "",
      village: "",
      district: "",

      value: 0
    };
  }

  componentDidMount() {
    const key = this.props.match.params.id;
    const farmersRef = firebase.database().ref(`farmers/${key}`);
    farmersRef.once("value", snapshot => {
      // handle read data.
      const name = snapshot.child("name").val();
      const title = snapshot.child("title").val();
      const sex = snapshot.child("sex").val();
      const maritalStatus = snapshot.child("maritalStatus").val();

      const village = snapshot.child("village").val();
      const traditionalAuthority = snapshot.child("traditionalAuthority").val();
      const district = snapshot.child("district").val();

      this.setState({
        name: name,
        title: title,
        sex: sex,
        maritalStatus: maritalStatus,
        village: village,
        traditionalAuthority: traditionalAuthority,
        district: district
      });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

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

                <Typography variant="h6" component="h4">
                  {this.state.title}. {this.state.name}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                  Lives in {this.state.traditionalAuthority},{" "}
                  {this.state.district}
                </Typography>
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
              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Gender:</b> {this.state.sex}
              </Typography>

              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Marital status:</b>{" "}
                {this.state.maritalStatus}
              </Typography>

              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Mobile number:</b> 0787212321
              </Typography>

              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Mobile Money registered?:</b> Yes
              </Typography>
              <br />
              <Divider />
              <br />
              <Fab
                color="primary"
                size="medium"
                align="center"
                aria-label="Add"
                className={classes.fab}
              >
                <LocationOnIcon />
              </Fab>
              <br />
              <br />
              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Village:</b> {this.state.village}
              </Typography>

              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>Traditional Authority:</b>{" "}
                {this.state.traditionalAuthority}
              </Typography>

              <Typography variant="body1" gutterBottom align="left">
                <b style={{ color: "black" }}>District:</b>{" "}
                {this.state.district}
              </Typography>
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
                  <Procurements />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Advances />
                </TabContainer>
              )}
              {value === 2 && <TabContainer>Page Three</TabContainer>}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerDetails);
