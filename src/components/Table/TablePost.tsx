import {
  Container,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  CircularProgress,
  Stack,
  TableFooter,
  TablePagination,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { fetchUserPost } from "../../redux/actions/postActions";
import ModalAddPost from "../Modal/ModalAddPost";
import ModalDeleteConfirmation from "../Modal/ModalDeleteConfirmation";

export default function TablePost(userId: any) {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch(fetchUserPost(userId));
  }, []);

  const { isError, message, postList } = useSelector(
    (state: any) => state.post
  );

  console.log(postList);

  if (postList.length === 0) {
    <p>Loading...</p>;
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPrompt, setOpenPrompt] = useState(false);
  const handleOpenPrompt = () => setOpenPrompt(true);
  const handleClosePrompt = () => setOpenPrompt(false);

  return (
    <Container maxWidth="lg">
      <Button
        variant="contained"
        size="small"
        sx={{ marginY: "20px" }}
        onClick={handleOpen}
      >
        Add NEW POST
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {postList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <p>No Post Yet</p>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {postList.length > 0 &&
                  postList.map((item: any, idx: any) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell align="right"> {item.title}</TableCell>
                      <TableCell align="right">
                        <div dangerouslySetInnerHTML={{ __html: item.body }} />
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleOpenPrompt()}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={postList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ModalAddPost userId={userId} open={open} handleClose={handleClose} />

      <ModalDeleteConfirmation
        isPost={true}
        open={openPrompt}
        handleClose={handleClosePrompt}
      />
    </Container>
  );
}
