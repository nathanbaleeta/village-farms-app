import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import firebase from "../common/firebase";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  logo: {
    //margin: 10,
    width: 120,
    height: 90
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push("/advances1");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    return (
      <React.Fragment>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <img
              alt="Remy Sharp"
              src="/static/images/logo.png"
              className={classes.logo}
            />
            {error ? (
              <Typography component="h1" variant="h5" color="secondary">
                {error.message}
              </Typography>
            ) : null}
            <br />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <br />
              <br />
              <Link to="/" className={classes.link}>
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </Link>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
