import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModelButton from "../components/modelbutton";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));
export default props => {
  const classes = useStyles();
  console.log(" contracts details", props["regionWise"]);
  return (
    <div style={{ width: "250px", fontSize: "10px", padding: 0, margin: 0 }}>
      <table>
        <tr>
          <th
            style={{
              color: "black",
              fontSize: "10px",
              padding: 0,
              margin: 0,
              border: "1px solid black",
              borderCollapse: "collapse"
            }}
          >
            {props["header"]}
          </th>
          <th
            style={{
              color: "black",
              fontSize: "10px",
              padding: 0,
              margin: 0,
              border: "1px solid black",
              borderCollapse: "collapse"
            }}
          >
            Contract Count
          </th>
        </tr>

        {props["regionWise"].labels.map((element, index) => {
          return (
            <tr key={index}>
              <td
                style={{
                  color: "black",
                  fontSize: "10px",
                  padding: 0,
                  margin: 0,
                  border: "1px solid black",
                  borderCollapse: "collapse"
                }}
              >
                {element}
              </td>
              <td
                style={{
                  color: "black",
                  fontSize: "10px",
                  padding: 0,
                  margin: 0,
                  border: "1px solid black",
                  borderCollapse: "collapse"
                }}
              >
                {props["regionWise"].series[0][index]}
              </td>
            </tr>
          );
        })}
      </table>
    </div>

    // <Table
    //   className={classes.table}
    //   style={{ width: "5px", padding: "1px" }}
    //   size="small"
    // >
    //   <TableHead>
    //     <TableRow style={{ width: "5px", padding: "1px" }}>
    //       <TableCell style={{ width: "5px", padding: "1px" }}>
    //         State Name
    //       </TableCell>
    //       <TableCell style={{ width: "5px", padding: "1px" }}>
    //         {" "}
    //         Contract Count
    //       </TableCell>
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {props["regionWise"].labels.map((element, index) => (
    //       <TableRow key={index} style={{ width: "5px", padding: "1px" }}>
    //         <TableCell
    //           style={{ width: "5px", padding: "1px", align: "left" }}
    //           component="th"
    //           scope="row"
    //         >
    //           {element}
    //         </TableCell>
    //         <TableCell style={{ width: "5px", padding: "1px", aling: "left" }}>
    //           {props["regionWise"].series[0][index]}
    //         </TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
  );
};
