import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import {
  CreateBookDialog,
  CreateBookDialog as EditBookDialog,
  LibrarianBookItem,
} from "./fragments";
import { Book, DropdownItem } from "../../types";
import { useEffect, useState } from "react";
import { SelectBox } from "../select-box";
import { Genre } from "../../enums";
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useFetchBooksQuery,
  useUpdateBookMutation,
} from "../../api";
import { toastOptionsAtom } from "../../store";
import { useAtom } from "jotai";
import { useValidateForm } from "../../hooks";
import { createBookSchema } from "../../validations";

const dropdown: DropdownItem[] = [
  { key: "All", value: "all" },
  { key: "Fiction", value: Genre.Fiction },
  { key: "Non-Fiction", value: Genre.NonFiction },
  { key: "Mystery", value: Genre.Mystery },
  { key: "Thriller", value: Genre.Thriller },
  { key: "Romance", value: Genre.Romance },
  { key: "Science Fiction", value: Genre.ScienceFiction },
  { key: "Fantasy", value: Genre.Fantasy },
  { key: "Biography", value: Genre.Biography },
  { key: "History", value: Genre.History },
];

export const LibrarianBooks = () => {
  const [openCreateBookDialog, setOpenCreateBookDialog] = useState(false);
  const [openEditBookDialog, setOpenEditBookDialog] = useState(false);
  const [bookDefaultValues, setBookDefaultValues] = useState<Book>();
  const [genre, setGenre] = useState("all");
  const [books, setBooks] = useState<Book[]>();
  const [, setToastOptions] = useAtom(toastOptionsAtom);
  const fetchBooksQuery = useFetchBooksQuery();
  const createBookMutation = useCreateBookMutation();
  const updateBookMutation = useUpdateBookMutation();
  const deleteBookMutation = useDeleteBookMutation();

  const { register, handleSubmit, errors, reset } =
    useValidateForm(createBookSchema);

  useEffect(() => {
    if (!openEditBookDialog) {
      console.log("set undefined");
      setBookDefaultValues(undefined);
    }
  }, [openEditBookDialog]);

  useEffect(() => {
    if (fetchBooksQuery.isSuccess) {
      setBooks(fetchBooksQuery.data);
    }

    if (fetchBooksQuery.isError) {
      setToastOptions({
        open: true,
        message: "Cannot fetch books at this moment",
        severity: "error",
      });
    }
  }, [
    fetchBooksQuery.isSuccess,
    fetchBooksQuery.isLoading,
    fetchBooksQuery.isError,
    fetchBooksQuery.data,
    fetchBooksQuery.error,
    fetchBooksQuery.isFetching,
    fetchBooksQuery.isRefetching,
  ]);

  useEffect(() => {
    setBookDefaultValues(undefined);

    if (updateBookMutation.isSuccess) {
      fetchBooksQuery.refetch();
      setToastOptions({
        open: true,
        message: "Book updated",
        severity: "info",
      });
    }

    if (updateBookMutation.isError) {
      setToastOptions({
        open: true,
        message: "Cannot update book at this moment",
        severity: "error",
      });
    }
  }, [
    updateBookMutation.isSuccess,
    updateBookMutation.isLoading,
    updateBookMutation.isError,
    updateBookMutation.data,
    updateBookMutation.error,
  ]);

  useEffect(() => {
    setBookDefaultValues(undefined);
    if (deleteBookMutation.isSuccess) {
      fetchBooksQuery.refetch();
      setToastOptions({
        open: true,
        message: "Book deleted",
        severity: "info",
      });
    }

    if (deleteBookMutation.isError) {
      setToastOptions({
        open: true,
        message: "Cannot delete book at this moment",
        severity: "error",
      });
    }
  }, [
    deleteBookMutation.isSuccess,
    deleteBookMutation.isLoading,
    deleteBookMutation.isError,
    deleteBookMutation.data,
    deleteBookMutation.error,
  ]);

  useEffect(() => {
    if (createBookMutation.isSuccess) {
      fetchBooksQuery.refetch();
      setToastOptions({
        open: true,
        message: "Book created",
        severity: "info",
      });
    }

    if (createBookMutation.isError) {
      setToastOptions({
        open: true,
        message: "Cannot create book at this moment",
        severity: "error",
      });
    }
  }, [
    createBookMutation.isSuccess,
    createBookMutation.isLoading,
    createBookMutation.isError,
    createBookMutation.data,
    createBookMutation.error,
  ]);

  const handleUpdateBook = (book: Book) => {
    setBookDefaultValues(book);
    setOpenEditBookDialog(true);
  };

  const handleDeleteBook = (book: Book) => {
    deleteBookMutation.mutate(book.bookId);
  };

  const handleCreateBook = ({ totalCopies, ...data }: any) => {
    setOpenCreateBookDialog(false);
    createBookMutation.mutate({ ...data, totalCopies: Number(totalCopies) });
  };

  const handleEditBook = ({ totalCopies, ...data }: any) => {
    setOpenEditBookDialog(false);
    updateBookMutation.mutate({
      ...data,
      totalCopies: Number(totalCopies),
      bookId: bookDefaultValues?.bookId,
    });
  };

  return (
    <>
      {fetchBooksQuery.isLoading ||
      updateBookMutation.isLoading ||
      deleteBookMutation.isLoading ||
      createBookMutation.isLoading ||
      fetchBooksQuery.isFetching ||
      fetchBooksQuery.isRefetching ? (
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
      ) : fetchBooksQuery.isError || !books ? (
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
        <>
          <Box
            sx={{
              px: 2,
              pb: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Box>
              <SelectBox
                sx={{
                  width: "200px",
                }}
                label="Genre"
                name="genre"
                dropdown={dropdown}
                value={genre}
                onChange={(event: any) => {
                  setGenre(event.target.value);
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "200px",
                height: "40px",
              }}
              onClick={() => {
                setOpenCreateBookDialog(true);
              }}
            >
              Add Book
            </Button>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid direction="row" container size={12}>
              {books
                .filter((e) => genre === "all" || e.genre === genre)
                .map((book, index) => (
                  <Grid size={3} sx={{ p: 2 }} key={index}>
                    <LibrarianBookItem
                      book={book}
                      handleUpdate={handleUpdateBook}
                      handleDelete={handleDeleteBook}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      )}
      <CreateBookDialog
        title={"Add Book"}
        openDialog={openCreateBookDialog}
        errors={errors}
        setOpenDialog={setOpenCreateBookDialog}
        handleClickSubmit={handleCreateBook}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
      />
      {openEditBookDialog && (
        <EditBookDialog
          title={"Edit Book"}
          defaultValues={bookDefaultValues}
          openDialog={openEditBookDialog}
          errors={errors}
          setOpenDialog={setOpenEditBookDialog}
          handleClickSubmit={handleEditBook}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
        />
      )}
    </>
  );
};
