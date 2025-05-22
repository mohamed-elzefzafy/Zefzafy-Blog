"use client";
import { useAppSelector } from "@/redux/hooks";
import { useToggleLikePostMutation } from "@/redux/slices/api/postApiSlice";
import { IPost } from "@/types/post";
import { ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  return (
      <Stack
      flexDirection={"row"}
      gap={2}
      mt={2}
      justifySelf={"center"}
      alignItems={"center"}
    >
      {post?.likes?.find((like) => like.id === userInfo.id) ? (
<>
{(userInfo.email && userInfo.isAccountVerified) &&         <ThumbUpAlt
        sx={{
          color: "info.main",
          fontSize: "40px",
          cursor: "pointer",
          "&:hover": { fontSize: "41px" },
          transition: "all 0.3s ease-in-out",
        }} 
          onClick={onToggleLikePost}
        />}
</>
      ) : (
  <>
  {(userInfo.email && userInfo.isAccountVerified) &&       <ThumbUpOffAlt
          sx={{
            color: "info.main",
            fontSize: "40px",
            cursor: "pointer",
            "&:hover": { fontSize: "41px" },
            transition: "all 0.3s ease-in-out",
          }} 
          onClick={onToggleLikePost}
        />}
  </>
      )}

      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        {" "}
        <Typography
          component={"span"}
          sx={{ color: "error.main", fontWeight: "bold", fontSize: "20px" }}
        >
          {post?.likes?.length}
        </Typography>{" "}
        {post?.likes?.length > 1 ? "likes" : "like"}
      </Typography>
    </Stack>
  );
};

export default ToggleLikePost;
