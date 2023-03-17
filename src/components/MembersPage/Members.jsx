import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../../generalStyle.css";
import { MemberInfo } from "./MemberInfo";
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

export const Members = () => {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "Python",
    "Ruby",
    "TypeScript",
    "Java",
    "C#",
    "Go",
    "Swift",
    "Kotlin",
    "Java",
    "C++",
    "PHP",
    "Go",
    "Rust",
    "Lua",
    "Perl",
    "R",
    "Scala",
  ];

  return (
    <main>
      <section className="search-add">
        <TextField
          id="outline-required"
          label="Search member..."
          className="searchMember"
        />
        <Button variant="contained" onClick={handleOpen} className="addMember">
          Add member
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} autoComplete="off">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
              marginBottom={2}
            >
              Member Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "20px",
              }}
              className="memberInfo"
              autoComplete="off"
            >
              <TextField required id="outlined-required" label="Full name" />
              <TextField id="outline-required" label="Age" />
              <TextField id="outline-required" label="LinkedIn username" />
              <TextField id="outline-required" label="Github username" />
            </Box>
          </Box>
        </Modal>
      </section>

      <section className="members">
        <MemberInfo />
      </section>
    </main>
  );
};
