import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { addToHistoryApi, deleteTaskApi, editTaskApi } from "../../API/API";
import { AppContexts } from "../../contexts/AppContexts";
import { SelectPerson } from "./SelectPerson";

export const Tasks = (props) => {
  const { user, setUser } = useContext(AppContexts);
  const task = props.props.task;
  const allMembers = props.props.allMembers;
  const allTasks = props.props.allTasks;
  const setTask = props.props.setTask;

  const [completingTask, setCompletingTask] = useState(false);
  const [checked, setChecked] = useState(
    task.completed ? task.completed : false
  );
  const [editedTask, setEditedTask] = useState(task);
  const [dataEdited, setDataEdited] = useState(false); // progress bar

  // ******************** Edit dialog ******************** //
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setTask({
      taskId: 0,
      title: "",
      description: "",
      person: [],
      completed: false,
    });
  };

  const profilePhoto = [];
  let personGithubId;
  const usernameProfile = [];
  if (allMembers) {
    task.person.map((per) =>
      usernameProfile.push(
        ...allMembers
          .filter((member) => `${member.firstName} ${member.lastName}` === per)
          .map((per) => {
            return { username: per.github, profile: per.profileImage };
          })
      )
    );
    personGithubId = usernameProfile.map((el) => el.username);
  }

  // ******************** Edit task ******************** //
  const editTask = async (event) => {
    const dataSent = await editTaskApi(task._id, {
      ...task,
      completed: event,
    });
    if (dataSent) setCompletingTask(false);
  };

  const editTaskDetails = async () => {
    const history = {
      taskId: task.taskId,
      typeOfModification: "Edited",
      username: user.username,
      dataTime: new Date().toLocaleString(),
    };
    await addToHistoryApi(history);

    const dataSent = await editTaskApi(editedTask._id, editedTask);
    if (dataSent) {
      setDataEdited(false);
      props.props.setAllTasks(dataSent);
      handleCloseEditDialog();
    }
  };

  // ******************** Delete task & Add to history ******************** //
  const deleteTask = async () => {
    const history = {
      taskId: task.taskId,
      typeOfModification: "Deleted",
      username: user.username,
      dataTime: new Date().toLocaleString(),
    };
    await addToHistoryApi(history);

    const dataSent = await deleteTaskApi(task._id);
    if (dataSent) {
      setCompletingTask(false);
      props.props.setAllTasks(dataSent);
    }
  };

  return task ? (
    <TableRow sx={checked ? { opacity: "0.5" } : { opacity: "1" }}>
      <TableCell align="center" width="50px">
        <Typography sx={{ fontWeight: "bold" }}>{task.taskId}</Typography>
      </TableCell>
      {useMediaQuery("(width < 580px)") ? (
        // ************* if width of screen less than 580px *************
        <TableCell sx={{ width: "80%" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>
          <Typography sx={{ padding: "20px 0", width: "90%" }}>
            {task.description}
          </Typography>
          <AvatarGroup
            max={6}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {usernameProfile.map((el, index) => (
              <Avatar key={index} src={el.profile} />
            ))}
          </AvatarGroup>
          <Box sx={{ display: "flex" }}>
            {personGithubId?.includes(user.username) ? (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={checked} />}
                  label="Completed"
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    setCompletingTask(true);
                    editTask(e.target.checked);
                  }}
                />
              </FormGroup>
            ) : (
              ""
            )}

            <CircularProgress
              variant={completingTask ? "indeterminate" : "determinate"}
            />
          </Box>
          <Box textAlign="center">
            <IconButton
              sx={
                checked || !user.isAdmin
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={handleOpenEditDialog}
            >
              <Edit sx={{ color: "blue" }} />
            </IconButton>
            <IconButton
              sx={
                checked || !user.isAdmin
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={(e) => {
                // addToHistory();
                setCompletingTask(true);
                deleteTask();
              }}
            >
              <Delete sx={{ color: "red" }} />
            </IconButton>
          </Box>
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            fullWidth
          >
            <LinearProgress
              value={100}
              variant={dataEdited ? "indeterminate" : "determinate"}
            />
            <DialogTitle textAlign="center">Edit task</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "grid",
                  marginTop: "10px",
                }}
                className="memberInfo"
              >
                <TextField
                  fullWidth
                  autoComplete="off"
                  id="outline-required"
                  value={editedTask.title}
                  error={task.title ? false : true}
                  helperText={task.title ? "" : "Write a title for this task"}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  id="outline-required"
                  value={editedTask.description}
                  multiline
                  maxRows={5}
                  sx={{ marginTop: "20px" }}
                  error={task.description ? false : true}
                  helperText={
                    task.description ? "" : "Write at least on line description"
                  }
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                />
                <SelectPerson props={{ task, allTasks, allMembers, setTask }} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button
                onClick={(e) => {
                  setDataEdited(true);
                  editTaskDetails();
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        </TableCell>
      ) : (
        // ************* if width of screen greater than 580px *************
        <>
          <TableCell sx={{ width: "80%" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>
            <Typography sx={{ padding: "20px 0", width: "90%" }}>
              {task.description}
            </Typography>
            <AvatarGroup
              max={6}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {usernameProfile.map((el, index) => (
                <Avatar key={index} src={el.profile} />
              ))}
            </AvatarGroup>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex" }}>
              {personGithubId?.includes(user.username) ? (
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checked} />}
                    label="Completed"
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      setCompletingTask(true);
                      editTask(e.target.checked);
                    }}
                  />
                </FormGroup>
              ) : (
                ""
              )}

              <CircularProgress
                variant={completingTask ? "indeterminate" : "determinate"}
              />
            </Box>
            <Box textAlign="center">
              <IconButton
                sx={
                  checked || !user.isAdmin
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={handleOpenEditDialog}
              >
                <Edit sx={{ color: "blue" }} />
              </IconButton>
              <IconButton
                sx={
                  checked || !user.isAdmin
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={(e) => {
                  // addToHistory();
                  setCompletingTask(true);
                  deleteTask();
                }}
              >
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </Box>
            <Dialog
              open={openEditDialog}
              onClose={handleCloseEditDialog}
              fullWidth
            >
              <LinearProgress
                value={100}
                variant={dataEdited ? "indeterminate" : "determinate"}
              />
              <DialogTitle textAlign="center">Edit task</DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "grid",
                    marginTop: "10px",
                  }}
                  className="memberInfo"
                >
                  <TextField
                    fullWidth
                    autoComplete="off"
                    id="outline-required"
                    value={editedTask.title}
                    error={task.title ? false : true}
                    helperText={task.title ? "" : "Write a title for this task"}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, title: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    id="outline-required"
                    value={editedTask.description}
                    multiline
                    maxRows={5}
                    sx={{ marginTop: "20px" }}
                    error={task.description ? false : true}
                    helperText={
                      task.description
                        ? ""
                        : "Write at least on line description"
                    }
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        description: e.target.value,
                      })
                    }
                  />
                  <SelectPerson
                    props={{ task, allTasks, allMembers, setTask }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                <Button
                  onClick={(e) => {
                    setDataEdited(true);
                    editTaskDetails();
                  }}
                >
                  Edit
                </Button>
              </DialogActions>
            </Dialog>
          </TableCell>
        </>
      )}
    </TableRow>
  ) : (
    <Typography variant="h5">No task(s)</Typography>
  );
};
