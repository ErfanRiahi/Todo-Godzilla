import { Delete, Edit, PhotoCamera } from "@mui/icons-material";
import { Avatar, Button, FormControl, Tooltip } from "@mui/material";
import { useState } from "react";

export const SelectProfileImage = (props) => {
  const [imagePreview, setImagePreview] = useState("");

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleProfileImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImagePreview(base64);
    props.func(base64);
    // profilePhoto?.setValue(base64);
    // imagePreview?.setValue(URL.createObjectURL(event.target.files[0]));
  };

  const deleteProfileImage = () => {
    setImagePreview("");
  };

  return (
    <FormControl sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        alt="ProfilePhoto"
        src={imagePreview}
        sx={{ width: 70, height: 70 }}
      />
      <div>
        <Button
          onClick={deleteProfileImage}
          sx={{ minWidth: 0, padding: 0, marginRight: "15px" }}
        >
          <Tooltip title="Delete Photo">
            <Delete color="error" />
          </Tooltip>
        </Button>
        <Button component="label" sx={{ minWidth: 0, padding: 0 }}>
          <Tooltip title={imagePreview ? "Change photo" : "Upload photo"}>
            <Edit />
          </Tooltip>
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
          />
        </Button>
      </div>
    </FormControl>
  );
};
