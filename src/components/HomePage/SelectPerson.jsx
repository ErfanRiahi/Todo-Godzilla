import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllMember } from "../../API/API";

export const SelectPerson = (props) => {
  const task = props.props.task;
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [allMembers, setAllMembers] = useState();
  const persons = [];
  useEffect(() => {
    getAllMember().then((data) => setAllMembers(data.data));
  }, []);

  allMembers
    ? allMembers.map((member) =>
        persons.push(`${member.firstName} ${member.lastName}`)
      )
    : "";

  return (
    <Autocomplete
      multiple
      value={selectedPerson?.value}
      onChange={(event, newValue) => {
        setSelectedPerson(newValue);
        props.props.setTask({ ...task, person: newValue });
      }}
      options={persons ? persons : ""}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Persons"
          error={task.person?.length ? false : true}
          helperText={task.person?.length ? "" : "Declare one person at least"}
        />
      )}
      sx={{ marginTop: "15px" }}
    />
  );
};
