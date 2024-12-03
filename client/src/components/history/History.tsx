import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { HistoryItem } from "./fragments";
import { useFetchHistoryQuery } from "../../api";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { toastOptionsAtom } from "../../store";
import { BorrowInfo } from "../../types";

export const History = () => {
  const [history, setHistory] = useState<BorrowInfo[]>();
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const fetchHistoryQuery = useFetchHistoryQuery();

  useEffect(() => {
    if (fetchHistoryQuery.isSuccess) {
      setHistory(fetchHistoryQuery.data);
    }

    if (fetchHistoryQuery.isError) {
      setToastOptions({
        open: true,
        message: "Cannot fetch borrowings info at this moment",
        severity: "error",
      });
    }
  }, [
    fetchHistoryQuery.isSuccess,
    fetchHistoryQuery.isLoading,
    fetchHistoryQuery.isError,
    fetchHistoryQuery.data,
    fetchHistoryQuery.error,
  ]);

  return fetchHistoryQuery.isLoading ? (
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
  ) : fetchHistoryQuery.isError || !history ? (
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
  ) : fetchHistoryQuery.isSuccess && history.length === 0 ? (
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
      <Grid direction="column" container size={12} spacing={3} sx={{ pt: 2 }}>
        {history.map((item) => (
          <Grid size={12} sx={{ px: 2 }}>
            <HistoryItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
