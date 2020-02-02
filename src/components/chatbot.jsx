import React, { Component } from "react";
import axios from "axios";
//import Upload from "./components/uploadComponent";
import Upload from "../upload/Upload";
import Chip from "../chips/Chip";
import Options from "../chatbotOptions/chatbotOptions";
import RegionWiseContract from "../regionWiseContractCount/regionWiseContractCount";
import ContractsList from './contractsList/contractsList';
import ContractsCountComp from './contractsCount/contractsCount';
import { Resizable } from "re-resizable";

import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  renderCustomComponent,
  dropMessages
} from "react-chat-widget";

//import "react-chat-widget/lib/styles.css";
import "./chatbot/styles.css";


import logo from "./logo.png";

// const Button = ({ color, handleClick }) => (
//   <button type="button" className={`${color}`} onClick={handleClick}>
//     This is a button!
//   </button>
// );

class App extends React.Component {
  constructor() {
    super()
  this.state={ 
    contractsExpiringInCurrentMonth: "",
    contractCount: ""
}
this.sendMessage=this.sendMessage.bind(this);
}
  async componentDidMount() {
    //addResponseMessage("Hello");
    dropMessages();
    renderCustomComponent(Chip, {});

    // renderCustomComponent(Upload, {
    //   color: "primary",
    //   handleClick: this.handleClick
    // });
    var self = this;
    await axios
    .get("http://localhost:3000/api/analytics/expireThisMonth/this")
    .then(function(response) {
      console.log(response.data);
      self.setState({ contractsExpiringInCurrentMonth: response.data });
    });
    
  }

  handleNewUserMessage = newMessage => {
    this.sendMessage(newMessage);
  };

  sendMessage(newMessage){
    var self=this;
    axios
      .all([
        axios.post("http://localhost:5005/webhooks/rest/webhook", {
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

          if (
            coreResponseAboutResponse.data === [] ||
            nluResponseAboutIntent.data.intent.confidence < 0.6
          ) {
            addResponseMessage("I'm Sorry, I Didn't Understand That.");
            return;
          }

          if (
            coreResponseAboutResponse.data[0] &&
            nluResponseAboutIntent.data.intent.name != "help" &&
            nluResponseAboutIntent.data.intent.name != "expire" &&
            nluResponseAboutIntent.data.intent.name != "upload"
          ) {
            addResponseMessage(coreResponseAboutResponse.data[0].text);
          }

          if (nluResponseAboutIntent.data.intent.name === "help") {
            renderCustomComponent(Chip, { currentMonth: false });
          }

          if (nluResponseAboutIntent.data.intent.name === "expire") {
            renderCustomComponent(ContractsList, { contractsExpiringInCurrentMonth: self.state.contractsExpiringInCurrentMonth});
          }

          if (nluResponseAboutIntent.data.intent.name === "upload") {
            renderCustomComponent(Upload, { state: false });
          }

          if(nluResponseAboutIntent.data.intent.name === "contractsCount"){
            var query = "all";
            if(nluResponseAboutIntent.data.entities.length > 0 ){
                if(nluResponseAboutIntent.data.entities[0].entity == "company")
                    query = "company?name="+nluResponseAboutIntent.data.entities[0].value;
            }
            
            console.log("contractsCount triggered");
            axios
            .get("http://localhost:3000/api/analytics/contractsCount/"+query)
            .then(function(response) {
              console.log(response.data);
              renderCustomComponent(ContractsCountComp, { contractCount: response.data });
            });
          
          }

          if(nluResponseAboutIntent.data.intent.name === "contracts"){
            console.log("Under Contracts....");
            console.log(nluResponseAboutIntent.data);
            var query = "all";
            if(nluResponseAboutIntent.data.entities.length > 0 ){
                if(nluResponseAboutIntent.data.entities[0].entity == "company")
                    query = "company?name="+nluResponseAboutIntent.data.entities[0].value;
            }
            
            console.log("contracts triggered");
            axios
            .get("http://localhost:3000/api/analytics/contracts/"+query)
            .then(function(response) {
              console.log(response.data);
              renderCustomComponent(ContractsList, { contractsExpiringInCurrentMonth: response.data});
            });
          
          }



          
        })
      )
      //.then(response => this.setState({ vehicles: response.data }))
      .catch(error => console.log(error));
    }
  render() {
    const style = {
	  bottom:"0",
      display: "flow-root",
	//-ms-flex-direction:"column",
	//flex-direction:"column",
	margin:"0 20px 20px 0",
	//max-width:"370px",
	position:"fixed",
	right:"0",
    height: "600px",
	zIndex:"1",
    paddingBottom: "35px"
	};
    return (
      <div className="App">
        <Resizable
	    style={style}
	  >
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Contract Analyser"
          subtitle="Get insights of your contracts"
        />
      </Resizable>
      </div>
    );
  }
}

export default App;
