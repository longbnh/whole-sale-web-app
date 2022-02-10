import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import LinearProgress from '@mui/material/LinearProgress';
import {withStyles, WithStyles} from '@mui/styles';
import {IMilestone} from "../../shared/models/IMilestone";

const styles = {
    stepper: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-around",
        padding: 0,
        width: "100%"
    },
    stepper__step: {
        position: "relative" as "relative",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%"
    },
    stepper__step__index: {
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        borderRadius: "50%",
        background: "#dedede",
        color: "#999",
        textAlign: "center" as "center",
        marginBottom: "5px",
    },
    currentStep: {
        backgroundColor: "red !important",
        color: "#fff",
        fontWeight: "500"
    },
    done: {
        backgroundColor: "red !important",
        color: "#fff",
        fontWeight: "500"
    },
    labelContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    },
    stepper__step__label: {
        color: "#999",
        margin: 0
    },
    linearProgress: {
        flex: "1 1 auto",
        position: 'absolute' as 'absolute',
        top: 12,
        left: 'calc(-50% + 20px)',
        right: 'calc(50% + 20px)',
        backgroundColor: "#ffd8ba61"
    },

    bar: {
        backgroundColor: "red"
    },
};

interface CustomStepperProps {
    milestones: Array<IMilestone>;
    activeMilestone: number;
    progress: number;
}

function CustomStepper(props: CustomStepperProps & WithStyles<typeof styles>) {

    const ProgressBar = (activeMilestone: number, currentMilestone: number, progress: number) => {
        let value = 0;
        if(activeMilestone+1 === currentMilestone) {
            value = progress
        } else if(activeMilestone >= currentMilestone) {
            value = 100
        }

        return <LinearProgress variant="determinate" value={value} classes={{root: props.classes.linearProgress, bar: props.classes.bar}} />
    }

    function StepContent(done: boolean, index: number) {
        return done ? "✓" : props.milestones.map(milestone => milestone.quantity)[index];
    }

    function renderStep(label: string, currentMilestone: number) {
        const {activeMilestone, progress} = props;
        const done = currentMilestone < activeMilestone;
        const currentStep = currentMilestone === activeMilestone;
        const stepClasses = classNames({
            [props.classes.stepper__step__index]: true,
            [props.classes.currentStep]: currentStep,
            [props.classes.done]: done
        });

        return (
            <li className={props.classes.stepper__step} key={currentMilestone}>
                <div className={props.classes.labelContainer}>
          <span className={stepClasses}>
              {StepContent(done, currentMilestone)}
          </span>
                    <p className={props.classes.stepper__step__label}>{label}</p>
                </div>
                {!!currentMilestone && ProgressBar(activeMilestone, currentMilestone, progress)}
            </li>
        )
    }

    return (
        <ul className={props.classes.stepper}>
            {props.milestones
                .map(milestone => milestone.price.toString())
                .map((milestone, index) => renderStep(milestone, index))}
        </ul>
    )
}

export default withStyles(styles)(CustomStepper);
// export default CustomStepper;