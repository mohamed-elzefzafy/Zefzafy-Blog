"use client";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

const DeleteUserProfileButton = ({
  onDeleteCurrentUser,
  userId
}: {
  onDeleteCurrentUser: () => void;
  userId: number
}) => {
  const { userInfo } = useAppSelector((state) => state?.auth);

  const t = useTranslations("profilePage");
  return (
    <>
      {userInfo.id === userId ? (
        <Box
          sx={{
            borderBlockColor: "secondary.main",
            borderBlockWidth: 1,
            borderBlockStyle: "solid",
            borderRadius: 2,
            padding: 1,
            width: "50%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            my: 3,
          }}
        >
          <Button
            endIcon={<Edit />}
            variant="text"
            size="large"
            color="error"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            onClick={onDeleteCurrentUser}
          >
            {t("delete-my-account")}
          </Button>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default DeleteUserProfileButton;
