import React from "react";
import {
  BaseSelectProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelectField,
} from "@mui/material";
import { Box } from "@mui/material";
import { DropdownItem } from "../../types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CustomSelectFieldProps extends Omit<BaseSelectProps, "error"> {
  label: string;
  name: string;
  dropdown: DropdownItem[];
  error?: FieldError | undefined;
  register?: UseFormRegister<any>;
  onChange?: ((event: any) => void) | undefined;
  valueAsNumber?: boolean;
}

export const SelectBox: React.FC<CustomSelectFieldProps> = ({
  label,
  name,
  dropdown,
  error,
  register,
  onChange,
  valueAsNumber,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        position: "relative",
      }}
    >
      <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1rem" }}>
        {label}
      </InputLabel>
      <MuiSelectField
        labelId="demo-simple-select-label"
        {...props}
        {...(!register && {
          onChange,
        })}
        {...(register &&
          register(name, {
            onChange,
            valueAsNumber,
          }))}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            padding: "0.5rem",
            display: "flex",
            alignItems: "flex-start",
          },
          ...props.sx,
        }}
        error={!!error}
      >
        {dropdown.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.key}
          </MenuItem>
        ))}
      </MuiSelectField>
      {error && (
        <FormHelperText
          sx={{
            left: "0px !important",
            bottom: "-24px !important",
            position: "absolute",
            color: "#AA210E",
          }}
        >
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
};
