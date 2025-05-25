import { IComments } from "@/types/comments";
import { IPost } from "@/types/post"
import { Box, Modal, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 270 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "500px",
  overflowY: "auto",
};

interface LikesNamesModalProps {
data :IPost | IComments,
setOpen : (open : boolean)=>void,
open : boolean,
likedType : string
}
const LikesNamesModal = ({data , open , setOpen , likedType} : LikesNamesModalProps) => {
  
  
  const handleClose = () => setOpen(false);
  return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Close onClick={handleClose}/> */}
            <Typography
              id="modal-modal-title"
              // variant="h6"
              component="h2"
              color="secondary"
            >
              people likes {likedType} :
            </Typography>
  
            {data.likes.map((like) => (
            <Stack key={like.id}>
                <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                
                component={Link}
                href={`/profile/${like.id}`}
              >
                {like.firstName + " " + like.lastName}
              </Typography>
            </Stack>
            ))}
          </Box>
        </Modal>
  )
}

export default LikesNamesModal