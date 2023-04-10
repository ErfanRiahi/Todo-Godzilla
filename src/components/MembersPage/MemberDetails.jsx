import {
  Assignment,
  Construction,
  Email,
  GitHub,
  Language,
  LinkedIn,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  Box,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";

import { useState } from "react";
import { deleteMemberApi, editMemberApi } from "../../API/API";
import { EditMember } from "./EditMember";

export const MemberDetails = (props) => {
  const {
    item,
    setItem,
    open,
    fullName,
    user,
    tasks,
    handleClose,
    setNewMember,
    setAllMembers,
  } = props.props;
  const [memberDeleted, setMemberDeleted] = useState(false);

  const [memberEdited, setMemberEdited] = useState(false);

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

  // ******************** Delete member ******************** //
  const deleteMember = async () => {
    const memberDeleteRes = await deleteMemberApi(item._id);
    if (memberDeleteRes) {
      setNewMember(memberDeleteRes);
      setAllMembers(memberDeleteRes);
      setMemberDeleted(false);
      handleClose();
    }
  };

  // ******************** Edit dialog ******************** //
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // ******************** Edit member ******************** //
  const editMember = async (id, item) => {
    const memberEditRes = await editMemberApi(id, item);
    if (memberEditRes) {
      setNewMember(memberEdited);
      setAllMembers(memberEdited);
      setMemberEdited(false);
      handleCloseEdit();
    }
  };
  return (
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

            <Typography variant="h5" marginY={1} sx={{ whiteSpace: "noWrap" }}>
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
            <Tooltip title={item.skill.length > 1 ? "Skills" : "Skill"} arrow>
              <Construction sx={{ fontSize: "2rem", marginRight: "10px" }} />
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
            {tasks?.map((task, index) => {
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
                  backgroundColor={task.completed ? "green" : "rgb(255,80,80)"}
                >
                  {task.title}
                </Typography>
              );
            })}
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

        <Button variant="contained" color="success" onClick={handleOpenEdit}>
          Edit
        </Button>
      </DialogActions>

      <EditMember
        props={{
          openEdit,
          handleCloseEdit,
          memberEdited,
          setMemberEdited,
          item,
          setItem,
          editMember,
        }}
      />
    </Dialog>
  );
};
