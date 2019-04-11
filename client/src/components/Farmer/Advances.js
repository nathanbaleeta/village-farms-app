import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  root: {},
  avatar: {},
  bigAvatar: {
    width: 70,
    height: 70
  }
});

function Followers(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <br />
      <Typography variant="h5" component="h3" color="default" align="center">
        Advances
      </Typography>
      <br />
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/advance.png"
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
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/advance.png"
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
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/advance.png"
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
    </div>
  );
}

Followers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Followers);
