import React from "react";
import { makeStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

function LinearDeterminate() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    if (completed === 100) {
      setCompleted(0);
    } else {
      const diff = Math.random() * 10;
      setCompleted(Math.min(completed + diff, 100));
    }
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6" gutterBottom align="left">
        Profile complete
      </Typography>
      <LinearProgress variant="determinate" value={completed} />
      <br />
      <Typography component="h2" variant="h6" gutterBottom align="left">
        Profile complete
      </Typography>
      <LinearProgress color="primary" variant="determinate" value={completed} />
    </div>
  );
}

export default LinearDeterminate;
