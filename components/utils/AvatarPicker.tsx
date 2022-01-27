import React from "react";
import { Avatar, IconButton } from "@mui/material";

interface AvatarPickerProps {
  width: number;
  height: number;
  edited?: boolean;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  width,
  height,
  edited = true,
}) => {
  return (
    <div>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        className="hidden"
      />
      <label htmlFor="icon-button-file">
        <IconButton aria-label="upload picture" component="span">
          <Avatar
            //   src="/images/example.jpg"
            sx={{ width: width, height: height }}
          />
        </IconButton>
      </label>
    </div>
  );
};

export default AvatarPicker;
