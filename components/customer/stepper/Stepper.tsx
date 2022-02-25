import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { useRouter } from "next/router";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 6px)",
    right: "calc(50% + 6px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#F00000",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#F00000",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#F00000",
    }),
    "& .QontoStepIcon-completedIcon": {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "#F00000",
    },
    "& .QontoStepIcon-circle": {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function Steppers() {
  const steps = [
    { label: "Giỏ hàng", path: "cart", step: 0 },
    { label: "Thông tin giao hàng", path: "checkout-step2", step: 1 },
    { label: "Thanh toán", path: "checkout-step3", step: 2 },
  ];
  const router = useRouter();

  const [step] = useState(
    steps.find((item) => router.pathname.endsWith(item.path))?.step
  );

  return (
    <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
      {steps.map((item) => (
        <Step key={item.label}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            classes={{ label: "stepLabel" }}
            onClick={() => {
              if (step && item.step <= step) {
                router.push(`/${item.path}`);
              }
            }}
            className="cursor-pointer"
          >
            {item.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
