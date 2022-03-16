import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import classNames from "classnames";
import React from "react";

interface CustomButtonsProps {
  content: string | any;
  color?: string;
  hoverColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  borderRadius?: number;
  boxShadow?: boolean;
  widthFull?: boolean;
  disable?: boolean;
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  content,
  color = "#F00000",
  hoverColor = "#d32f2f",
  size = "medium",
  onClick,
  borderRadius = 4,
  boxShadow = true,
  widthFull = false,
  disable = false,
}) => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(color),
    "&:hover": {
      backgroundColor: hoverColor,
    },
    borderRadius: borderRadius,
    boxShadow: boxShadow
      ? "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);"
      : "none",
  }));

  return (
    <Stack spacing={1} direction="row">
      <ColorButton
        variant="contained"
        style={{ backgroundColor: color }}
        className={classNames("normal-case", {
          "font-normal": size === "small",
          "font-bold": size === "large",
          "font-semibold": size === "medium",
          "w-full": widthFull,
        })}
        size={size}
        disabled={disable}
        onClick={onClick}
      >
        {content}
      </ColorButton>
    </Stack>
  );
};

export default CustomButtons;
