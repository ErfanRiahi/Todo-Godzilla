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
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   textAlign: "center",
// }));

export const MemberInfo = (item, setItem) => {
  const github = "ErfanRiahi";
  const linkedIn = "erfan-riahi";
  const language = ["Persian", "English", "French"];
  const skills = ["HTML", "CSS", "JavaScript", "react"];
  const tasks = [
    { title: "design header", completed: false },
    { title: "complete home page", completed: true },
    { title: "buy bread", completed: false },
    { title: "take a shower", completed: false },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Typography variant="h6" sx={{ justifySelf: "center" }}>
          {item.fullName ? item.fullName : "Erfan Riahi"}
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

        {/****************** Member details ******************/}
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              {/****************** photo - fullName - birthday ******************/}
              <Box sx={{ textAlign: "center" }}>
                <Badge
                  color="primary"
                  invisible={item.isAdmin ? false : false}
                  badgeContent={"Admin"}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    alt="profile-photo"
                    src="../../../src/assets/img/Erfan.jpg"
                    sx={{ width: 80, height: 80 }}
                  />
                </Badge>

                <Typography variant="h5" marginY={1}>
                  Erfan Riahi
                </Typography>

                <Typography variant="h7" sx={{ width: "fit-content" }}>
                  12 Apr 2000
                </Typography>
              </Box>

              {/****************** contact ******************/}
              <Box
                sx={{
                  display: "grid",
                  justifySelf: "end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="Email" arrow>
                    <Email />
                  </Tooltip>
                  <Typography>erfanriahi90@gmail.com</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="Github" arrow>
                    <GitHub />
                  </Tooltip>
                  <Typography>ErfanRiahi</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Tooltip title="LinkedIn" arrow>
                    <LinkedIn sx={{ color: "#0A66C2" }} />
                  </Tooltip>
                  <Typography>erfan-riahi</Typography>
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
                  title={language.length > 1 ? "Languages" : "Language"}
                  arrow
                >
                  <Language sx={{ fontSize: "2rem", marginRight: "10px" }} />
                </Tooltip>
                {language.map((lan, index) => {
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
                <Tooltip title={skills.length > 1 ? "Skills" : "Skill"} arrow>
                  <Construction
                    sx={{ fontSize: "2rem", marginRight: "10px" }}
                  />
                </Tooltip>
                {skills.map((skill, index) => {
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

              {/****************** Tasks ******************/}
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
                {tasks.map((task, index) => {
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
                })}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error">
              Delete
            </Button>
            <Button variant="contained" color="success">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Box
          sx={{
            display: "flex",
            gridColumn: "1/span 2",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <Tooltip title={language.length > 1 ? "Languages" : "Language"} arrow>
            <Language sx={{ fontSize: "2rem", alignItems: "center" }} />
          </Tooltip>
          <Typography>{language.join(", ")}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gridColumn: "1/span 2",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Tooltip title="Skills" arrow>
            <Construction sx={{ fontSize: "2rem" }} />
          </Tooltip>
          <Typography>{skills.join(", ")}</Typography>
        </Box>
        <Divider
          orientation="horizontal"
          sx={{ gridColumn: "1/span 2", marginTop: "10px" }}
        /> */}

        {/************ Tasks ************/}
        {/* <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gridColumn: "1/span 2",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Tooltip title="Tasks" arrow>
            <Assignment sx={{ fontSize: "2rem" }} />
          </Tooltip>
          <Button variant="primary">
            <Typography>Tasks</Typography>
          </Button> */}
        {/* {tasks.map((task, index) => (
            <Typography
              key={index}
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                padding: "7px",
                borderRadius: "5px",
                color: "white",
              }}
              backgroundColor={task.completed ? "green" : "rgb(255,80,80)"}
            >
              {task.title}
            </Typography>
          ))} */}
        {/* </Box> */}
      </CardContent>
    </Card>
  );
};
