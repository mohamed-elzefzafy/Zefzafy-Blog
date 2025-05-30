"use client";
import { useAppSelector } from "@/redux/hooks";
import { useToggleLikePostMutation } from "@/redux/slices/api/postApiSlice";
import { IPost } from "@/types/post";
import { Close, ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { array } from "zod";
import LikesNamesModal from "./LikesNamesModal";
import { useTranslations } from "next-intl";

const ToggleLikePost = ({ post }: { post: IPost }) => {
  const router = useRouter();
  const [toggleLikePost] = useToggleLikePostMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const onToggleLikePost = async () => {
    try {
      await toggleLikePost(post.id).unwrap();
      // toast.success("you have liked the post successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to like the post");
      console.error(error);
    }
  };
  console.log(userInfo);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const t = useTranslations("postPage");
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      mt={2}
      justifySelf={"center"}
      alignItems={"center"}
    >
      {/* likes modal  */}

      <LikesNamesModal
        data={post}
        open={open}
        setOpen={setOpen}
        likedType={`${t("post-inlikes")}`}
      />

      {post?.likes?.find((like) => like.id === userInfo.id) ? (
        <>
          {userInfo.email && userInfo.isAccountVerified && (
            <ThumbUpAlt
              sx={{
                color: "info.main",
                fontSize: "40px",
                cursor: "pointer",
                "&:hover": { fontSize: "41px" },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={onToggleLikePost}
            />
          )}
        </>
      ) : (
        <>
          {userInfo.email && userInfo.isAccountVerified && (
            <ThumbUpOffAlt
              sx={{
                color: "info.main",
                fontSize: "40px",
                cursor: "pointer",
                "&:hover": { fontSize: "41px" },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={onToggleLikePost}
            />
          )}
        </>
      )}

      <Typography
        sx={{ fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
        onClick={() => {
          handleOpen();
          post.likes.map((like) =>
            console.log(like.firstName + " " + like.lastName)
          );
        }}
      >
        {" "}
        <Typography
          component={"span"}
          sx={{ color: "error.main", fontWeight: "bold", fontSize: "20px" }}
        >
          {post?.likes?.length}
        </Typography>{" "}
        {post?.likes?.length > 1 ? t("likes") : t("like")}
      </Typography>
    </Stack>
  );
};

export default ToggleLikePost;
