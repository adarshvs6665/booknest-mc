import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { Badge, Box, Button } from "@mui/material";
import { Book } from "../../../types";

export const LibrarianBookItem = ({
  book,
  handleDelete,
  handleUpdate,
}: {
  book: Book;
  handleDelete: (book: Book) => void;
  handleUpdate: (book: Book) => void;
}) => {
  return (
    <Card sx={{ boxShadow: "0px 0px 14px 0px #00000040", height: "400px" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="book"
            src={book.logo}
          />
        }
        action={
          <>
            <IconButton aria-label="settings">
              <Badge badgeContent={book.totalCopies} color="error">
                <LibraryBooksIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="settings">
              <DeleteIcon
                onClick={() => {
                  handleDelete(book);
                }}
              />
            </IconButton>
          </>
        }
        title={
          book.title.length > 24 ? `${book.title.slice(0, 24)}...` : book.title
        }
        subheader={book.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={book.logo}
        alt={book.title}
        sx={{
          objectFit: "contain",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <CardContent sx={{ minHeight: "40px" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {book.description.length > 85
              ? `${book.description.slice(0, 85)}...`
              : book.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              handleUpdate(book);
            }}
          >
            Update
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
