import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SelectBox } from "../select-box";
import { DropdownItem } from "../../types";
import {
  useFetchBorrowedBookCodesQuery,
  useReturnBookMutation,
} from "../../api";
import { toastOptionsAtom } from "../../store";
import { useAtom } from "jotai";
import { useValidateForm } from "../../hooks";
import { returnBookSchema } from "../../validations";

export const ReturnBook = () => {
  const [borrowRequestsDropdown, setBorrowRequestsDropdown] =
    useState<DropdownItem[]>();
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const { register, handleSubmit, errors } = useValidateForm(returnBookSchema);

  const fetchBorrowedBookCodesQuery = useFetchBorrowedBookCodesQuery();
  const returnBookMutation = useReturnBookMutation();

  useEffect(() => {
    if (fetchBorrowedBookCodesQuery.isSuccess) {
      const borrowRequestsDropdown: DropdownItem[] =
        fetchBorrowedBookCodesQuery.data.map((e) => ({
          key: e,
          value: e,
        }));
      setBorrowRequestsDropdown(borrowRequestsDropdown);
    }
  }, [
    fetchBorrowedBookCodesQuery.isSuccess,
    fetchBorrowedBookCodesQuery.isLoading,
    fetchBorrowedBookCodesQuery.isError,
    fetchBorrowedBookCodesQuery.data,
    fetchBorrowedBookCodesQuery.error,
  ]);

  useEffect(() => {
    if (returnBookMutation.isSuccess) {
      fetchBorrowedBookCodesQuery.refetch();
      setToastOptions({
        open: true,
        message: "Book returned successfully",
        severity: "info",
      });
    }

    if (returnBookMutation.isError) {
      setToastOptions({
        open: true,
        message: "Book cannot be returned at this moment",
        severity: "error",
      });
    }
  }, [
    returnBookMutation.isSuccess,
    returnBookMutation.isLoading,
    returnBookMutation.isError,
    returnBookMutation.data,
    returnBookMutation.error,
  ]);

  const handleReturnBook = (data: any) => {
    returnBookMutation.mutate(data.borrowingId);
  };

  return fetchBorrowedBookCodesQuery.isLoading ||
    returnBookMutation.isLoading ? (
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
  ) : fetchBorrowedBookCodesQuery.isError || !borrowRequestsDropdown ? (
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
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{ p: 6, width: "500px", boxShadow: "0px 0px 14px 0px #00000040" }}
      >
        <Box>
          <Typography
            sx={{ width: "100%", fontSize: "1.3rem", textAlign: "center" }}
          >
            Return Book
          </Typography>
        </Box>
        <Divider sx={{ mt: 3, mb: 4 }} />
        <Box
          component={"form"}
          id="createBookForm"
          onSubmit={handleSubmit(handleReturnBook)}
          sx={{
            minWidth: "500px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <SelectBox
            fullWidth
            label="Book code"
            name="borrowingId"
            defaultValue={undefined}
            dropdown={borrowRequestsDropdown}
            register={register}
            error={errors["borrowingId"]}
          />
          <Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained">
            Return Book
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
