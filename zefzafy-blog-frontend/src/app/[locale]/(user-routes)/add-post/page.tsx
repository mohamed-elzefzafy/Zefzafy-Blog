"use client";
import { useGetCategoriesQuery } from "@/redux/slices/api/categoryApiSlice";
import { useCreatePostMutation } from "@/redux/slices/api/postApiSlice";
import { IPostData } from "@/types/post";
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
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddPostPage = () => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const [image, setImage] = useState<File | null>();
  const [category, setCategory] = useState("");
  const { data: categoriesResponse } = useGetCategoriesQuery();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<IPostData>();

  const onSubmit = async (values: IPostData) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const post = await createPost(formData).unwrap();

      toast.success("you have created post successfully");
      reset();
      setImage(null);
      // setTimeout(() => {
      router.push(`/`);
      // }, 2000);
    } catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };

  
  const t = useTranslations("AddPost");


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
        {t("add-Post")}
        <Tooltip
          title={"back to home page"}
          placement="right-end"
          enterDelay={200}
        >
          <IconButton onClick={() => router.push(`/`)}>
            <KeyboardDoubleArrowRight sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
      </Typography>
      <TextField
        type="text"
        placeholder={t("title")}
        label={t("title")}
        sx={{ width: "100%" }}
        {...register("title", { required: "title is required" })}
        error={errors.title ? true : false}
        helperText={errors.title && "title is required"}
      />
      <TextField
        type="text"
        placeholder={t("content")}
        multiline
        rows={4}
        label={t("content")}
        sx={{ width: "100%" }}
        {...register("content", { required: "content is required" })}
        error={errors.content ? true : false}
        helperText={errors.content && "content is required"}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">{t("category")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("category", { required: "category is required" })}
          label={t("category")}
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

      {image && (
        <Image
          src={URL.createObjectURL(image)}
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
          alt="post Image"
        />
      )}
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
      {t("add-Post")}
      </Button>
    </Stack>
  );
};

export default AddPostPage;
