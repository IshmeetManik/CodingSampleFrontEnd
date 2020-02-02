import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row align-items-center">
          <div className="col">
            {" "}
            <h4 className="text-center">
              <b>Welcome to </b> Zorang Contract Analyzer{" "}
            </h4>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <p className="text-center ">
              Zorang AI has developed as an Contract analysis and Analytics
              platform using powerful machine learning algorithms and a
              beautifully designed user interface to create a very simple
              experience for your organisation’s Marketing and Business
              Operations teams. You can register/Login to the application.
            </p>
            <br />
          </div>
        </div>
        <div className="row align-items-center">
          <div className=" col btn-group btn-group-lg" role="group">
            <div className="col ">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-primary accent-3"
              >
                Register
              </Link>
              {/* </div>
            <div className="col"> */}
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-primary accent-3 "
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
