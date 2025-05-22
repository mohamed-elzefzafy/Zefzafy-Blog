"use client";
import { useAppSelector } from "@/redux/hooks";
import { useUpdatePasswordMutation } from "@/redux/slices/api/authApiSlice";
import { useGetCategoriesQuery } from "@/redux/slices/api/categoryApiSlice";
import { useUpdateCommentMutation } from "@/redux/slices/api/commentApiSlice";
import {
  useGetOnePostQuery,
  useUpdatePostMutation,
} from "@/redux/slices/api/postApiSlice";
import { IPostData2 } from "@/types/post";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditPostPage = ({ params }: { params: Promise<{ postId: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);

  const { data: post, isLoading: isPostLoading } = useGetOnePostQuery(resolvedParams.postId);
  const [updatePost] = useUpdatePostMutation();
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const { userInfo } = useAppSelector((state) => state?.auth);

  useEffect(() => {
    if (post?.category?.id) {
      setCategory(post.category.id);
    }
  }, [post]);

  // Check if the user is authorized to edit the post
  useEffect(() => {
    if (isPostLoading || !post || !userInfo) {
      return; // Wait until post and userInfo are loaded
    }

    if (Number(post.user.id) !== Number(userInfo.id)) {
      router.push("/"); // Redirect if the user is not the post author
    }
  }, [post, userInfo, isPostLoading, router]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm<IPostData2>();

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
      setValue("category", Number(post?.category.id));
      setCategory(post.category.id);
    }
  }, [post, setValue]);

  const onSubmit = async (values: IPostData2) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await updatePost({
        payLoad: formData,
        postId: resolvedParams.postId,
      }).unwrap();
      reset();
      toast.success("You have updated the post successfully");
      setImage(null);
      router.push(`/post/${resolvedParams.postId}`);
    } catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };

  // Show a loading state while fetching post data
  if (isPostLoading) {
    return <Typography>Loading...</Typography>;
  }

  // Render the form only if the user is authorized
  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: { xs: "70%", md: "30%" },
        mx: "auto",
        mt: 5,
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6" component="h2">
        Update Post{" "}
        <Tooltip title={"back to post page"} placement="right-end" enterDelay={200}>
          <IconButton
            onClick={() => router.push(`/post/${resolvedParams.postId}`)}
          >
            <KeyboardDoubleArrowRight sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
      </Typography>
      <TextField
        type="text"
        placeholder="title"
        defaultValue={post?.title}
        label="Title"
        sx={{ width: "100%" }}
        {...register("title", {
          required: "title is required",
          maxLength: {
            value: 40,
            message: "Title must be 40 characters or less",
          },
        })}
        error={errors.title ? true : false}
        helperText={errors.title && "title is required"}
      />
      <TextField
        type="text"
        placeholder="content"
        defaultValue={post?.content}
        multiline
        rows={4}
        label="Content"
        sx={{ width: "100%" }}
        {...register("content", { required: "content is required" })}
        error={errors.content ? true : false}
        helperText={errors.content && "content is required"}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("category", { required: "category is required" })}
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoriesResponse?.categories?.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
        {errors.category && (
          <FormHelperText error>{errors.category.message}</FormHelperText>
        )}
      </FormControl>

      {image ? (
        <Image
          src={URL.createObjectURL(image)}
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
          alt="post Image"
        />
      ) : post?.image?.url ? (
        <Image
          src={post?.image?.url}
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
          alt="post Image"
        />
      ) : null}
      <TextField
        label="Profile Image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, textTransform: "capitalize", width: "100%" }}
        disabled={isSubmitting}
      >
        Save
      </Button>
    </Stack>
  );
};

export default EditPostPage;