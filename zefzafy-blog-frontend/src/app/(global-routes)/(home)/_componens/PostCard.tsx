// "use client";
import { useAppSelector } from "@/redux/hooks";
import { useDeletePostMutation } from "@/redux/slices/api/postApiSlice";
import { IPost } from "@/types/post";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import swal from "sweetalert";

interface PostCardProps {
  post: IPost;
  refetchPosts: () => void;
}

export default function PostCard({
  post: { title, content, image, category, id, user },
  refetchPosts,
}: PostCardProps) {
  const router = useRouter();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [deletePost] = useDeletePostMutation();

  const onDeletePost = async (id: number) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this Post?",
        icon: "warning",
        dangerMode: true,
      });

      if (willDelete) {
        await deletePost(id).unwrap();
        toast.success("Post deleted successfully");
        refetchPosts();
        router.refresh(); // This should trigger a refetch if your data is coming from server
      }
    } catch (error) {
      console.error("Delete post error:", error);
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to delete post";
      toast.error(errorMessage);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: { xs: 700, lg: 500 },
        height: 250,
        wordBreak: "break-word",
      }}
    >
      {image?.url ? (
        <CardMedia
          component="img"
          sx={{ width: 160 }}
          image={image.url}
          alt={title}
        />
      ) : (
        <Box
          sx={{
            width: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: blue[100],
            p: 2,
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "black" }}>
            {title}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Category : {category?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Auther : {user?.firstName + " " + user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" ,mt: 2 }}>
            {content.slice(0, 80)}
            {content.length > 80 ? "..." : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            sx={{textTransform: "capitalize"}}
            onClick={() => router.push(`/post/${id}`)}
          >
            Read More
          </Button>
          {(userInfo.id === user.id || userInfo.role === "admin") && (
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => onDeletePost(id)}
              sx={{textTransform: "capitalize"}}
            >
              Delete Post
            </Button>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}
