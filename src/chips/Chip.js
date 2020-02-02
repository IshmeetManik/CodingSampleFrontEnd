import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Upload from "../upload/Upload";
import RegionWiseContract from "../regionWiseContractCount/regionWiseContractCount";
import Options from "../chatbotOptions/chatbotOptions";
import HelpOption from "../chatHelpOption/chatHelpOption";
import ModelButton from "../components/modelbutton";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  renderCustomComponent
} from "react-chat-widget";
import chatHelpOption from "chatHelpOption/chatHelpOption";

class Chip extends React.PureComponent {
  state = {
    contractCount: "",
    regionWise: "",
    numberOfContractExpiring: "",
    contractsExpiringInCurrentMonth: ""
  };

  componentDidMount = () => {
    //console.log("component did mount");
    fetch("http://localhost:3000/api/analytics/histoGram")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
        this.setState({ contractCount: data });
      });

    fetch("http://localhost:3000/api/analytics/regionHistogram")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
        this.setState({ regionWise: data });
      });

    fetch("http://localhost:3000/api/analytics/trending/companies/ALL")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
        console.log(data.series[0][0]);
        //this.setState({ contractsExpiringInCurrentMonth: data.series[0][0] });
        this.setState({ numberOfContractExpiring: data });
      });

    fetch("http://localhost:3000/api/analytics/expireThisMonth/this")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ contractsExpiringInCurrentMonth: data });
      });
  };

  handleEvent = value => {
    console.log(value);

    if (value === "Contract expiring in upcoming months") {
      addUserMessage("Contract expiring in upcoming months");

      renderCustomComponent(RegionWiseContract, {
        regionWise: this.state.numberOfContractExpiring,
        header: "Month"
      });
      // renderCustomComponent(chatHelpOption, {
      //   handleEvent: this.handleEvent
      // });

      return;
    }

    if (value === "Analyse a contract") {
      addUserMessage("I want to analyse a contract");
      renderCustomComponent(Upload, { state: false });

      return;
    }

    if (value === "Region wise contract count") {
      addUserMessage("Tell me region wise contract count");
      renderCustomComponent(RegionWiseContract, {
        regionWise: this.state.regionWise,
        header: "State Name"
      });
      // renderCustomComponent(chatHelpOption, {
      //   handleEvent: this.handleEvent
      // });
      return;
    }

    if (value === "Company wise contract count") {
      addUserMessage("Company wise contract count");
      renderCustomComponent(RegionWiseContract, {
        regionWise: this.state.contractCount,
        header: "Company Name"
      });
      // renderCustomComponent(chatHelpOption, {
      //   handleEvent: this.handleEvent
      // });
      return;
    }

    if (value === "Yes") {
      renderCustomComponent(Options, {
        handleEvent: this.handleEvent
      });
      return;
    }

    if (value === "No") {
      return;
    }

    if (value === "Summarize a contract") {
      addUserMessage("Summarize a contract");
      renderCustomComponent(Upload, { state: true });

      return;
    }

    let newMessage = value;
    addUserMessage(newMessage);
    axios
      .all([
        axios.post("http://localhost:5005/webhook", {
          message: newMessage
        }),
        axios.post("http://localhost:5000/parse", {
          query: newMessage,
          project: "current",
          model: "nlu"
        })
      ])
      .then(
        axios.spread(function(
          coreResponseAboutResponse,
          nluResponseAboutIntent
        ) {
          console.log(coreResponseAboutResponse.data[0].text);
          coreResponseAboutResponse.data[0].text == undefined
            ? addResponseMessage("Alright")
            : addResponseMessage(coreResponseAboutResponse.data[0].text);
          console.log(nluResponseAboutIntent.data.intent.name);
          if (nluResponseAboutIntent.data.intent.name === "upload") {
            renderCustomComponent(Upload, { state: false });
          }
        })
      )
      //.then(response => this.setState({ vehicles: response.data }))
      .catch(error => console.log(error));
  };

  render() {
    if (
      this.props.currentMonth &&
      this.state.contractsExpiringInCurrentMonth.labels
    ) {
      console.log(
        "contracts expiring",
        this.state.contractsExpiringInCurrentMonth
      );
      //let data =JSON.parse(this.state.contractsExpiringInCurrentMonth)
      console.log("label length", [0]);

      return (
        <div style={{ width: "50px", fontSize: "10px", padding: 0, margin: 0 }}>
          <table style={{ padding: 0 }}>
            <tr
              style={{
                color: "black",
                fontSize: "10px",
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
            {this.state.contractsExpiringInCurrentMonth.labels.map(
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
                        this.state.contractsExpiringInCurrentMonth.firstParty[
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
                        this.state.contractsExpiringInCurrentMonth.secondParty[
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
                          this.state.contractsExpiringInCurrentMonth.series[0][
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
    } else {
      return <Options handleEvent={this.handleEvent}></Options>;
    }
  }
}

export default Chip;
