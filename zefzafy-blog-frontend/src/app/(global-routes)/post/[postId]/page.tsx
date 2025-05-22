import { IPost } from "@/types/post";
import axiosRequest from "@/utils/request";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CreateAndDisplayComments from "./_components/CreateAndDisplayComments";
import ToggleLikePost from "./_components/ToggleLikePost";
import EditPostButton from "./_components/EditPostButton";
import Link from "next/link";
import SearchParamComponent from "./_components/SearchParamComponent";


 
const PostPage = async ({ params }: { params: Promise<{ postId: string }> })=> {

  if (!(await params).postId) return
  const { data: post } = await axiosRequest.get<IPost>(
    `/api/v1/post/${(await params).postId}`
  );

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
        <SearchParamComponent returnPath={"/admin-dashboard/posts"} />
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        {post?.image?.url ? (
          <Box
            sx={{
              width: { xs: "100%", md: 1000 },
              height: { xs: 300, md: 500 },
              position: "relative",
              marginTop: 2,
            }}
          >
            <Image
              src={post.image?.url}
              alt={post.title}
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
              Written By
            </Typography>{" "}
            :{" "}
            <Link href={`/profile/${post?.user.id}`}>
              {post.user.firstName + " " + post.user.lastName}
            </Link>
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
              Category
            </Typography>{" "}
            : {post.category.title}
          </Typography>
        </Box>

        <Typography
          sx={{
            marginTop: 1,
            fontSize: { xs: "16px", md: "20px", display: "block" },
            alignContent: "flex-start",
            fontWeight: "bold",
            color: "secondary.main",
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
            Written At
          </Typography>{" "}
          : {post?.updatedAt.substring(0, 10)}
        </Typography>
        <EditPostButton postAutherId={post.user.id} postId={post.id} />
        <Stack sx={{ mt: 2, alignItems: "flex-start", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "error.main", fontWeight: "bold" }}
          >
            Post content :{" "}
          </Typography>
          <Typography
            sx={{
              marginTop: 2,
              fontSize: { xs: "16px", md: "20px" },
              width: "100%",
              borderBottom: 1,
              borderColor: "grey.300",
              pb: 2,
            }}
          >
            {post.content}
          </Typography>
          <ToggleLikePost post={post} />
        </Stack>

        <Stack sx={{ mt: 5, alignItems: "flex-start", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "error.main", fontWeight: "bold" }}
          >
            {post.comments.length < 1
              ? "No Comments on this post"
              : "Post comments"}{" "}
            :{" "}
          </Typography>
          <CreateAndDisplayComments post={post} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostPage;
