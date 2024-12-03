import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Menu } from "../../types";
import { useAtom } from "jotai";
import { storage, userAtom } from "../../store";
import { useNavigate } from "react-router-dom";
import { SESSION_STORAGE_USER_KEY } from "../../constants";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export const Sidebar = ({
  menu,
  selectedMenu,
  handleChange,
}: {
  menu: Menu[];
  selectedMenu?: Menu;
  handleChange: (menu: Menu) => void;
}) => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    storage.removeItem(SESSION_STORAGE_USER_KEY);
    navigate("/sign-in");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 14px 0px #00000040",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
            BookNest
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
        <List dense>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={selectedMenu && item.label === selectedMenu.label}
                onClick={() => {
                  handleChange(item);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1.5,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={user?.fullName}
          src="avatar.png"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {user?.fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {user?.email}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Box sx={{ px: 1, py: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};
