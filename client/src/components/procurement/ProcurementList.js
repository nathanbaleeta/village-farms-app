import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import firebase from "../common/firebase";

const styles = {
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
};

class ProcurementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleOpen = () => {
      this.setState({ open: true });
    };

    this.handleClose = () => {
      this.setState({ open: false });
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <br />

        <Typography variant="h5" component="h3" color="default" align="center">
          Procurements
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Otim Tony"
                subheader="September 14, 2018"
              />
            </Card>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Diego Angemi"
                subheader="September 14, 2016"
              />
            </Card>
          </Grid>
          <br />
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/procurement.png"
                    className={classes.bigAvatar}
                  />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Nathan Baleeta"
                subheader="September 14, 2018"
              />
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} />
        </Grid>
        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogContent>
            {/* Edit Farmer form starts here */}

            <Typography component="h1" variant="h4" align="center">
              Edit Farmer
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  label="Fullname"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  label="Title"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="sex"
                  name="sex"
                  value={this.state.sex}
                  onChange={this.onChange}
                  label="Sex"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="maritalStatus"
                  name="maritalStatus"
                  value={this.state.maritalStatus}
                  onChange={this.onChange}
                  label="Marital Status"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  label="Mobile phone"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="mmRegistered"
                  name="mmRegistered"
                  value={this.state.mmRegistered}
                  onChange={this.onChange}
                  label="Mobile Money Registered"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="district"
                  name="district"
                  value={this.state.district}
                  onChange={this.onChange}
                  label="District"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="traditionalAuthority"
                  name="traditionalAuthority"
                  value={this.state.traditionalAuthority}
                  onChange={this.onChange}
                  label="Traditional Authority"
                  fullWidth
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="village"
                  name="village"
                  value={this.state.village}
                  onChange={this.onChange}
                  label="Village"
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
                  Update Farmer
                </Button>
              </Grid>
            </Grid>

            {/* Edit Farmer Form ends here */}
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

export default withStyles(styles)(ProcurementList);
