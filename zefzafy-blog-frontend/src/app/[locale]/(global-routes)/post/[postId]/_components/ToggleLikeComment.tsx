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
import { IComments } from "@/types/comments";
import { useToggleLikeCommentMutation } from "@/redux/slices/api/commentApiSlice";
import { useTranslations } from "next-intl";

const ToggleLikeComment = ({ comment }: { comment: IComments }) => {
  const router = useRouter();
  const [toggleLikeComment] = useToggleLikeCommentMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const onToggleLikeComment = async () => {
    try {
      await toggleLikeComment(comment?.id).unwrap();
      // toast.success("you have liked the Comment successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to like the comment");
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
        data={comment}
        open={open}
        setOpen={setOpen}
        likedType={`${t("comment-inlikes")}`}
      />

      {comment?.likes?.find((like) => like.id === userInfo.id) ? (
        <>
          {userInfo.email && userInfo.isAccountVerified && (
            <ThumbUpAlt
              sx={{
                color: "info.main",
                fontSize: "30px",
                cursor: "pointer",
                "&:hover": { fontSize: "31px" },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={onToggleLikeComment}
            />
          )}
        </>
      ) : (
        <>
          {userInfo.email && userInfo.isAccountVerified && (
            <ThumbUpOffAlt
              sx={{
                color: "info.main",
                fontSize: "30px",
                cursor: "pointer",
                "&:hover": { fontSize: "31px" },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={onToggleLikeComment}
            />
          )}
        </>
      )}

      <Typography
        sx={{ fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
        onClick={() => {
          handleOpen();
          comment.likes.map((like) =>
            console.log(like.firstName + " " + like.lastName)
          );
        }}
      >
        {" "}
        <Typography
          component={"span"}
          sx={{ color: "primary.main", fontWeight: "bold", fontSize: "20px" }}
        >
          {comment?.likes?.length} 
        </Typography>{" "}
        {comment?.likes?.length > 1 ? t("likes") : t("like")}
      </Typography>
    </Stack>
  );
};

export default ToggleLikeComment;
