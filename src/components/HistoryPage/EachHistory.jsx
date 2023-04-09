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
          The <strong>task {props?.taskId}</strong> has been{" "}
          <strong>{props?.typeOfModification}</strong> by{" "}
          <strong>{props?.username}</strong> at{" "}
          <strong>{props?.dataTime}</strong>
        </Typography>
      </TableCell>
    </TableRow>
  );
};
