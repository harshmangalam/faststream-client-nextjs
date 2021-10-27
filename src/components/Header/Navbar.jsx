import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";

import UserProfileMenu from "./UserProfileMenu";
import { useAuthState } from "../../context/auth";

export default function Navbar() {
  const { isAuthenticated, isAuthLoading } = useAuthState();

  const [drawer, setDrawer] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawer(!drawer)}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography style={{ cursor: "pointer" }} variant="h6" component="span">
                FastStream
              </Typography>
            </Link>
          </Box>

          <Box>
            {isAuthLoading ? (
              "Loading..."
            ) : isAuthenticated ? (
              <UserProfileMenu />
            ) : (
              <>
                <Link href="/auth/signup" passHref>
                  <Button color="inherit">Sign up</Button>
                </Link>
                <Link href="/auth/login" passHref>
                  <Button color="inherit">Log in</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        variant="temporary"
      >
        <Toolbar />

        <Box sx={{ width: 250 }}>
          <SidebarMenu />
        </Box>
      </Drawer>
    </Box>
  );
}
