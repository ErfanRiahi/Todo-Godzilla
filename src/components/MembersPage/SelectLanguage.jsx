import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { getAllLanguages } from "../../API/API";

export const SelectLanguage = (props) => {
  const item = props.func.item;

  console.log(props);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    getAllLanguages().then((countries) =>
      setLanguages(
        [
          ...new Set(
            countries?.map(
              (lang) => lang.languages && Object.values(lang.languages)[0]
            )
          ),
        ]
          .filter((lan) => lan !== undefined)
          .filter((lan) => lan.length <= 15)
      )
    );
  }, []);

  return (
    <Autocomplete
      multiple
      id="languages"
      value={selectedLanguages?.value}
      onChange={(event, newValue) => {
        setSelectedLanguages(newValue);
        props.func.setItem({ ...item, language: newValue });
      }}
      options={languages}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          error={
            selectedLanguages.length > 3 || !selectedLanguages.length
              ? true
              : false
          }
          helperText={
            selectedLanguages.length > 3 || !selectedLanguages.length
              ? "Choose at least 1 or maximum 3 languages"
              : ""
          }
          {...params}
          label="Languages"
        />
      )}
      sx={{ marginTop: "15px" }}
    />
  );
};
