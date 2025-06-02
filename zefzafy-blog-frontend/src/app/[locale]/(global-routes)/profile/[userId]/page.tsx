"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { use, useState } from "react";
import PostsComponent from "../../(home)/_componens/PostsComponent";
import {
  useGetOneUserQuery,
  useLogoutMutation,
} from "@/redux/slices/api/authApiSlice";
import {
  useDeletePostProfilePageMutation,
  useGetPostsQuery,
} from "@/redux/slices/api/postApiSlice";
import { IPost } from "@/types/post";
import EditUserProfileButton from "./_components/EditUserProfileButton";
import { useRouter } from "next/navigation";
import SearchParamComponent from "../../post/[postId]/_components/SearchParamComponent";
import { useTranslations } from "next-intl";
import DeleteUserProfileButton from "./_components/DeleteUserProfileButton";
import { useDeleteCurrentUserMutation } from "@/redux/slices/api/userApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

const ProfilePage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [deletePostProfilePage] = useDeletePostProfilePageMutation();
  const [deleteCurrentUser] = useDeleteCurrentUserMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: postsResponse,
    refetch,
    isLoading: loadingPost,
  } = useGetPostsQuery(`?page=${currentPage}&user=${resolvedParams.userId}`);
  const { data: user } = useGetOneUserQuery(resolvedParams.userId);
  console.log("user", user);

  let filterdPosts;
  if (!loadingPost) {
    filterdPosts = postsResponse?.posts.filter(
      (post) => post.user.id === user?.id
    );
  }
  const t = useTranslations("profilePage");

  const onDeleteCurrentUser = async () => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete your account?",
        icon: "warning",
        dangerMode: true,
      });

      if (willDelete) {
        await deleteCurrentUser({}).unwrap();
        await logout({}).unwrap();
        dispatch(logoutAction());
        router.push("/");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to delete account";
      toast.error(errorMessage);
    }
  };
  return (
    <Container sx={{ alignItems: "center", justifyContent: "center" }}>
      <Stack
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          py: 5,
          minHeight: "calc(100vh - 68.5px)",
        }}
      >
        <SearchParamComponent returnPath="/admin-dashboard/users" />
        {user?.profileImage?.url ? (
          <Box
            sx={{
              width: { xs: "100%", md: 1000 },
              height: { xs: 300, md: 500 },
              position: "relative",
              marginTop: 2,
            }}
          >
            <Image
              src={user.profileImage?.url}
              alt={user.firstName}
              fill
              style={{ borderRadius: 10, objectFit: "contain" }}
            />
          </Box>
        ) : (
          <Box sx={{ my: 5 }}></Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            justifyContent: { md: "center" },
          }}
        >
          <Typography
            sx={{
              marginTop: 1,
              fontSize: { xs: "16px", md: "20px" },
              mr: { md: "20px" },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {t("name")} :
            </Typography>{" "}
            {user?.firstName + " " + user?.lastName}
          </Typography>

          <Typography
            sx={{ marginTop: 1, fontSize: { xs: "16px", md: "20px" } }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {t("email")} :
            </Typography>{" "}
            {user?.email}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            justifyContent: { md: "center" },
          }}
        >
          <Stack
            sx={{
              marginTop: 1,
              fontSize: { xs: "16px", md: "20px" },
              mr: { md: "20px" },
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              // component="span"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {t("registerd-at")}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px", display: "block" },
                alignContent: "flex-start",
                fontWeight: "bold",
                color: "secondary.main",
              }}
            >
              : {user?.createdAt.substring(0, 10)}
            </Typography>
          </Stack>

          <Typography
            sx={{ marginTop: 1, fontSize: { xs: "16px", md: "20px" } }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {t("role")} :
            </Typography>{" "}
            {user?.role}
          </Typography>
        </Box>

        <Stack sx={{ mt: 5, alignItems: "center", width: "100%" }}>
          {user?.id && <EditUserProfileButton userId={user?.id} />}
        </Stack>

        <Stack sx={{ mt: 1, alignItems: "center", width: "100%" }}>
          {user?.id && (
            <DeleteUserProfileButton
              userId={user?.id}
              onDeleteCurrentUser={onDeleteCurrentUser}
            />
          )}
        </Stack>

        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {postsResponse?.posts && postsResponse?.posts?.length < 1
            ? "No Posts for this user"
            : `${user?.firstName} ${t("posts")} : `}
        </Typography>
        <Stack sx={{ width: "100%" }}>
          {postsResponse && (
            <PostsComponent
              pagination={postsResponse?.pagination}
              posts={filterdPosts as IPost[]}
              refetchPosts={refetch}
              setCurrentPage={setCurrentPage}
              page={currentPage}
              userId={+resolvedParams.userId}
              deletePost={(args) => {
                // Ensure userId is a number and remove extra fields
                const { id, page, userId } = args;
                if (typeof userId !== "number") return;
                deletePostProfilePage({ id, page, userId });
              }}
            />
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
