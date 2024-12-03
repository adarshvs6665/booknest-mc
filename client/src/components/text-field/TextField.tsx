import React from "react";
import {
  FormHelperText,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  TypographyProps,
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type CustomTextFieldProps = Omit<MuiTextFieldProps, "error"> & {
  label: string;
  name: string;
  labelVariant?: TypographyProps["variant"];
  labelSx?: TypographyProps["sx"];
  labelColor?: TypographyProps["color"];
  register?: UseFormRegister<any>;
  error?: FieldError | string | undefined;
  spinBtn?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showInfoIcon?: boolean;
  onInfoIconHover?: (event: React.MouseEvent<HTMLElement> | null) => void;
};

export const TextField: React.FC<CustomTextFieldProps> = ({
  label,
  labelVariant,
  labelColor,
  name,
  register,
  error,
  spinBtn = false,
  onChange,
  labelSx,
  showInfoIcon = false,
  onInfoIconHover,
  sx,
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
      <Typography
        variant={labelVariant}
        color={labelColor}
        sx={{
          marginBottom:
            labelSx && (labelSx as any).marginBottom
              ? (labelSx as any).marginBottom
              : "4px",
          ...labelSx,
        }}
        onMouseEnter={(e: any) => {
          if (onInfoIconHover) {
            onInfoIconHover(e);
          }
        }}
        onMouseLeave={() => {
          if (onInfoIconHover) {
            onInfoIconHover(null);
          }
        }}
      >
        {label}
        {showInfoIcon && <InfoOutlinedIcon style={{ fontSize: "14px" }} />}
        {props.required && <span style={{ color: "#DA2902" }}>&nbsp;*</span>}
      </Typography>

      <MuiTextField
        {...props}
        {...(!register && { onChange })}
        {...(register &&
          register(name, {
            onChange,
          }))}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error ? "#AA210E" : "#D2D2D2",
            },
          },
          "& .MuiInputBase-root": {
            boxSizing: "border-box",
          },
          "& .MuiInputBase-input": {
            padding: "0.8rem",
          },
          ...sx,
        }}
        slotProps={{
          input: {
            ...props?.slotProps?.input,
            sx: {
              ...(props.type === "number" && !spinBtn
                ? {
                    "& input[type=number]::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }
                : {}),
            },
          },
        }}
        error={error !== undefined}
        onFocus={(event) => {
          event.target.select();
        }}
      />
      {error && (
        <FormHelperText
          sx={{
            left: "0px !important",
            bottom: "-24px !important",
            position: "absolute",
            color: "#AA210E",
          }}
        >{`${
          typeof error === "string" ? error : error.message
        }`}</FormHelperText>
      )}
    </Box>
  );
};
