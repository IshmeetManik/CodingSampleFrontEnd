import React, { Component } from "react";
import axios from "axios";
import ModelButton from "../../components/modelbutton";
  class ContractsCount extends Component{    
    
   
    render(){
        console.log("props",this.props)
        return (
            <div style={{ width: "100%", fontSize: "12px", padding: "0px 5px", margin: 0 }}>
              <table style={{ padding: "0px 5px" }}>
                <tr
                  style={{
                    color: "black",
                    fontSize: "12px",
                    //background:"#ff8f31",
                    padding: "0px 5px",
                    margin: 0,
                    border: "1px solid black",
                    borderCollapse: "collapse"
                  }}
                >
                  <th
                    style={{
                      color: "black",
                      fontSize: "12px",
                      padding: "0px 5px",
                      margin: 0,
                      border: "1px solid black",
                      borderCollapse: "collapse"
                    }}
                  >
                    Company Name
                  </th>
                  <th
                    style={{
                      color: "black",
                      fontSize: "12px",
                      padding: "0px 5px",
                      margin: 0,
                      border: "1px solid black",
                      borderCollapse: "collapse"
                    }}
                  >
                    Count
                  </th>
                </tr>
                {this.props.contractCount.parties.map(
                  (element, index) => {
                    return (
                      <tr
                        style={{
                          color: "black",
                          fontSize: "12px",
                          padding: "0px 5px",
                          margin: 0,
                          border: "1px solid black"
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            color: "black",
                            fontSize: "12px",
                            padding: "0px 5px",
                            margin: 0,
                            border: "1px solid black",
                            borderCollapse: "collapse"
                          }}
                        >
                          {
                            this.props.contractCount.parties[
                              index
                            ]
                          }
                        </td>
                        <td
                          style={{
                            color: "black",
                            fontSize: "12px",
                            padding: "0px 5px",
                            margin: 0,
                            border: "1px solid black",
                            borderCollapse: "collapse"
                          }}
                        >
                          {
                            this.props.contractCount.contractsCount[
                              index
                            ]
                          }
                        </td>
                      </tr>
                    );
                  }
                )}
              </table>
            </div>
          );
    }



  }
  export default ContractsCount
