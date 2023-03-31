import {
  Assignment,
  Construction,
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
} from "@mui/material";
import styled from "styled-components";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

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
  return (
    <Card className="card">
      <CardContent
        sx={{
          display: "grid",
          // justifyContent: "space-between",
          gridTemplateColumns: "auto auto",
          alignItems: "center",
        }}
      >
        <Badge
          color="primary"
          invisible={item.isAdmin ? false : true}
          badgeContent={"Admin"}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
        {/* <h2>{item.fullName + " - " + item.age}</h2> */}
        <h2>{item.fullName ? item.fullName : "Erfan Riahi - 23"}</h2>
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
        <Box
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
        />
        <Box
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
          {tasks.map((task, index) => (
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
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
