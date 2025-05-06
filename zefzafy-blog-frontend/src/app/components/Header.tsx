"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ToggleDarkLightIcons from "@/utils/theme/ToggleDarkLightIcons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { common } from "@mui/material/colors";
import { useLogoutMutation } from "@/redux/slices/api/authApiSlice";
import { logoutAction } from "@/redux/slices/authSlice";

const pages = ["Products", "Pricing", "Blog"];

function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { userInfo } = useAppSelector((state) => state?.auth);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutAction());
      handleCloseUserMenu();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyYourAccount = () => {
    router.push("/auth/verifyAccount");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <Box
          onClick={() => router.push("/")}
            sx={{
              display: { xs: "none", md: "flex" },
              marginRight: "5px",
              borderRadius: "10px",
              overflow: "hidden", // Ensures borderRadius applies correctly
            }}
          
          >
            <Image alt="Zef-Blog" src="/zef-blog.jpg" width={50} height={50} />
          </Box>
          <Typography
            variant="body1"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => router.push("/")}
          >
            Zef-Blog
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              marginRight: "5px",
              borderRadius: "10px",
              overflow: "hidden", // Ensures borderRadius applies correctly
            }}
          >
            <Image alt="Zef-Blog" src="/zef-blog.jpg" width={30} height={30} />
          </Box>
          <Typography
            variant="body1"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Zef-Blog
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          <Box sx={{flexGrow : 1}}/>
          <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <ToggleDarkLightIcons fontSize="20px" />
            </Box>

            {!userInfo.email && (
              <>
                <Button
                  onClick={() => router.push("/auth/register")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>

                <Button
                  onClick={() => router.push("/auth/login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              </>
            )}

            {userInfo.email && userInfo.role === "user" && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{ mr: 1, color: common.white }}
                    >
                      {userInfo?.firstName}{" "}
                    </Typography>
                    <Avatar alt="Remy Sharp" src={userInfo.profileImage.url} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!userInfo.isAccountVerified && (
                    <MenuItem onClick={handleVerifyYourAccount}>
                      <Typography sx={{ textAlign: "center" }}>
                        Verify your account
                      </Typography>
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={handleCloseUserMenu}
                    disabled={!userInfo.isAccountVerified}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      User Dashboard
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}

            {userInfo.email && userInfo.role === "admin" && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{ mr: 1, color: common.white }}
                    >
                      {userInfo?.firstName}{" "}
                    </Typography>
                    <Avatar alt="Remy Sharp" src={userInfo.profileImage.url} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!userInfo.isAccountVerified && (
                    <MenuItem onClick={handleVerifyYourAccount}>
                      <Typography sx={{ textAlign: "center" }}>
                        Verify your account
                      </Typography>
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={handleCloseUserMenu}
                    disabled={!userInfo.isAccountVerified}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      Admin Dashboard
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
