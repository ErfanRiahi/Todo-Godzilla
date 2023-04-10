import {
  Box,
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
import { useState } from "react";
import { SelectLanguage } from "./SelectLanguage";
import { SelectProfileImage } from "./SelectProfileImage";
import { SelectSkill } from "./SelectSkill";

export const EditMember = (props) => {
  const {
    openEdit,
    handleCloseEdit,
    memberEdited,
    setMemberEdited,
    item,
    setItem,
    editMember,
  } = props.props;
  const [valueOfDate, setValueOfDate] = useState(dayjs(item.birthday));

  return (
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
            helperText={item.firstName ? "" : "Please enter your first name"}
            onChange={(e) => setItem({ ...item, firstName: e.target.value })}
          />
          <TextField
            label="Last name"
            value={item.lastName}
            autoComplete="off"
            error={item.lastName ? false : true}
            helperText={item.lastName ? "" : "Please enter your last name"}
            onChange={(e) => setItem({ ...item, lastName: e.target.value })}
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
            onChange={(e) => setItem({ ...item, linkedIn: e.target.value })}
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
  );
};
