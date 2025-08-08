"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  useCreateCommentMutation,
  useDeleteCommentByAdminMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/slices/api/commentApiSlice";
import { ICommentDto } from "@/types/comments";
import { IPost } from "@/types/post";
import { Delete, Edit } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LikesNamesModal from "./LikesNamesModal";
import ToggleLikeComment from "./ToggleLikeComment";
import { useTranslations } from "next-intl";

const CreateAndDisplayComments = ({ post }: { post: IPost }) => {
  const router = useRouter();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [deleteCommentByAdmin] = useDeleteCommentByAdminMutation();

  // State to track which comment is being edited and its text
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const { userInfo } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ICommentDto>();

  const onSubmit = async (values: ICommentDto) => {
    const body = { text: { text: values.text }, postId: post.id };
    try {
      await createComment(body).unwrap();
      router.refresh();
      toast.success("You have created comment successfully");
      reset();
    } catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };

  const startEditing = (comment: { text: string; id: number }) => {
    setEditingCommentId(comment?.id);
    setEditedText(comment.text);
  };

  const onUpdateComment = async (commentId: number) => {
    if (!editedText.trim()) {
      toast.error("Comment text cannot be empty");
      return;
    }

    const body = { text: { text: editedText }, postId: post.id, commentId };
    try {
      await updateComment(body).unwrap();
      toast.success("You have updated comment successfully");
      setEditingCommentId(null); // Exit editing mode
      setEditedText(""); // Clear text
      router.refresh();
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedText("");
  };

  const onDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("comment deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const onDeleteCommentByAdmin = async (commentId: number) => {
    try {
      await deleteCommentByAdmin(commentId).unwrap();
      toast.success("comment deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };


    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

    const t = useTranslations("createAndDisplayComments");
  return (
    <>
      {userInfo.email && (
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            mx: "auto",
            mt: 5,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {t("create-comment")}
          </Typography>

          <TextField
            type="text"
            placeholder={t("comment")}
            label={
              userInfo.isAccountVerified
                ? t("write-comment")
                : t("verify-your-account to-write-comment")
            }
            sx={{ width: "100%" }}
            {...register("text", { required: "Text is required" })}
            error={errors.text ? true : false}
            helperText={errors.text && "Text is required"}
            disabled={!userInfo.isAccountVerified}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "capitalize", width: "200px" }}
            disabled={isSubmitting || !isValid}
          >
            {userInfo.isAccountVerified
              ? t("write-comment")
                : t("verify-your-account to-write-comment")}
          </Button>
        </Stack>
      )}

      <Stack sx={{ width: "100%" }}>
        {post.comments?.map((comment) => (
          <Stack
            key={comment.id}
            sx={{
              width: "100%",
              boxShadow: 2,
              my: 1,
              p: 2,
              borderRadius: 2,
              border: `0.2px solid ${grey[500]}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {comment?.user?.firstName + " " + comment?.user?.lastName + ":"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
            >
              {comment.createdAt.substring(0, 10)}
            </Typography>
            {editingCommentId === comment.id ? (
              // Edit mode
              <Stack sx={{ mt: 2, alignItems: "flex-start", width: "100%" }}>
                <TextField
                  type="text"
                  placeholder={t("comment")}
                  label={t("edit-your-comment-here")}
                  sx={{ width: "50%" }}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <Stack direction="row" sx={{ mt: 2, gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    disabled={!editedText.trim()}
                    onClick={() => onUpdateComment(comment.id)}
                  >
                    {t("save")}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ textTransform: "capitalize" }}
                    onClick={cancelEditing}
                  >
                    {t("cancel")}
                  </Button>
                </Stack>
              </Stack>
            ) : (
              // Display mode
              <>
              <Typography variant="body1" sx={{ mb: "2px" }}>
                {comment.text}
              </Typography>
              <ToggleLikeComment comment={comment}/>
              </>
            )}
            {userInfo.id === comment.user.id && (
              
              <Stack sx={{ flexDirection: "row", gap: 4, mt: 3  }}>
                <Edit
                  color="info"
                  sx={{ cursor: "pointer" }}
                  onClick={() => startEditing(comment)}
                />
                <Delete
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => onDeleteComment(comment.id)}
                />
              </Stack>
            )}
            {userInfo.role === "admin" && comment.user.id !== userInfo.id && (
              <Delete
                color="error"
                sx={{ cursor: "pointer" ,mt:3}}
                onClick={() => onDeleteCommentByAdmin(comment.id)}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default CreateAndDisplayComments;
