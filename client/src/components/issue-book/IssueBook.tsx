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
  useFetchBorrowRequestCodesQuery,
  useIssueBookMutation,
} from "../../api";
import { toastOptionsAtom } from "../../store";
import { useAtom } from "jotai";
import { useValidateForm } from "../../hooks";
import { issueBookSchema } from "../../validations";

export const IssueBook = () => {
  const [borrowRequestsDropdown, setBorrowRequestsDropdown] =
    useState<DropdownItem[]>();
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const { register, handleSubmit, errors } = useValidateForm(issueBookSchema);

  const fetchBorrowRequestCodesQuery = useFetchBorrowRequestCodesQuery();
  const issueBookMutation = useIssueBookMutation();

  useEffect(() => {
    if (fetchBorrowRequestCodesQuery.isSuccess) {
      const borrowRequestsDropdown: DropdownItem[] =
        fetchBorrowRequestCodesQuery.data.map((e) => ({
          key: e,
          value: e,
        }));
      setBorrowRequestsDropdown(borrowRequestsDropdown);
    }
  }, [
    fetchBorrowRequestCodesQuery.isSuccess,
    fetchBorrowRequestCodesQuery.isLoading,
    fetchBorrowRequestCodesQuery.isError,
    fetchBorrowRequestCodesQuery.data,
    fetchBorrowRequestCodesQuery.error,
  ]);

  useEffect(() => {
    if (issueBookMutation.isSuccess) {
      fetchBorrowRequestCodesQuery.refetch();
      setToastOptions({
        open: true,
        message: "Book issued successfully",
        severity: "info",
      });
    }

    if (issueBookMutation.isError) {
      setToastOptions({
        open: true,
        message: "Book cannot be issued at this moment",
        severity: "error",
      });
    }
  }, [
    issueBookMutation.isSuccess,
    issueBookMutation.isLoading,
    issueBookMutation.isError,
    issueBookMutation.data,
    issueBookMutation.error,
  ]);

  const handleIssueBook = (data: any) => {
    issueBookMutation.mutate(data.borrowingId);
  };

  return fetchBorrowRequestCodesQuery.isLoading ||
    issueBookMutation.isLoading ? (
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
  ) : fetchBorrowRequestCodesQuery.isError || !borrowRequestsDropdown ? (
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
            Issue Book
          </Typography>
        </Box>
        <Divider sx={{ mt: 3, mb: 4 }} />
        <Box
          component={"form"}
          id="createBookForm"
          onSubmit={handleSubmit(handleIssueBook)}
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
            Issue Book
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
