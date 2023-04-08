import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Modal,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { addTaskApi, getAllMember, getAllTask } from "../../API/API";
import "../../generalStyle.css";
import { SelectPerson } from "./SelectPerson";
import "./style.css";
import { Tasks } from "./Tasks";
import { AppContexts } from "../../contexts/AppContexts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const Home = () => {
  const { user, setUser } = useContext(AppContexts);
  const [task, setTask] = useState({
    title: "",
    description: "",
    person: [],
    completed: false,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const handleOpenAddTask = () => setAddTaskDialog(true);
  const handleCloseAddTask = () => setAddTaskDialog(false);

  const [taskAdded, setTaskAdded] = useState(false);

  // ******************** Snackbar ******************** //
  const [snackBarState, setSnackBarState] = useState({
    openSnackbar: false,
  });
  const { openSnackbar } = snackBarState;
  const handleClick = () => {
    setSnackBarState({ openSnackbar: true });
  };

  const handleCloseSnackbar = () => {
    setSnackBarState({ openSnackbar: false });
  };

  // ******************** Get all members and tasks ******************** //
  const [allMembers, setAllMembers] = useState();
  const [allTasks, setAllTasks] = useState();
  useEffect(() => {
    getAllMember().then((data) => {
      setAllMembers(data.data);
    });
    getAllTask().then((data) => setAllTasks(data.data));
  }, []);
  // allMembers ? console.log(allMembers) : console.log("nothing");
  // allTasks ? console.log(allTasks) : console.log("nothing");

  // ******************** Sort admin and members ******************** //
  let adminMember = [];
  if (allMembers) {
    adminMember.push(...allMembers.filter((member) => member.isAdmin));
    adminMember.push(...allMembers.filter((member) => !member.isAdmin));
  }

  // ******************** Add member ******************** //
  const addTask = async () => {
    if (!task.title || !task.description || !task.person.length) {
      handleClick();
      return;
    }
    setTaskAdded(true);
    const addedTask = await addTaskApi(task);
    if (addedTask) {
      setTask(addedTask);
      handleCloseAddTask();
      setTaskAdded(false);
    }
  };

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
        {adminMember ? (
          adminMember.map((member, index) => {
            return member.isAdmin ? (
              <Avatar
                key={index}
                src={member.profileImage}
                sx={{ width: 60, height: 60 }}
              />
            ) : (
              <Avatar key={index} src={member.profileImage} />
            );
          })
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </AvatarGroup>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {adminMember.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge
                        color="primary"
                        invisible={member.isAdmin ? false : true}
                        badgeContent={"Admin"}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Avatar
                          alt={member.firstName}
                          src={member.profileImage}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                      >{`${member.firstName} ${member.lastName}`}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      <div className="add-total">
        {user.isAdmin ? (
          <Button
            variant="contained"
            className="addNewTask-btn"
            onClick={handleOpenAddTask}
            sx={{ padding: "10px" }}
          >
            Add new task
          </Button>
        ) : (
          <Typography sx={{ fontWeight: "bold" }}>
            Login as Admin to add, edit and delete task
          </Typography>
        )}

        <Dialog open={addTaskDialog} onClose={handleCloseAddTask} fullWidth>
          <LinearProgress
            value={100}
            variant={taskAdded ? "indeterminate" : "determinate"}
          />
          <DialogTitle textAlign="center">Task details</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "grid",
                marginTop: "10px",
              }}
              className="memberInfo"
              autoComplete="off"
            >
              <TextField
                fullWidth
                autoComplete="off"
                id="outline-required"
                label="Title"
                error={task.title ? false : true}
                helperText={task.title ? "" : "Write a title for this task"}
                onBlur={(e) => setTask({ ...task, title: e.target.value })}
              />
              <TextField
                fullWidth
                id="outline-required"
                label="Describe (maximum line=5)"
                multiline
                maxRows={5}
                sx={{ marginTop: "20px" }}
                error={task.description ? false : true}
                helperText={
                  task.description ? "" : "Write at least on line description"
                }
                onBlur={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
              <SelectPerson props={{ task, allTasks, allMembers }} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddTask}>Cancel</Button>
            <Button onClick={addTask}>Add task</Button>
          </DialogActions>
        </Dialog>

        <div className="total">
          Total tasks: {allTasks ? allTasks.length : ""}
        </div>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            {allTasks ? (
              allTasks.map((task, index) => (
                <Tasks
                  key={index}
                  props={{ task, index, allMembers, setAllTasks, allTasks }}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <Typography variant="h4">Loading...</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          Check fields and try again
        </Alert>
      </Snackbar>
    </main>
  );
};
