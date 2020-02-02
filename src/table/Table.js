import React, { Component } from "react";
import "./table.css";

class Table extends Component {
  constructor(props) {
    super();
    console.log(props);
  }
  state = {};
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td
              style={{
                color: "black",
                fontSize: "10px",
                padding: 0,
                margin: 0,
                border: "1px solid black",
                borderCollapse: "collapse"
              }}
              colspan="2"
            >
              {this.props.documentData["fileName"]}
            </td>
          </tr>
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
              Entities
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
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.documentData).map(entity => {
            if (entity === "fileName" || entity === "text") {
              return;
            }
            return (
              <tr key={entity}>
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
                  {entity.toUpperCase()}
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
                  {this.props.documentData[entity]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
