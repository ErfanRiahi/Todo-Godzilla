import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import "../../generalStyle.css";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main>
      <AvatarGroup
        max={6}
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
        onClick={handleOpen}
      >
        <Avatar
          alt="Erfan"
          src="../../../src/assets/img/Erfan.jpg"
          sx={{ width: 70, height: 70 }}
        />
        <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
        <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
        <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
        <Avatar alt="4" src="../../../src/assets/img/4.jpg" />
        <Avatar alt="5" src="../../../src/assets/img/5.jpg" />
        <Avatar alt="6" src="../../../src/assets/img/6.jpg" />
      </AvatarGroup>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      <div className="add-total">
        <button className="addNewTask-btn">Add New Task</button>
        <div className="total">Total tasks: 3</div>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCell align="center" width="50px">
                1
              </TableCell>
              <TableCell>
                <h2>Header</h2>
                <p>design and add header</p>
                <AvatarGroup
                  max={6}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
                  <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
                  <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
                </AvatarGroup>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <Edit sx={{ color: "blue" }} />
                </IconButton>
                <IconButton>
                  <Delete sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" width="50px">
                2
              </TableCell>
              <TableCell>
                <h2>Footer</h2>
                <p>design and add footer</p>
                <AvatarGroup
                  max={6}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
                  <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
                  <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
                </AvatarGroup>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <Edit sx={{ color: "blue" }} />
                </IconButton>
                <IconButton>
                  <Delete sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" width="50px">
                2
              </TableCell>
              <TableCell>
                <h2>Footer</h2>
                <p>design and add footer</p>
                <AvatarGroup
                  max={6}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
                  <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
                  <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
                </AvatarGroup>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                  <Edit sx={{ color: "blue" }} />
                </IconButton>
                <IconButton>
                  <Delete sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
