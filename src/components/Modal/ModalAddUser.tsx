import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  TextField,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../../redux/actions/userActions";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "../../redux/types";

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

export default function ModalAddUser({ open, handleClose }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const { isError, message, type } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (isError === true) {
      toast.error(message);
      dispatch({
        type: CLEAR_ERROR,
      });
    }

    if (isError === false && type === "ADD") {
      toast.success("Data added successfully!");
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  }, [isError, toast, dispatch]);

  const handleSubmit = async () => {
    console.log("TRIGGER HANDLE SUBMIT");

    if (!name || !email || !gender || !status) {
      toast.error("Input field wajib diisi!");
    } else {
      dispatch(addNewUser({ name, email, gender, status }));
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
            Create New User
          </Typography>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Name"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
}
