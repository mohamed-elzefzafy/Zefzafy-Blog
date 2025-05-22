"use client";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const EditPostButton = ({postAutherId , postId} : {postAutherId : number , postId : number}) => {
  const { userInfo } = useAppSelector((state) => state?.auth);
  return (
  <>
  {userInfo.id === postAutherId ?
   (  <Box
   component={Link}
   href={`/edit-post/${postId}`}
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
      my:3,
    }}
  >
    <Button endIcon={<Edit />} variant="text" size="large" color="secondary">
      Edit Post
    </Button>
  </Box>) 
   : 
   (<Box></Box>)
   }
  
  </>
  );
};

export default EditPostButton;
