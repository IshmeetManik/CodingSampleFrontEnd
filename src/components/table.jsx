import React from "react";
import ModelButton from "../components/modelbutton";

const Table = props => {
  if (!props.tableData.rows) {
    return <h5>No Data Found</h5>;
  }

  return (
    <table className="table" style={{marginTop:'50px',marginRight:'50px',width:'65vw',borderTop:'1px solid black'}}>
      <thead>
        <tr style={{background:'#51d8e8'}}>
          {props.tableData.columns.map(column => {
            return (
              <th scope="col" key={column.label}>
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.tableData.rows.map((row, index) => {
          return (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td>{row.documentname}</td>
              <td>{row.firstparty}</td>
              <td>{row.secondparty}</td>
              <td>{row.startdate}</td>
              <td>{row.terminationdate}</td>
              <td>
                <ModelButton id={row.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
