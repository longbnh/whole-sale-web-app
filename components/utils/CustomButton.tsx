import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

interface CustomButtonsProps {
  content: string;
  color?: string;
  hoverColor?: string;
  size?: string;
}

const CustomButtons: React.FC<CustomButtonsProps> = ({
  content,
  color = "#F00000",
  hoverColor = "#d32f2f",
  size = "150px",
}) => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(color),
    width: size,
    "&:hover": {
      backgroundColor: hoverColor,
    },
  }));

  return (
    <Stack spacing={1} direction="row">
      <ColorButton variant="contained" style={{ backgroundColor: color }}>
        {content}
      </ColorButton>
    </Stack>
  );
};

export default CustomButtons;
