import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";

import firebase from "../common/firebase";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class FarmerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      sex: "",
      maritalStatus: ""
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

      this.setState({ name: name, title: title, sex: sex, maritalStatus });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h4" align="center">
          Farmer's details
        </Typography>

        <Grid container spacing={24}>
          <Grid item xs={4} sm={4}>
            {" "}
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" gutterBottom align="left">
                Personal Information
                <Divider />
              </Typography>

              <Typography variant="h6" component="h3" align="left">
                <b style={{ color: "black" }}>Name:</b> {this.state.name}
              </Typography>
              <Typography variant="h6" component="h3" align="left">
                <b style={{ color: "black" }}>Title:</b> {this.state.title}
              </Typography>
              <Typography variant="h6" component="h3" align="left">
                <b style={{ color: "black" }}>Gender:</b> {this.state.sex}
              </Typography>
              <Typography variant="h6" component="h3" align="left">
                <b style={{ color: "black" }}>Marital status:</b>{" "}
                {this.state.maritalStatus}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FarmerDetails);
