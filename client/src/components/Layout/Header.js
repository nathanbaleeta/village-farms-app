import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
//import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import PaymentIcon from "@material-ui/icons/Payment";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import PollIcon from "@material-ui/icons/Poll";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import firebase from "firebase";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "19px",
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  avatar: {
    margin: 10
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    color: "black",
    "&:hover": {
      color: fade(theme.palette.common.white, 0.25)
    },
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "primary",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  logOutUser = () => {
    firebase.auth().signOut();
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <Link to="/settings" className={classes.link}>
          <MenuItem>Settings</MenuItem>
        </Link>
        <Link to="/users" className={classes.link}>
          <MenuItem>Users</MenuItem>
        </Link>
        <Link to="/login" className={classes.link}>
          <MenuItem onClick={this.logOutUser}>Logout</MenuItem>
        </Link>
        <Typography
          variant="title"
          gutterBottom
          style={{ fontSize: "13px", color: "#D23E56" }}
          align="center"
        />
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "#0000CD" }}>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h4"
              color="inherit"
              noWrap
              //style={{ fontWeight: "bold" }}
            >
              Village Farms Manager
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div>
                <Grid container justify="center" alignItems="center">
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/" className={classes.link}>
                      <IconButton color="inherit">
                        <PollIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Analytics
                      </Typography>
                    </Link>
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/farmers" className={classes.link}>
                      <IconButton color="inherit">
                        <GroupIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Farmers
                      </Typography>
                    </Link>
                  </div>

                  <div style={{ paddingRight: 20 }}>
                    <Link to="/advances" className={classes.link}>
                      <IconButton color="inherit">
                        <PaymentIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Advance
                      </Typography>
                    </Link>
                  </div>

                  <div style={{ paddingRight: 20 }}>
                    <Link to="/procurement" className={classes.link}>
                      <IconButton color="inherit">
                        <ShoppingBasketIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Procure
                      </Typography>
                    </Link>
                  </div>

                  <div style={{ paddingRight: 20 }}>
                    <Link to="/sales" className={classes.link}>
                      <IconButton color="inherit">
                        <ShoppingCartIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Sales
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              </div>

              {/*  <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <ArrowDropDownIcon />
              </IconButton> */}
              <IconButton color="inherit" onClick={this.handleProfileMenuOpen}>
                <AccountCircle style={{ height: 50, width: 50 }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
