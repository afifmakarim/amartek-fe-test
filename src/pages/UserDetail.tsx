import {
  TextField,
  Container,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TablePost from "../components/Table/TablePost";
import { getUserDetailById } from "../services/user-services";
import { toast } from "react-toastify";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUserDetail] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

  async function getUserDetail() {
    setLoading(true);
    const response = await getUserDetailById(userId);
    setUserDetail(response.data);
    setLoading(false);
    if (response.error) {
      toast.error("error fetching data");
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetail();
  }, []);

  if (!userId || isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Typography variant="h4" gutterBottom sx={{ marginTop: "40px" }}>
          User Detail
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nama"
            value={user.name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Gender"
            value={user.gender}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Email"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Status"
            value={user.status}
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <Typography variant="h4" gutterBottom sx={{ marginTop: "40px" }}>
          Post List
        </Typography>
        <TablePost userId={userId} />
      </Container>
    </>
  );
}
