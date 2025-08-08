import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SearchParamComponent from "./SearchParamComponent";
import Image from "next/image";
import EditPostButton from "./EditPostButton";
import ToggleLikePost from "./ToggleLikePost";
import CreateAndDisplayComments from "./CreateAndDisplayComments";
import { IPost } from "@/types/post";
import { useTranslations } from "next-intl";

const PostContent = ({ post }: { post: IPost }) => {
  const t = useTranslations("postPage");
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

        <Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: { xs: "flex-start", sm: "center" },
              width: "100%",
              gap: { xs: 1, md: 2 },
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
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
                {t("written-by")}
              </Typography>{" "}
              : {post.user.firstName + " " + post.user.lastName}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
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
                {t("category")}
              </Typography>{" "}
              : {post.category.title}
            </Typography>
          </Box>

          {/* Name & Emailllllllllllllll */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: { xs: "flex-start", sm: "center" },
              width: "100%",
              gap: { xs: 1, md: 2 },
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
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
                {t("written-at")}
              </Typography>{" "}
              : {post?.createdAt.substring(0, 10)}
            </Typography>
          </Box>
        </Stack>

        <EditPostButton postAutherId={post.user.id} postId={post.id} />

        <Stack sx={{ mt: 2, alignItems: "flex-start", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {t("Post-content")}{" "}
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
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {post.comments.length < 1
              ? t("no-comments-on-this-post")
              : t("post-comments")}
          </Typography>
          <CreateAndDisplayComments post={post} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostContent;
