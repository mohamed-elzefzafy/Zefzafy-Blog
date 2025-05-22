"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { use, useState } from "react";
import PostsComponent from "../../(home)/_componens/PostsComponent";
import { useGetOneUserQuery } from "@/redux/slices/api/authApiSlice";
import {
  useDeletePostProfilePageMutation,
  useGetPostsQuery,
} from "@/redux/slices/api/postApiSlice";
import { IPost } from "@/types/post";
import EditUserProfileButton from "./_components/EditUserProfileButton";
import {useRouter } from "next/navigation";
import SearchParamComponent from "../../post/[postId]/_components/SearchParamComponent";

const ProfilePage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [deletePostProfilePage] = useDeletePostProfilePageMutation();
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
  <SearchParamComponent returnPath="/admin-dashboard/users"/>
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
                color: "error.main",
              }}
            >
              Name :
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
                color: "error.main",
              }}
            >
              Email :
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
                color: "error.main",
              }}
            >
              Registerd At :
            </Typography>{" "}
            {user?.createdAt?.substring(0, 10)}
          </Typography>

          <Typography
            sx={{ marginTop: 1, fontSize: { xs: "16px", md: "20px" } }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "bold",
                color: "error.main",
              }}
            >
              Role :
            </Typography>{" "}
            {user?.role}
          </Typography>
        </Box>

        <Stack sx={{ mt: 5, alignItems: "flex-start", width: "100%" }}></Stack>
        {user?.id && <EditUserProfileButton userId={user?.id} />}

        <Typography
          variant="h6"
          sx={{ color: "error.main", fontWeight: "bold" }}
        >
          {postsResponse?.posts && postsResponse?.posts?.length < 1
            ? "No Posts for this user"
            : `${user?.firstName} Posts : `}
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
