import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";

export const Tasks = () => {
  return (
    <TableRow>
      <TableCell align="center" width="50px">
        1
      </TableCell>
      <TableCell>
        <h2>Header</h2>
        <p>design and add header</p>
        <AvatarGroup
          max={6}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Avatar alt="1" src="../../../src/assets/img/1.jpg" />
          <Avatar alt="2" src="../../../src/assets/img/2.jpg" />
          <Avatar alt="3" src="../../../src/assets/img/3.jpg" />
        </AvatarGroup>
      </TableCell>
      <TableCell>
        <IconButton aria-label="delete">
          <Edit sx={{ color: "blue" }} />
        </IconButton>
        <IconButton>
          <Delete sx={{ color: "red" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
