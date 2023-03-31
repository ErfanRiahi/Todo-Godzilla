import { Delete } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "../../generalStyle.css";
import "./style.css";
import { Tasks } from "./Tasks";

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

  const [addTask, setAddTask] = useState(false);
  const handleOpenAddTask = () => setAddTask(true);
  const handleCloseAddTask = () => setAddTask(false);

  return (
    <main>
      <AvatarGroup
        max={6}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          cursor: "pointer",
          width: "fit-content",
        }}
        onClick={handleOpen}
      >
        <Badge
          color="primary"
          badgeContent={"Admin"}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Avatar
            alt="Erfan"
            src="../../../src/assets/img/Erfan.jpg"
            sx={{ width: 70, height: 70 }}
          />
        </Badge>
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
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      <div className="add-total">
        <Button
          variant="contained"
          className="addNewTask-btn"
          onClick={handleOpenAddTask}
        >
          Add new task
        </Button>
        <Dialog open={addTask} onClose={handleCloseAddTask}>
          <DialogTitle>Task details</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "20px",
                marginTop: "10px",
              }}
              className="memberInfo"
              autoComplete="off"
            >
              <TextField id="outline-required" label="Title" />
              <TextField id="outline-required" label="Username" />
            </Box>
            <TextField
              fullWidth
              id="outline-required"
              label="Describe (maximum line=5)"
              multiline
              maxRows={5}
              sx={{ marginTop: "20px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddTask}>Cancel</Button>
            <Button>Add task</Button>
          </DialogActions>
        </Dialog>
        <div className="total">Total tasks: 3</div>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            <Tasks />
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
