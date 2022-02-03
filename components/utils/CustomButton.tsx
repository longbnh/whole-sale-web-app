import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import classNames from "classnames";
import React from "react";

interface CustomButtonsProps {
  content: string;
  color?: string;
  hoverColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  content,
  color = "#F00000",
  hoverColor = "#d32f2f",
  size = "medium",
  onClick,
}) => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(color),
    "&:hover": {
      backgroundColor: hoverColor,
    },
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
        })}
        size={size}
        onClick={onClick}
      >
        {content}
      </ColorButton>
    </Stack>
  );
};

export default CustomButtons;
