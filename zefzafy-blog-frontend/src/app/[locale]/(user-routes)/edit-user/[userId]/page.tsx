"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateUserMutation } from "@/redux/slices/api/authApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { IUserUpdate } from "@/types/auth";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageIcon from "@mui/icons-material/Image";

const EditUserProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state?.auth);
  const [updateUser] = useUpdateUserMutation();
  const [profileImage, setProfileImage] = useState<File | null>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<IUserUpdate>();

  const onSubmit = async (values: IUserUpdate) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("firstName", values.firstName || "");
    formData.append("lastName", values.lastName || "");
    if (values.password) {
      formData.append("password", values.password);
    } else if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const user = await updateUser(formData).unwrap();

      toast.success("you have successfully registered");
      dispatch(setCredentials({ ...user }));
      reset();
      setProfileImage(null);
      setTimeout(() => {
        router.push(`/profile/${userInfo.id}`);
      }, 2000);
    } catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };

  const t = useTranslations("UpdateProfilePage");
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
      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
        {t("update-profile")}
      </Typography>
      <TextField
        type="text"
        placeholder={t("first-name")}
        defaultValue={userInfo?.firstName}
        label={t("first-name")}
        sx={{ width: "100%" }}
        {...register("firstName", { required: "first name is required" })}
        error={errors.firstName ? true : false}
        helperText={errors.firstName && "first name is required"}
      />
      <TextField
        type="text"
        placeholder={t("last-name")}
        defaultValue={userInfo?.lastName}
        label={t("last-name")}
        sx={{ width: "100%" }}
        {...register("lastName", { required: "Last name is required" })}
        error={errors.lastName ? true : false}
        helperText={errors.lastName && "Last name is required"}
      />

      {profileImage ? (
        <Image
          src={URL.createObjectURL(profileImage)}
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
          alt="profileImage"
        />
      ) : userInfo.profileImage?.url ? (
        <Image
          src={userInfo.profileImage.url}
          width={200}
          height={200}
          style={{ objectFit: "contain", borderRadius: "5px" }}
          alt="profileImage"
        />
      ) : null}
      <Button
        component="label"
        variant="outlined"
        fullWidth
        sx={{ textTransform: "capitalize" }}
        startIcon={<ImageIcon />}
      >
        {profileImage ? "post image selected" : "Upload post image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{ textTransform: "capitalize", position: "relative" }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress
              size={24}
              sx={{
                color: "white",
              }}
            />
          </>
        ) : (
          "update"
        )}
      </Button>
    </Stack>
  );
};

export default EditUserProfile;
