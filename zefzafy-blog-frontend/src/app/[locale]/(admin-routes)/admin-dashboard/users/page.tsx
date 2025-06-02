"use client";
import { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import PaginationComponent from "@/app/[locale]/components/PaginationComponent";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { useDeleteUserAdminPageMutation, useGetUsersQuery } from "@/redux/slices/api/userApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AdminUsersPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetUsersQuery(`?page=${currentPage}`);
  const [deleteUserAdminPage] = useDeleteUserAdminPageMutation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const t = useTranslations("Users-Table-page");

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("serial"),
      width: isSmallScreen ? 60 : 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName:  t("name"),
      flex: isSmallScreen ? 0.8 : 1,
      minWidth: isSmallScreen ? 120 : 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: 1.2,
            padding: "4px",
          }}
        >
          <Link
            href={`/profile/${params.row.userId}?fromAdminDashBoard=fromAdminDashBoard`}
            style={{
              color: theme.palette.primary.main,
              textDecoration: "none",
            }}
          >
            {params.value}
          </Link>
        </Box>
      ),
    },
      {
      field: "profileImage",
      headerName: t("profile"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      
      renderCell: (params: GridRenderCellParams) => (
        <Image
        onClick={()=> router.push(`/profile/${params.row.userId}?fromAdminDashBoard=fromAdminDashBoard`)}
          src={params.value}
          alt="userProfile"
          width={40}
          height={40}
          style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%", cursor : "pointer" }}
        />
      ),
    },
    {
      field: "email",
      headerName:  t("email"),
      flex: isSmallScreen ? 0.6 : 0.8,
      minWidth: isSmallScreen ? 80 : 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName:  t("role"),
      flex: isSmallScreen ? 0.6 : 0.8,
      minWidth: isSmallScreen ? 80 : 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: 1.2,
            padding: "4px",
            fontWeight: "bold",
            color: params.row.role === "admin" ? "error.main" : null,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName:  t("registerd-at"),
      flex: isSmallScreen ? 0.6 : 0.8,
      minWidth: isSmallScreen ? 80 : 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "isAccountVerified",
      headerName: t("verifed-statue"),
      flex: isSmallScreen ? 0.6 : 0.8,
      minWidth: isSmallScreen ? 80 : 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Remove",
      headerName: t("remove"),
      width: isSmallScreen ? 80 : 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
      <>
      {params.row?.roleParam === "user" ?
      (
          <IconButton
          onClick={() => onDeletePost({ id: params.value, page: currentPage })}
          sx={{ padding: isSmallScreen ? "6px" : "8px" }}
        >
          <Delete color="error" fontSize={isSmallScreen ? "small" : "medium"} />
        </IconButton>
      ) :
       (<Typography color="error.main" fontWeight={"bold"}>Admin</Typography>)
       }
      </>
      ),
    },
  ];

  const rows =
    data?.users.map((user, index) => ({
      id: index + 1,
      name: user.firstName + " " + user.lastName,
      userId: user.id,
      roleParam: user.role,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.substring(0, 10),
      isAccountVerified: user.isAccountVerified ? "Verified" : "Not Verified",
      profileImage : user.profileImage.url,
      Remove: user.id,
    })) || [];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const onDeletePost = async ({ id, page }: { id: number; page: number }) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this user?",
        icon: "warning",
        dangerMode: true,
      });

      if (willDelete) {
        await deleteUserAdminPage({ id, page }).unwrap();
        router.refresh();
        toast.success("user deleted successfully");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to delete user";
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        mt: 2,
        px: isSmallScreen ? 1 : 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px: 1,
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          sx={{ my: 1, fontWeight: "bold" }}
        >
          { t("users")} : 
        </Typography>
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          "& .MuiDataGrid-root": {
            borderRadius: 1,
            boxShadow: theme.shadows[2],
            height: "calc(100vh - 65px)",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize={isSmallScreen}
          pageSizeOptions={[5, 10, 20]}
          disableColumnMenu={isSmallScreen}
          sx={{
            fontSize: isSmallScreen ? "12px" : "14px",
            "& .MuiDataGrid-cell": {
              padding: isSmallScreen ? "4px" : "8px",
              lineHeight: 1.2,
            },
            "& .MuiDataGrid-columnHeader": {
              padding: isSmallScreen ? "4px" : "8px",
              backgroundColor: theme.palette.background.paper,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: isSmallScreen ? "12px" : "14px",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflowX: isSmallScreen ? "auto" : "hidden",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none",
            },
          }}
        />
      </Box>

      {data?.pagination && data?.pagination.pagesCount > 1 && (
        <PaginationComponent
          count={data.pagination.pagesCount}
          currentPage={data.pagination.page}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default AdminUsersPage;
