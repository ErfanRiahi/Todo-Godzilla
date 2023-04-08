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
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { deleteTaskApi, editTaskApi } from "../../API/API";
import { SelectPerson } from "./SelectPerson";

export const Tasks = (props) => {
  const task = props.props.task;
  const allMembers = props.props.allMembers;
  const allTasks = props.props.allTasks;

  const [completingTask, setCompletingTask] = useState(false);
  const [checked, setChecked] = useState(
    task.completed ? task.completed : false
  );
  const [editedTask, setEditedTask] = useState(task);
  const [dataEdited, setDataEdited] = useState(false); // progress bar

  // ******************** Edit dialog ******************** //
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const profilePhoto = [];
  if (allMembers) {
    task.person.map((per) =>
      profilePhoto.push(
        ...allMembers
          .filter((member) => `${member.firstName} ${member.lastName}` === per)
          .map((per) => per.profileImage)
      )
    );
  }
  // allMembers.filter((member) => `${member.firstName} ${member.lastName}` === task);

  // ******************** Edit task ******************** //
  const editTask = async (event) => {
    const dataSent = await editTaskApi(task._id, {
      ...task,
      completed: event,
    });
    if (dataSent) setCompletingTask(false);
  };

  const editTaskDetails = async () => {
    const dataSent = await editTaskApi(editedTask._id, editedTask);
    if (dataSent) {
      setDataEdited(false);
      props.props.setAllTasks(dataSent);
      handleCloseEditDialog();
    }
  };

  // ******************** Delete task ******************** //
  const deleteTask = async () => {
    const dataSent = await deleteTaskApi(task._id);
    if (dataSent) {
      setCompletingTask(false);
      props.props.setAllTasks(dataSent);
    }
  };

  return task ? (
    <TableRow sx={checked ? { opacity: "0.5" } : { opacity: "1" }}>
      <TableCell align="center" width="50px">
        <Typography sx={{ fontWeight: "bold" }}>
          {props.props.index + 1}
        </Typography>
        <Divider orientation="vertical" flexItem />
      </TableCell>
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
          {profilePhoto.map((photo, index) => (
            <Avatar key={index} src={photo} />
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  // onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="Completed"
              onChange={(e) => {
                setChecked(e.target.checked);
                setCompletingTask(true);
                editTask(e.target.checked);
              }}
            />
          </FormGroup>
          <CircularProgress
            variant={completingTask ? "indeterminate" : "determinate"}
          />
        </Box>
        <Box textAlign="center">
          <IconButton
            aria-label="delete"
            sx={checked ? { display: "none" } : { display: "inline-block" }}
            onClick={handleOpenEditDialog}
          >
            <Edit sx={{ color: "blue" }} />
          </IconButton>
          <IconButton
            sx={checked ? { display: "none" } : { display: "inline-block" }}
            onClick={(e) => {
              setCompletingTask(true);
              deleteTask();
            }}
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </Box>
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth>
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
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
              <SelectPerson props={{ task, allTasks, allMembers }} />
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
    </TableRow>
  ) : (
    <Typography variant="h5">No task(s)</Typography>
  );
};
