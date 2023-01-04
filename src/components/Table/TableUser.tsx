import {
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableFooter,
  TablePagination,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserList } from "../../redux/actions/userActions";
import { getAllUser } from "../../services/user-services";
import ModalAddUser from "../Modal/ModalAddUser";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import ModalUpdateUser from "../Modal/ModalUpdateUser";
import ModalDeleteConfirmation from "../Modal/ModalDeleteConfirmation";

export default function TableUser() {
  const dispatch = useDispatch<Dispatch<any>>();
  const navigate = useNavigate();
  const { isError, message, userList } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  // pagination config
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const firstPost = page * rowsPerPage;
  const lastPost = firstPost + rowsPerPage;
  const slicedData = userList.slice(firstPost, lastPost);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  // handle add new data modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle update modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // handle delete confirmation modal
  const [openPrompt, setOpenPrompt] = useState(false);
  const handleOpenPrompt = () => setOpenPrompt(true);
  const handleClosePrompt = () => setOpenPrompt(false);
  const [selectedID, setSelectedID] = useState<any>(null);

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ marginTop: "40px" }}>
          User List
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{ marginY: "20px" }}
          onClick={handleOpen}
        >
          Add NEW USER
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {slicedData.map((item: any, idx: any) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell align="right"> {item.name}</TableCell>
                      <TableCell align="right"> {item.email}</TableCell>
                      <TableCell align="right"> {item.gender}</TableCell>
                      <TableCell align="right"> {item.status}</TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/detail/${item.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => {
                              setSelectedItem(item);
                              handleOpenUpdateModal();
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => {
                              setSelectedID(item.id);
                              handleOpenPrompt();
                            }}
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
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
                  count={userList.length}
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
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
      <ModalAddUser open={open} handleClose={handleClose} />
      {selectedItem && (
        <ModalUpdateUser
          data={selectedItem}
          open={openUpdateModal}
          handleClose={handleCloseUpdateModal}
        />
      )}
      {selectedID && (
        <ModalDeleteConfirmation
          userId={selectedID}
          open={openPrompt}
          handleClose={handleClosePrompt}
        />
      )}
    </>
  );
}
