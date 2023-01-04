import {
  Button,
  Dialog,
  Modal,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Fade,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "../../redux/types";
import { deleteUser } from "../../redux/actions/userActions";

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

export default function ModalDeleteConfirmation({
  userId,
  open,
  handleClose,
  isPost,
}: any) {
  const { isError, message, type } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (isError === true) {
      toast.error(message);
      dispatch({
        type: CLEAR_ERROR,
      });
    }

    if (isError === false && type === "DELETE") {
      toast.success("Data Deleted successfully!");
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  }, [isError, toast, dispatch]);

  const handleDelete = async () => {
    console.log("TRIGGER HANDLE DELETE");
    dispatch(deleteUser(userId));
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper sx={style}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
              Are you sure you want to delete ID {userId} ?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              {isPost ? (
                <Button color="primary" onClick={() => alert("do nothing")}>
                  Confirm
                </Button>
              ) : (
                <Button color="primary" onClick={handleDelete}>
                  Confirm
                </Button>
              )}
            </DialogActions>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
