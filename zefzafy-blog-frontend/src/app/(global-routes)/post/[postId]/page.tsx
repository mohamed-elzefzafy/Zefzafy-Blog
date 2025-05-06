import { IUserInfo } from "@/types/auth";
import { IPost } from "@/types/post";
import axiosRequest from "@/utils/request";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CreateCommentForm from "./_components/CreateCommentForm";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const { data: post } = await axiosRequest.get<IPost>(
    `/api/v1/post/${params.postId}`
  );
  console.log(post);

  const { data: user } = await axiosRequest.get<IUserInfo>(
    `/api/v1/users/${post.user.id}`
  );
  console.log(user);

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
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        {post.image?.url ? (
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
            : {post.user.firstName + " " + post.user.lastName}
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
              // textAlign: { xs: "justify", md: "center" },
              width: "100%",
            }}
          >
            {post.content}
          </Typography>
          {/* TODO:like  */}
          <Box>like</Box>
        </Stack>

        <Stack sx={{ mt: 5, alignItems: "flex-start", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "error.main", fontWeight: "bold" }}
          >
            Post comments :{" "}
          </Typography>
          <CreateCommentForm post={post} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostPage;
