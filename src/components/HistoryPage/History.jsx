import "./style.css";
import "../../generalStyle.css";
import { useEffect, useState } from "react";
import { getAllHistoriesApi } from "../../API/API";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { EachHistory } from "./EachHistory";

export const History = () => {
  const [allHistories, setAllHistories] = useState();
  useEffect(() => {
    getAllHistoriesApi().then((data) => setAllHistories(data.reverse()));
  }, []);

  // allHistories ? console.log(allHistories) : console.log("nothing");
  return (
    <main>
      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            {allHistories ? (
              allHistories.map((history, index) => (
                <EachHistory key={index} props={history ? history : []} />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <CircularProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
