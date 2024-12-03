import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { BorrowedItem } from "./fragments";
import { useFetchBorrowInfoQuery } from "../../api";
import { BorrowInfo } from "../../types";
import { useEffect, useState } from "react";
import { toastOptionsAtom } from "../../store";
import { useAtom } from "jotai";

export const Borrowed = () => {
  const [borrowInfo, setBorrowInfo] = useState<BorrowInfo[]>();
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const fetchBorrowInfoQuery = useFetchBorrowInfoQuery();

  useEffect(() => {
    if (fetchBorrowInfoQuery.isSuccess) {
      setBorrowInfo(fetchBorrowInfoQuery.data);
    }

    if (fetchBorrowInfoQuery.isError) {
      setToastOptions({
        open: true,
        message: "Cannot fetch borrowings info at this moment",
        severity: "error",
      });
    }
  }, [
    fetchBorrowInfoQuery.isSuccess,
    fetchBorrowInfoQuery.isLoading,
    fetchBorrowInfoQuery.isError,
    fetchBorrowInfoQuery.data,
    fetchBorrowInfoQuery.error,
  ]);

  return fetchBorrowInfoQuery.isLoading ? (
    <Box
      sx={{
        px: 2,
        pb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : fetchBorrowInfoQuery.isError || !borrowInfo ? (
    <Box
      sx={{
        px: 2,
        pb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography>Something went wrong</Typography>
    </Box>
  ) : fetchBorrowInfoQuery.isSuccess && borrowInfo.length === 0 ? (
    <Box
      sx={{
        px: 2,
        pb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography>Nothing to show</Typography>
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Grid direction="row" container size={12}>
        {borrowInfo.map((info) => (
          <Grid size={3} sx={{ p: 2 }}>
            <BorrowedItem info={info} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
