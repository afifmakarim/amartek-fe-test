import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewPost } from "../../redux/actions/postActions";
import { CLEAR_ERROR } from "../../redux/types";
import { Dispatch } from "redux";
import {
  Modal,
  Fade,
  TextField,
  Paper,
  Stack,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalAddPost({ userId, open, handleClose }: any) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { isError, message } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (isError === true) {
      toast.error(message);
      dispatch({
        type: CLEAR_ERROR,
      });
    }

    if (isError === false) {
      toast.success("Post added successfully!");
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  }, [isError, toast, dispatch]);

  const handleSubmit = async () => {
    console.log("TRIGGER HANDLE SUBMIT");

    if (!title || !body) {
      toast.error("Input field wajib diisi!");
    } else {
      dispatch(addNewPost(userId.userId, { title, body }));
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
    >
      <Fade in={open}>
        <Paper sx={style}>
          <Typography variant="h5" gutterBottom>
            Create New Post
          </Typography>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              value={title}
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <TextField
              fullWidth
              label="Body"
              size="medium"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            /> */}
            <ReactQuill theme="snow" value={body} onChange={setBody} />

            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
}
