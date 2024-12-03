import React, { useEffect } from "react";
import { Dialog } from "../../dialog";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { Box } from "@mui/material";
import { TextField } from "../../text-field";
import { SelectBox } from "../../select-box";
import { Genre } from "../../../enums";
import { Book, DropdownItem } from "../../../types";

type Props = {
  title: string;
  defaultValues?: Book;
  openDialog: boolean;
  errors: any;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickSubmit: (data: any) => void;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
};

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

export const CreateBookDialog = ({
  title,
  defaultValues,
  register,
  errors,
  handleSubmit,
  handleClickSubmit,
  openDialog,
  setOpenDialog,
  reset,
}: Props) => {
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <Dialog
      title={title}
      open={openDialog}
      setOpen={setOpenDialog}
      form="createBookForm"
    >
      <Box
        component={"form"}
        id="createBookForm"
        onSubmit={handleSubmit(handleClickSubmit)}
        sx={{
          minWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label={"Title"}
          name={"title"}
          register={register}
          error={errors["title"]}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              padding: "0.6rem",
              fontSize: "0.875rem !important",
            },
          }}
          labelSx={{
            fontSize: "14px",
            color: "#00000099",
            fontWeight: 400,
          }}
          defaultValue={defaultValues && defaultValues.title}
        />
        <TextField
          label={"Author"}
          name={"author"}
          defaultValue={defaultValues && defaultValues.author}
          register={register}
          error={errors["author"]}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              padding: "0.6rem",
              fontSize: "0.875rem !important",
            },
          }}
          labelSx={{
            fontSize: "14px",
            color: "#00000099",
            fontWeight: 400,
          }}
        />
        <TextField
          label={"Description"}
          name={"description"}
          defaultValue={defaultValues && defaultValues.description}
          register={register}
          error={errors["description"]}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              padding: "0.6rem",
              fontSize: "0.875rem !important",
            },
          }}
          labelSx={{
            fontSize: "14px",
            color: "#00000099",
            fontWeight: 400,
          }}
        />
        <TextField
          label={"Logo URL"}
          name={"logo"}
          defaultValue={defaultValues && defaultValues.logo}
          register={register}
          error={errors["logo"]}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              padding: "0.6rem",
              fontSize: "0.875rem !important",
            },
          }}
          labelSx={{
            fontSize: "14px",
            color: "#00000099",
            fontWeight: 400,
          }}
        />
        <SelectBox
          fullWidth
          label="Genre"
          name="genre"
          defaultValue={defaultValues && defaultValues.genre}
          dropdown={dropdown}
          register={register}
          error={errors["genre"]}
        />
        <TextField
          type="number"
          label={"Total Copies"}
          name={"totalCopies"}
          defaultValue={defaultValues && defaultValues.totalCopies}
          register={register}
          error={errors["totalCopies"]}
          fullWidth
          spinBtn={true}
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              padding: "0.6rem",
              fontSize: "0.875rem !important",
            },
          }}
          labelSx={{
            fontSize: "14px",
            color: "#00000099",
            fontWeight: 400,
          }}
        />
      </Box>
    </Dialog>
  );
};
