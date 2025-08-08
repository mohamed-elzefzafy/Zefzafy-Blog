"use client";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EditPostButton = ({
  postAutherId,
  postId,
}: {
  postAutherId: number;
  postId: number;
}) => {
  const { userInfo } = useAppSelector((state) => state?.auth);
  const router = useRouter();
  const t = useTranslations("postPage");
  return (
    <>
      {userInfo.id === postAutherId ? (
        <Button
          endIcon={<Edit />}
          variant="text"
          size="large"
          color="primary"
          sx={{textTransform : "capitalize" ,mt:2}}
          onClick={() => router.push(`/edit-post/${postId}`)}
        >
          {t("update-post")}
        </Button>
      ) : (
        <Box></Box>
      )}
    </>
  );
};

export default EditPostButton;
