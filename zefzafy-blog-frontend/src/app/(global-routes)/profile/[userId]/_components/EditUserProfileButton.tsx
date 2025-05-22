"use client";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const EditUserProfileButton = ({userId } : {userId : number}) => {
  const { userInfo } = useAppSelector((state) => state?.auth);
  return (
  <>
  {userInfo.id === userId ?
   (  <Box
   component={Link}
   href={`/edit-user/${userId}`}
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
    <Button endIcon={<Edit />} variant="text" size="large" color="secondary" sx={{fontWeight: "bold" , textTransform: "capitalize"}}>
      Edit User Profile
    </Button>
  </Box>) 
   : 
   (<Box></Box>)
   }
  
  </>
  );
};

export default EditUserProfileButton;
