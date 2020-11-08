import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleOff from "@material-ui/icons/ToggleOff";
import ToggleOn from "@material-ui/icons/ToggleOn";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
    alignItems: "center",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const Toggle = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <ToggleButton value="bold" aria-label="bold" onClick={() => props.clicked(!props.value)}>
          {props.value ? <ToggleOn /> : <ToggleOff />}
        </ToggleButton>
      </Paper>
    </div>
  );
};

export default Toggle;
