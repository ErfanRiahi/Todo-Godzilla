import { AddCircle, Delete, Edit } from "@mui/icons-material";
import { TableCell, TableRow, Typography } from "@mui/material";

export const EachHistory = ({ props }) => {
  return (
    <TableRow>
      <TableCell>
        {props.typeOfModification === "Deleted" ? (
          <Delete sx={{ color: "red" }} />
        ) : props.typeOfModification === "Edited" ? (
          <Edit sx={{ color: "blue" }} />
        ) : props.typeOfModification === "Added" ? (
          <AddCircle sx={{ color: "purple" }} />
        ) : (
          ""
        )}
      </TableCell>
      <TableCell>
        <Typography>
          The task {props?.taskId} has been {props?.typeOfModification} by{" "}
          {props?.username} at {props?.dataTime}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
