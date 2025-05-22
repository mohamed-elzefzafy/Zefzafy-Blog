"use client";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "@/redux/slices/api/categoryApiSlice";
import { useCreatePostMutation } from "@/redux/slices/api/postApiSlice";
import { IAddCategory } from "@/types/category";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddCategoryAdminPage = () => {
  const router = useRouter();
  const [createCategory] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<IAddCategory>();

  const onSubmit = async (values: IAddCategory) => {
    try {
      const category = await createCategory(values).unwrap();

      toast.success("you have created category successfully");
      reset();
      setTimeout(() => {
      router.push(`/admin-dashboard/categories`);
      }, 1000);
    } catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };
  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: { xs: "70%", md: "40%" },
        mx: "auto",
        height: {xs : "calc(100vh - 8rem)" , sm : "calc(100vh - 9rem)"},
        mt: 10,
        display: "flex",
        alignItems: "flex-start",
        justifyItems: "center",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <Typography variant="h6" component="h2" sx={{ml :2}}>
        Add Category
        <Tooltip
          title={"back to Categories admin dashboard"}
          placement="right-end"
          enterDelay={200}
        >
          <IconButton onClick={() => router.push(`/admin-dashboard/categories`)}>
            <KeyboardDoubleArrowRight sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
      </Typography>
      <TextField
        type="text"
        placeholder="title"
        label="Title"
        sx={{ width: "100%" }}
        {...register("title", { required: "title is required" })}
        error={errors.title ? true : false}
        helperText={errors.title && "title is required"}
      />
  



      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, textTransform: "capitalize", width: "100%" }}
        disabled={isSubmitting}
      >
        Add Category
      </Button>
    </Stack>
  );
};

export default AddCategoryAdminPage;
