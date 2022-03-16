import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@mui/styles";
import {
  LinearProgress,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  useTheme,
} from "@mui/material";

const CustomizedConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 2.2px)",
    right: "calc(50% + 2px)",
  },
  active: {
    "& $line": {
      borderColor: "#F00000",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#F00000",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#F00000",
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "#F00000",
  },
});

function QontoStepIcon(props: any) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <div className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: useTheme().spacing(1),
  },
  instructions: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(1),
  },
}));

export default function Progress() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["4500000", "", "5000000", "", ""];

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        // connector={<LinearProgress variant="determinate" value={5} />}
        connector={<CustomizedConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}> {label} </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
