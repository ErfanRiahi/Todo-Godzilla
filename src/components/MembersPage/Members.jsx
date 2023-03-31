import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "../../generalStyle.css";
import { MemberInfo } from "./MemberInfo";
// import FileBase64 from "react-file-base64";
import "./style.css";
import { createMember } from "../../API/API";
import { SelectProfileImage } from "./SelectProfileImage";
import {
  Edit,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SelectSkill } from "./SelectSkill";
import { SelectLanguage } from "./SelectLanguage";

export const Members = () => {
  const [item, setItem] = useState({
    fullName: "",
    age: 0,
    linkedIn: "",
    github: "",
    skill: [],
    language: [],
    isAdmin: false,
    profileImage: "",
    tasks: [],
  });

  const setProfileImage = (data) => {
    setItem({ ...item, profileImage: data });
  };
  const setLanguage = (data) => {
    setItem({ ...item, language: data });
  };
  const setSkill = (data) => {
    setItem({ ...item, skill: data });
  };
  // ******************** password textField ******************** //
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ******************** Dialog ******************** //
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItem({
      fullName: "",
      age: 0,
      email: "",
      password: "",
      linkedIn: "",
      github: "",
      skill: [],
      language: [],
      isAdmin: false,
      profileImage: "",
    });
  };

  // ******************** Snackbar ******************** //
  const [state, setState] = useState({
    openSnackbar: false,
  });
  const { openSnackbar } = state;
  const handleClick = () => {
    setState({ openSnackbar: true });
  };

  const handleCloseSnackbar = () => {
    setState({ openSnackbar: false });
  };
  function addMember() {
    if (
      !item.fullName ||
      !item.age ||
      !item.email ||
      !item.password ||
      !item.github ||
      !item.linkedIn ||
      !item.language.length ||
      !item.skill.length
    )
      handleClick();

    console.log(item);
  }

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
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle textAlign="center">Member Information</DialogTitle>
          <DialogContent>
            <SelectProfileImage func={setProfileImage} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "10px",
                marginTop: "10px",
              }}
              className="memberInfo"
              autoComplete="off"
            >
              <TextField
                label="Full name"
                autoComplete="off"
                error={item.fullName ? false : true}
                helperText={item.fullName ? "" : "Please enter your full name"}
                onChange={(e) => setItem({ ...item, fullName: e.target.value })}
              />
              <TextField
                label="Age"
                autoComplete="off"
                error={
                  !item.age ||
                  item.age < 16 ||
                  item.age > 50 ||
                  !!item.age.match(/[a-zA-z]/)
                    ? true
                    : false
                }
                helperText={
                  !item.age ||
                  item.age < 16 ||
                  item.age > 50 ||
                  !!item.age.match(/[a-zA-z]/)
                    ? "16 <= Age <= 50"
                    : ""
                }
                onChange={(e) => setItem({ ...item, age: e.target.value })}
              />
              <TextField
                label="Email"
                autoComplete="off"
                type="email"
                error={item.email ? false : true}
                helperText={item.email ? "" : "Enter your email"}
                onChange={(e) => setItem({ ...item, email: e.target.value })}
              />
              <FormControl error={item.password ? false : true}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ marginLeft: "-30px" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onChange={(e) =>
                    setItem({ ...item, password: e.target.value })
                  }
                />
                <FormHelperText>
                  {item.password ? "" : "Enter your password"}
                </FormHelperText>
              </FormControl>

              <TextField
                label="Github username"
                autoComplete="off"
                error={item.github ? false : true}
                helperText={item.github ? "" : "Enter your github username"}
                onChange={(e) => setItem({ ...item, github: e.target.value })}
              />
              <TextField
                label="LinkedIn username"
                autoComplete="off"
                error={item.linkedIn ? false : true}
                helperText={item.linkedIn ? "" : "Enter your linked username"}
                onChange={(e) => setItem({ ...item, linkedIn: e.target.value })}
              />
            </Box>
            <SelectLanguage func={setLanguage} />
            <SelectSkill func={setSkill} />

            <FormGroup sx={{ marginTop: "10px", width: "fit-content" }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Admin"
                onChange={(e) =>
                  setItem({ ...item, isAdmin: e.target.checked })
                }
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addMember}>Add member</Button>
          </DialogActions>
        </Dialog>
      </section>

      <section className="members" sx={{ margin: "0 auto" }}>
        <MemberInfo props={{ item, setItem }} />
      </section>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}

        // message="Please check fields and try again"
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          Please complete all fields and try again
        </Alert>
      </Snackbar>
    </main>
  );
};
