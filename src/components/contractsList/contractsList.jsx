import React, { Component } from "react";
import axios from "axios";
import ModelButton from "../../components/modelbutton";
  class ContractsList extends Component{    
    
   
    render(){
        console.log("props",this.props)
        return (
            <div style={{ width: "100%", fontSize: "10px", padding: 0, margin: 0 }}>
              <table style={{ padding: 0 }}>
                <tr
                  style={{
                    color: "black",
                    fontSize: "10px",
                    //background:"#ff8f31",
                    padding: 0,
                    margin: 0,
                    border: "1px solid black",
                    borderCollapse: "collapse"
                  }}
                >
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
                    First Party
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
                    Second Party
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
                    File Name
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
                    Quick View
                  </th>
                </tr>
                {this.props.contractsExpiringInCurrentMonth.labels.map(
                  (element, index) => {
                    return (
                      <tr
                        style={{
                          color: "black",
                          fontSize: "10px",
                          padding: 0,
                          margin: 0,
                          border: "1px solid black"
                        }}
                        key={index}
                      >
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
                          {
                            this.props.contractsExpiringInCurrentMonth.firstParty[
                              index
                            ]
                          }
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
                          {
                            this.props.contractsExpiringInCurrentMonth.secondParty[
                              index
                            ]
                          }
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
                          <ModelButton
                            id={
                              this.props.contractsExpiringInCurrentMonth.series[0][
                                index
                              ]
                            }
                          />
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
  export default ContractsList
