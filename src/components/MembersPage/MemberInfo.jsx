import {
  AccessTime,
  Assignment,
  Cake,
  Construction,
  Email,
  GitHub,
  Language,
  Lightbulb,
  LinkedIn,
  SupervisorAccount,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Divider,
  Stack,
  Box,
  Paper,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { deleteMemberApi, editMemberApi, getAllTask } from "../../API/API";
import { AppContexts } from "../../contexts/AppContexts";
import { SelectLanguage } from "./SelectLanguage";
import { SelectProfileImage } from "./SelectProfileImage";
import { SelectSkill } from "./SelectSkill";

export const MemberInfo = (props) => {
  const { user, setUser } = useContext(AppContexts);
  const [item, setItem] = useState(props.props.member);
  const fullName = `${item.firstName} ${item.lastName}`;
  const [memberEdited, setMemberEdited] = useState(false);
  const [memberDeleted, setMemberDeleted] = useState(false);

  // ******************** Member information dialog ******************** //
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props);
  // console.log(members.props);
  // const github = "ErfanRiahi";
  // const linkedIn = "erfan-riahi";
  // const language = ["Persian", "English", "French"];
  // const skills = ["HTML", "CSS", "JavaScript", "react"];
  // const tasks = [
  //   { title: "design header", completed: false },
  //   { title: "complete home page", completed: true },
  //   { title: "buy bread", completed: false },
  //   { title: "take a shower", completed: false },
  // ];

  const tasks = [];

  const [allTasks, setAllTasks] = useState();
  useEffect(() => {
    getAllTask().then((data) => setAllTasks(data.data));
  }, []);
  allTasks
    ? allTasks.map((task) =>
        task.person.includes(fullName)
          ? tasks.push({ title: task.title, completed: task.completed })
          : ""
      )
    : console.log("wait!!!");

  // console.log(tasks);

  // ******************** Edit dialog ******************** //
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // ******************** birthday ******************** //
  function showDate(date) {
    const newDate = new Date(date).toString().split(" ");
    const birthday = [
      newDate.slice(2, 3)[0],
      newDate.slice(1, 2)[0],
      newDate.slice(3, 4)[0],
    ].join(" ");
    return birthday;
  }
  const [valueOfDate, setValueOfDate] = useState(dayjs(item.birthday));

  // ******************** Delete member ******************** //
  const deleteMember = async () => {
    const memberDeleteRes = await deleteMemberApi(item._id);
    if (memberDeleteRes) {
      props.props.setNewMember(memberDeleteRes);
      props.props.setAllMembers(memberDeleteRes);
      setMemberDeleted(false);
      handleClose();
    }
  };

  // ******************** Edit member ******************** //
  const editMember = async (id, item) => {
    const memberEditRes = await editMemberApi(id, item);
    if (memberEditRes) {
      props.props.setNewMember(memberEdited);
      props.props.setAllMembers(memberEdited);
      setMemberEdited(false);
      handleCloseEdit();
    }
  };

  return (
    <Card className="card">
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "49% 49%",
          alignItems: "center",
        }}
      >
        <Badge
          color="primary"
          invisible={item.isAdmin ? false : true}
          badgeContent={"Admin"}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ justifySelf: "center" }}
        >
          <Avatar
            alt="member-photo"
            src={item.profileImage ? item.profileImage : ""}
            sx={{ width: 60, height: 60 }}
          />
        </Badge>
        {item.isAdmin ? (
          <SupervisorAccount sx={{ fontSize: "2.2rem", justifySelf: "end" }} />
        ) : (
          <Lightbulb sx={{ fontSize: "2.2rem", justifySelf: "end" }} />
        )}
        <Typography
          variant="h6"
          sx={{
            justifySelf: "center",
            whiteSpace: "noWrap",
            marginTop: "10px",
          }}
        >
          {fullName ? fullName : "Unknown"}
        </Typography>
        <div className="github-linkedIn">
          <Tooltip title={item.github} arrow>
            <a href={"https://github.com/" + item.github} target="_blank">
              <GitHub
                sx={{
                  fontSize: "2rem",
                  color: "black",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              />
            </a>
          </Tooltip>
          <Tooltip title={item.linkedIn} arrow>
            <a
              href={"https://www.linkedin.com/in/" + item.linkedIn}
              target="_blank"
            >
              <LinkedIn
                sx={{ fontSize: "2rem", color: "#0A66C2", cursor: "pointer" }}
              />
            </a>
          </Tooltip>
        </div>
        {user.isAdmin || user.username === item.github ? (
          <Button
            variant="contained"
            sx={{
              whiteSpace: "nowrap",
              width: "80%",
              margin: "0 auto",
              marginTop: "5px",
              padding: "6px 12px",
              gridColumn: "1/span 2",
            }}
            onClick={handleOpen}
          >
            Details
          </Button>
        ) : (
          ""
        )}

        {/****************** Member details ******************/}
        <Dialog open={open} onClose={handleClose} fullWidth>
          <LinearProgress
            value={100}
            variant={memberDeleted ? "indeterminate" : "determinate"}
          />
          <DialogContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              {/****************** photo - fullName - birthday ******************/}
              <Box sx={{ textAlign: "center" }}>
                <Badge
                  color="primary"
                  invisible={item.isAdmin ? false : true}
                  badgeContent={"Admin"}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    alt="profile-photo"
                    src={item.profileImage}
                    sx={{ width: 80, height: 80 }}
                  />
                </Badge>

                <Typography
                  variant="h5"
                  marginY={1}
                  sx={{ whiteSpace: "noWrap" }}
                >
                  {fullName}
                </Typography>

                <Typography variant="h7" sx={{ width: "fit-content" }}>
                  {showDate(item.birthday)}
                </Typography>
              </Box>

              {/****************** contact ******************/}
              <Box
                sx={{
                  display: "grid",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="Email" arrow>
                    <Email />
                  </Tooltip>
                  <Typography>{item.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="Github" arrow>
                    <GitHub />
                  </Tooltip>
                  <Typography>{item.github}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="LinkedIn" arrow>
                    <LinkedIn sx={{ color: "#0A66C2" }} />
                  </Tooltip>
                  <Typography>{item.linkedIn}</Typography>
                </Box>
              </Box>

              <Divider
                orientation="horizontal"
                sx={{ gridColumn: "1/span 2", marginY: "20px" }}
              />

              {/****************** Languages ******************/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gridColumn: "1/span 2",
                  flexWrap: "wrap",
                }}
              >
                <Tooltip
                  title={item.language.length > 1 ? "Languages" : "Language"}
                  arrow
                >
                  <Language sx={{ fontSize: "2rem", marginRight: "10px" }} />
                </Tooltip>
                {item.language.map((lan, index) => {
                  return (
                    <Typography
                      key={index}
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                        padding: "5px",
                        borderRadius: "3px",
                        marginRight: "8px",
                        marginY: "5px",
                      }}
                    >
                      {lan}
                    </Typography>
                  );
                })}
              </Box>

              {/****************** Skills ******************/}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gridColumn: "1/span 2",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Tooltip
                  title={item.skill.length > 1 ? "Skills" : "Skill"}
                  arrow
                >
                  <Construction
                    sx={{ fontSize: "2rem", marginRight: "10px" }}
                  />
                </Tooltip>
                {item.skill.map((skill, index) => {
                  return (
                    <Typography
                      key={index}
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                        padding: "5px",
                        borderRadius: "3px",
                        marginRight: "8px",
                        marginY: "5px",
                      }}
                    >
                      {skill}
                    </Typography>
                  );
                })}
              </Box>

              {/* ***************** Tasks ***************** */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gridColumn: "1/span 2",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Tooltip title={tasks.length > 1 ? "Tasks" : "Task"} arrow>
                  <Assignment sx={{ fontSize: "2rem", marginRight: "10px" }} />
                </Tooltip>
                {tasks
                  ? tasks.map((task, index) => {
                      return (
                        <Typography
                          key={index}
                          sx={{
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                            padding: "5px",
                            borderRadius: "4px",
                            color: "white",
                            marginRight: "8px",
                            marginY: "5px",
                          }}
                          backgroundColor={
                            task.completed ? "green" : "rgb(255,80,80)"
                          }
                        >
                          {task.title}
                        </Typography>
                      );
                    })
                  : console.log("Wait more!!")}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            {user.username === "ErfanRiahi" ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteMember();
                  setMemberDeleted(true);
                }}
              >
                Delete
              </Button>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              color="success"
              onClick={handleOpenEdit}
            >
              Edit
            </Button>
          </DialogActions>
          <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth={true}>
            <LinearProgress
              value={100}
              variant={memberEdited ? "indeterminate" : "determinate"}
            />
            <DialogTitle textAlign="center">Member Information</DialogTitle>
            <DialogContent>
              <SelectProfileImage func={{ item, setItem }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "49% 49%",
                  gap: "10px",
                  marginTop: "15px",
                }}
                className="memberInfo"
                autoComplete="off"
              >
                <TextField
                  label="First name"
                  value={item.firstName}
                  autoComplete="off"
                  error={item.firstName ? false : true}
                  helperText={
                    item.firstName ? "" : "Please enter your first name"
                  }
                  onChange={(e) =>
                    setItem({ ...item, firstName: e.target.value })
                  }
                />
                <TextField
                  label="Last name"
                  value={item.lastName}
                  autoComplete="off"
                  error={item.lastName ? false : true}
                  helperText={
                    item.lastName ? "" : "Please enter your last name"
                  }
                  onChange={(e) =>
                    setItem({ ...item, lastName: e.target.value })
                  }
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    value={valueOfDate}
                    onChange={(e) => {
                      setItem({ ...item, birthday: e.$d.toLocaleDateString() });
                      setValueOfDate(e);
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  label="Email"
                  value={item.email}
                  autoComplete="off"
                  type="email"
                  error={item.email ? false : true}
                  helperText={item.email ? "" : "Enter your email"}
                  onChange={(e) => setItem({ ...item, email: e.target.value })}
                />

                <TextField
                  label="Github username"
                  value={item.github}
                  autoComplete="off"
                  error={item.github ? false : true}
                  helperText={item.github ? "" : "Enter your github username"}
                  onChange={(e) => setItem({ ...item, github: e.target.value })}
                />
                <TextField
                  label="LinkedIn username"
                  value={item.linkedIn}
                  autoComplete="off"
                  error={item.linkedIn ? false : true}
                  helperText={item.linkedIn ? "" : "Enter your linked username"}
                  onChange={(e) =>
                    setItem({ ...item, linkedIn: e.target.value })
                  }
                />
              </Box>
              <SelectLanguage func={{ item, setItem }} />
              <SelectSkill func={{ item, setItem }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button
                onClick={() => {
                  editMember(item._id, item);
                  setMemberEdited(true);
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        </Dialog>
      </CardContent>
    </Card>
  );
};
