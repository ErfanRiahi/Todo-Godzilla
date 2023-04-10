import { GitHub, Lightbulb, LinkedIn } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { getAllTask } from "../../API/API";
import { AppContexts } from "../../contexts/AppContexts";
import { MemberDetails } from "./MemberDetails";

export const MemberInfo = (props) => {
  const { user } = useContext(AppContexts);
  const [item, setItem] = useState(props.props.member);
  const { setNewMember, setAllMembers } = props.props;
  const fullName = `${item.firstName} ${item.lastName}`;

  const [allTasks, setAllTasks] = useState();

  // ******************** Member information dialog ******************** //
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ******************** Task(s) ******************** //
  const tasks = [];
  useEffect(() => {
    getAllTask().then((data) => setAllTasks(data.data));
  }, []);
  allTasks?.map((task) =>
    task.person.includes(fullName)
      ? tasks.push({ title: task.title, completed: task.completed })
      : ""
  );

  return (
    <Card className="card">
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "49% 49%",
          alignItems: "center",
        }}
      >
        {/****************** Profile photo ******************/}
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

        {/****************** Light bulb for 3 uncompleted task ******************/}
        {tasks.filter((task) => !task.completed).length >= 3 ? (
          <Lightbulb
            sx={{ fontSize: "2.2rem", justifySelf: "end", color: "red" }}
          />
        ) : (
          <Typography></Typography>
        )}

        {/****************** Full name ******************/}
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

        {/****************** Github & LinkedIn ******************/}
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

        {/****************** Show detail button ******************/}
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

        <MemberDetails
          props={{
            open,
            handleClose,
            setNewMember,
            setAllMembers,
            item,
            setItem,
            fullName,
            user,
            tasks,
          }}
        />
      </CardContent>
    </Card>
  );
};
