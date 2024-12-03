import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookIcon from "@mui/icons-material/Book";
import { Sidebar } from "../components";
import { Breadcrumbs, Typography } from "@mui/material";
import { Menu } from "../types";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const menu: Menu[] = [
  { label: "Books", path: "books", icon: <MenuBookIcon /> },
  { label: "Issue", path: "issue", icon: <BookIcon /> },
  { label: "Return", path: "return", icon: <AssignmentRoundedIcon /> },
];
export const Librarian = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    const matchedMenu = menu.find((item) => item.path === currentPath);

    console.log(matchedMenu);
    if (matchedMenu) {
      setSelectedMenu(matchedMenu);
    }
  }, [location.pathname]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar
          menu={menu}
          selectedMenu={selectedMenu}
          handleChange={(menu: Menu) => {
            setSelectedMenu(menu);
            navigate(menu.path);
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  px: 2,
                  pt: 5,
                }}
              >
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Typography>Librarian</Typography>
                  <Typography>{selectedMenu && selectedMenu.label}</Typography>
                </Breadcrumbs>
              </Box>
            </Box>
            <Box sx={{ height: "100%", width: "100%" }}>
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
