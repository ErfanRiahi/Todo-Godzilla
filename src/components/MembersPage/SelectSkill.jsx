import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { skills } from "./skills";

export const SelectSkill = (props) => {
  const item = props.func.item;
  const [selectedSkill, setSelectedSkill] = useState(item.skill);
  const [oldSkills, setOldSkills] = useState(item.skill);

  return (
    <Autocomplete
      multiple
      id="skills"
      value={selectedSkill?.value}
      onChange={(event, newValue) => {
        setSelectedSkill(newValue);
        props.func.setItem({ ...item, skill: newValue });
      }}
      options={skills}
      getOptionLabel={(option) => option}
      defaultValue={oldSkills}
      renderInput={(params) => (
        <TextField
          error={
            selectedSkill.length < 3 || !selectedSkill.length ? true : false
          }
          helperText={
            selectedSkill.length < 3 || !selectedSkill.length
              ? "Choose at least 3 skills"
              : ""
          }
          {...params}
          label="Skills"
        />
      )}
      sx={{ marginTop: "15px" }}
    />
  );
};
