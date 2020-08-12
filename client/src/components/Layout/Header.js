import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import InsertChartIcon from "@material-ui/icons/InsertChart";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //zoom: "80%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "12px",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link to="/" className={classes.link}>
        <ListItem button key={"Dataclan HR"}>
          <ListItemIcon>
            <MenuIcon style={{ color: "#212F3D" }} />
          </ListItemIcon>
          <Typography variant="subtitle1" gutterBottom>
            Village Farms
          </Typography>
        </ListItem>
      </Link>

      <Divider />
      <Link to="/" className={classes.link}>
        <ListItem button key={"Dashboard"}>
          <ListItemIcon>
            <InsertChartIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Dashboard
          </Typography>
        </ListItem>
      </Link>
      <Divider />

      <Link to="/farmers" className={classes.link}>
        <ListItem button key={"Attendance"}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Farmers
          </Typography>
        </ListItem>
      </Link>

      <Divider />

      <Link to="/debitors" className={classes.link}>
        <ListItem button key={"Debitors"}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Debitors
          </Typography>
        </ListItem>
      </Link>

      <Divider />

      <Link to="/users" className={classes.link}>
        <ListItem button key={"Users"}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Users
          </Typography>
        </ListItem>
      </Link>
      <Link to="/settings" className={classes.link}>
        <ListItem button key={"Settings"}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Settings
          </Typography>
        </ListItem>
      </Link>
      <Link to="/sign-out" className={classes.link}>
        <ListItem button key={"Sign out"}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <Typography variant="body2" gutterBottom>
            Sign out
          </Typography>
        </ListItem>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "midnightblue" }}>
        <Toolbar>
          {["left"].map((anchor) => (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
          ))}
          <Typography variant="h5" className={classes.title}>
            Village Farms Manager
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}
