import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import orderStatus from "../../../public/json/orderStatus.json";

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
      marginLeft: 7,
      width: 15,
      height: 15,
      borderRadius: "50%",
      backgroundColor: "#F00000",
    },
    "& .QontoStepIcon-circle": {
      marginLeft: 7,
      width: 15,
      height: 15,
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

export default function ProcessStatusOrder() {
  const steps = [
    { statusId: 0, statusString: "GetAll", vn: "Đơn hàng đã đặt" },
    orderStatus.find((item) => item.statusId === 2),
    orderStatus.find((item) => item.statusId === 5),
    orderStatus.find((item) => item.statusId === 7),
    orderStatus.find((item) => item.statusId === 12),
  ];

  return (
    <Stepper orientation="vertical" activeStep={0}>
      {steps.map((item) => (
        <Step key={item!.statusId}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            classes={{ label: "stepLabel" }}
          >
            {item!.vn}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
