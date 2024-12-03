import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { BorrowInfo } from "../../../types";
import moment from "moment";

export const HistoryItem = ({ item }: { item: BorrowInfo }) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        maxHeight: "90px",
        boxShadow: "0px 0px 14px 0px #00000040",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 80,
          objectFit: "contain",
          display: "flex",
          justifyContent: "flex-start",
          objectPosition: "left",
        }}
        image={item.bookInfo.logo}
        alt={item.bookInfo.title}
      />
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <CardContent sx={{ width: "300px" }}>
          <Typography component="div" variant="body1">
            {item.bookInfo.title.length > 24
              ? `${item.bookInfo.title.slice(0, 24)}...`
              : item.bookInfo.title}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "text.secondary", width: "100%" }}
          >
            {item.bookInfo.author}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Divider orientation="vertical" flexItem />
          <CardContent sx={{ px: 6 }}>
            <Typography component="div" variant="caption">
              Requested Date
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {moment(item.borrowRequestDate).format("DD-MM-YYYY")}
            </Typography>
          </CardContent>
          <Divider orientation="vertical" flexItem />
          <CardContent sx={{ px: 6 }}>
            <Typography component="div" variant="caption">
              Issued Date
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {item.issuedDate
                ? moment(item.issuedDate).format("DD-MM-YYYY")
                : "N/A"}
            </Typography>
          </CardContent>
          <Divider orientation="vertical" flexItem />
          <CardContent sx={{ px: 6 }}>
            <Typography component="div" variant="caption">
              Due Date
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {item.dueDate ? moment(item.dueDate).format("DD-MM-YYYY") : "N/A"}
            </Typography>
          </CardContent>
          <Divider orientation="vertical" flexItem />
          <CardContent sx={{ px: 6 }}>
            <Typography component="div" variant="caption">
              Returned Date
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {item.returnedDate ? moment(item.returnedDate).format("DD-MM-YYYY") : "N/A"}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};
