import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default props => {
 
  return (
    <div className="list-group w-100">
      <a href="#" className="list-group-item list-group-item-action active">
        Here are the list of things to get started
      </a>
      {/* <a
            href="#"
            className="list-group-item list-group-item-action"
            onClick={() => this.handleEvent("I want to train the bot")}
          >
            <i className="fas fa-chevron-right" />
            <span className="glyphicon glyphicon-menu-right m-2" />
            Train the Bot
          </a> */}
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() => props.handleEvent("Analyse a contract")}
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" /> Analyse a
        contract
      </a>

      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() =>
          props.handleEvent("Contract expiring in upcoming months")
        }
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        Contract expiring in upcoming months
      </a>
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() => props.handleEvent("Company wise contract count")}
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        Company wise contract count
      </a>
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() => props.handleEvent("Region wise contract count")}
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        Region wise contract count
      </a>

      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() => props.handleEvent("Summarize a contract")}
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        Summarize a contract
      </a>
    </div>
  );
};
