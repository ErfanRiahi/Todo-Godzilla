import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "../../generalStyle.css";
import { MemberInfo } from "./MemberInfo";
import "./style.css";
import {
  createMember,
  deleteMemberApi,
  editMemberApi,
  getAllMember,
} from "../../API/API";
import { SelectProfileImage } from "./SelectProfileImage";
import { SelectSkill } from "./SelectSkill";
import { SelectLanguage } from "./SelectLanguage";
import { AppContexts } from "../../contexts/AppContexts";

export const Members = () => {
  const { user, setUser } = useContext(AppContexts);
  const [item, setItem] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    linkedIn: "",
    github: "",
    skill: [],
    language: [],
    profileImage: "",
    tasks: [],
    password: "",
  });

  const [memberAdded, setMemberAdded] = useState(false);

  const [allMembers, setAllMembers] = useState();
  const [newMember, setNewMember] = useState();
  useEffect(() => {
    getAllMember().then((data) => {
      setAllMembers(data.data);
      setNewMember(data.data);
    });
  }, []);
  // allMembers ? console.log(allMembers) : console.log("nothing");

  // ******************** Dialog ******************** //
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItem({
      firstName: "",
      lastName: "",
      birthday: "",
      password: "",
      linkedIn: "",
      github: "",
      skill: [],
      language: [],
      profileImage: "",
    });
  };

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

  // ******************** Add member ******************** //
  const addMember = async () => {
    // console.log(item);
    if (
      !item.firstName ||
      !item.lastName ||
      !item.github ||
      !item.linkedIn ||
      !item.language.length ||
      !item.skill.length
    ) {
      handleClick();
      return;
    }
    setMemberAdded(true);
    // setItem({ ...item, password: Math.random().toString(36).slice(-8) });

    const newMember = await createMember(item);
    if (newMember !== undefined) {
      // console.log(newMember);
      setNewMember(newMember);
      setAllMembers(newMember);
      setMemberAdded(false);
      handleOpenFinalThing();
    }
  };

  // ******************** Show username and password ******************** //
  const [finalThing, setFinalThing] = useState(false);
  const handleOpenFinalThing = () => setFinalThing(true);
  const handleCloseFinalThing = () => setFinalThing(false);
  function showUsernamePassword() {
    handleCloseFinalThing();
    handleClose();
  }

  return (
    <main>
      <section className="search-add">
        <TextField
          id="outline-required"
          label="Search member..."
          className="searchMember"
          autoComplete="off"
          onBlur={(e) => {
            setNewMember(
              allMembers.filter((member) =>
                `${member.firstName} ${member.lastName}`.includes(
                  e.target.value
                )
              )
            );
            // console.log(newMember);
          }}
        />
        {user.isAdmin ? (
          <Button
            variant="contained"
            onClick={handleOpen}
            className="addMember"
            autoComplete="off"
            sx={{ padding: "15px" }}
          >
            Add member
          </Button>
        ) : (
          <Typography sx={{ fontWeight: "bold" }}>
            Login as admin to add member
          </Typography>
        )}

        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <LinearProgress
            value={100}
            variant={memberAdded ? "indeterminate" : "determinate"}
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
                autoComplete="off"
                error={item.firstName ? false : true}
                helperText={
                  item.firstName ? "" : "Please enter your first name"
                }
                onBlur={(e) => setItem({ ...item, firstName: e.target.value })}
              />
              <TextField
                label="Last name"
                autoComplete="off"
                error={item.lastName ? false : true}
                helperText={item.lastName ? "" : "Please enter your last name"}
                onBlur={(e) => setItem({ ...item, lastName: e.target.value })}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) =>
                    setItem({ ...item, birthday: e.$d.toLocaleDateString() })
                  }
                  label="Birthday"
                />
              </LocalizationProvider>

              <TextField
                label="Email"
                autoComplete="off"
                type="email"
                error={item.email ? false : true}
                helperText={item.email ? "" : "Enter your email"}
                onBlur={(e) => setItem({ ...item, email: e.target.value })}
              />

              <TextField
                label="Github username"
                autoComplete="off"
                error={item.github ? false : true}
                helperText={item.github ? "" : "Enter your github username"}
                onBlur={(e) =>
                  setItem({
                    ...item,
                    github: e.target.value,
                    password: Math.random().toString(36).slice(-8),
                  })
                }
              />
              <TextField
                label="LinkedIn username"
                autoComplete="off"
                error={item.linkedIn ? false : true}
                helperText={item.linkedIn ? "" : "Enter your linked username"}
                onBlur={(e) => setItem({ ...item, linkedIn: e.target.value })}
              />
            </Box>
            <SelectLanguage func={{ item, setItem }} />
            <SelectSkill func={{ item, setItem }} />
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
            <Button onClick={() => addMember()}>Add member</Button>
          </DialogActions>

          <Dialog open={finalThing} onClose={handleCloseFinalThing}>
            <DialogContent sx={{ display: "grid", gap: "20px" }}>
              <Typography>Username: {item.github}</Typography>
              <Typography>Password: {item.password}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={showUsernamePassword}>Ok</Button>
            </DialogActions>
          </Dialog>
        </Dialog>
      </section>

      <section className="members" sx={{ margin: "0 auto" }}>
        {newMember ? (
          newMember.map((member, index) => {
            return (
              <MemberInfo
                key={index}
                props={{ member, setNewMember, setAllMembers }}
              />
            );
          })
        ) : (
          <CircularProgress variant="indeterminate" />
        )}
      </section>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          Please complete all fields and try again
        </Alert>
      </Snackbar>
    </main>
  );
};
