import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import { Link } from "react-router-dom";

import GroupIcon from "@material-ui/icons/Group";

import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = (theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "12px",
  },
});

class AdvancesCount extends Component {
  constructor() {
    super();
    this.state = {
      received: 0,
    };
  }

  componentDidMount() {
    // Get count of farmers who have received advances
    const farmersRef = firebase.database().ref("advances");
    farmersRef.on("value", (snapshot) => {
      const farmerCount = snapshot.numChildren();
      this.setState({
        received: farmerCount,
      });
    });
  }
  render() {
    const { classes } = this.props;

    const { received } = this.state;

    return (
      <div className={classes.root}>
        <Link to="/debitors" className={classes.link}>
          <Card className={classes.card}>
            <CardActionArea>
              <div
                style={{
                  padding: "20px",
                  background: "#A9A9A9",
                  color: "black",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item lg={8} sm={6} xs={8}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      style={{ fontWeight: "bold" }}
                    >
                      DEBITORS
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: "bold" }}
                    >
                      {received}
                    </Typography>
                  </Grid>

                  <Grid item lg={4} sm={6} xs={4}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      align="right"
                      style={{ fontSize: "62px" }}
                    >
                      <GroupIcon
                        color="default"
                        fontSize="inherit"
                        //style={{ color: "orange" }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(AdvancesCount);
