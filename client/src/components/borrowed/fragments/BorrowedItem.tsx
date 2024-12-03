import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Badge, Box } from "@mui/material";
import { BorrowInfo } from "../../../types";
import { TextField } from "../../text-field";
import moment from "moment";
import { BorrowingStatus } from "../../../enums";

export const BorrowedItem = ({ info }: { info: BorrowInfo }) => {
  return (
    <Card sx={{ boxShadow: "0px 0px 14px 0px #00000040" }}>
      <Box sx={{ px: 2, display: "flex", justifyContent: "flex-end" }}>
        <Badge
          badgeContent={info.status}
          color={
            info.status === BorrowingStatus.REQUESTED
              ? "error"
              : info.status === BorrowingStatus.BORROWED
              ? "success"
              : "info"
          }
          sx={{
            right: 30,
            top: 25,
          }}
        ></Badge>
      </Box>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} src={info.bookInfo.logo} />}
        title={
          info.bookInfo.title.length > 24
            ? `${info.bookInfo.title.slice(0, 24)}...`
            : info.bookInfo.title
        }
        subheader={info.bookInfo.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={info.bookInfo.logo}
        alt={info.bookInfo.title}
        sx={{
          objectFit: "contain",
        }}
      />

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Requested Date
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            {moment(info.borrowRequestDate).format("DD-MM-YYYY")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Issued Date
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            {info.issuedDate
              ? moment(info.issuedDate).format("DD-MM-YYYY")
              : "N/A"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Due Date
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            {info.dueDate ? moment(info.dueDate).format("DD-MM-YYYY") : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label={"Code"}
            fullWidth
            disabled
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                padding: "0.4rem",
                fontSize: "0.875rem !important",
                fontWeight: 700,
                color: "#00000099",
              },
            }}
            labelSx={{
              fontSize: "14px",
              color: "#00000099",
              fontWeight: 400,
            }}
            name={"code"}
            value={info.borrowingId}
          />
        </Box>
        <Box>
          <Typography
            sx={{ color: "text.secondary", fontSize: "0.6rem", pt: 2 }}
          >
            <span style={{ color: "#DA2902" }}>&nbsp;*</span> Present this code
            at the library to collect / return your book.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
