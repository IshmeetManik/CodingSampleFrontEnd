import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export default props => {
  return (
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action active">
        Do you want any further help?
      </a>

      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() =>
          props.handleEvent("Yes")
        }
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        Yes
      </a>
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={() =>
          props.handleEvent("No")
        }
      >
        <i className="fas fa-chevron-right" />
        <span className="glyphicon glyphicon-menu-right m-2" />
        No
      </a>
    </div>
  );
};
