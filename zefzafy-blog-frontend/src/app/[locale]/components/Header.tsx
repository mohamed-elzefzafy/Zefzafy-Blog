"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { userInfo } = useAppSelector((state) => state?.auth);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
  const t = useTranslations("Header");
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 1, sm: 2 }, // Responsive padding
            minHeight: { xs: 48, sm: 64 }, // Smaller toolbar height on mobile
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => router.push("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              mr: { xs: 1, sm: 2 },
              cursor: "pointer",
            }}
          >
            <Image
              alt="Zef-Blog"
              src="/zef-blog.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "clamp(30px, 8vw, 40px)", // Responsive logo size
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
              mr: 2,
            }}
          >
            Zef-Blog
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right-side Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 }, // Responsive gap
            }}
          >
            {/* Theme Toggle */}
            <LanguageSwitcher />
            <ToggleDarkLightIcons fontSize="20px" />

            {/* Auth Buttons (Not Logged In) */}
            {!userInfo.email && (
              <>
                <Button
                  onClick={() => router.push("/auth/register")}
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font
                    px: { xs: 1, sm: 2 }, // Responsive padding
                  }}
                >
                  {t("register")}
                </Button>
                <Button
                  onClick={() => router.push("/auth/login")}
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  {t("login")}
                </Button>
              </>
            )}

            {/* User Menu (Logged In) */}
            {userInfo.email && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        mr: 1,
                        color: common.white,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        display: { xs: "none", sm: "block" }, // Hide name on small screens
                      }}
                    >
                      {userInfo?.firstName}
                    </Typography>
                    <Avatar
                      alt={userInfo.firstName}
                      src={userInfo.profileImage.url}
                      sx={{
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: { xs: "40px", sm: "45px" } }}
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
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        {t("verify-your-account")}
                      </Typography>
                    </MenuItem>
                  )}

                  {userInfo.role === "admin" && (
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      disabled={!userInfo.isAccountVerified}
                    >
                      <Typography
                        href={"/admin-dashboard"}
                        sx={{
                          textAlign: "center",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                        component={Link}
                      >
                        {t("admin-dashboard")}
                      </Typography>
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={handleCloseUserMenu}
                    disabled={!userInfo.isAccountVerified}
                  >
                    <Typography
                      href={`/profile/${userInfo.id}`}
                      component={Link}
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {t("profile")}
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {t("logout")}
                    </Typography>
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
