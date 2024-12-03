import { Box, Typography } from "@mui/material";

export const Error = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>404 Not Found</Typography>
    </Box>
  );
};
