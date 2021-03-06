import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "utils/auth";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    auth.set(userData.password, userData.email, false);
    auth.setUserInfo(userData.password, false);
    if (auth.get(userData.email)) {
      console.log(auth.get(userData.email));
      this.redirectUser();
    }
  };
  redirectUser = () => {
    console.log("Pushing th root");
    this.props.history.push("/admin");
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
              {/* <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p> */}
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="col s12 form-group">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  className="form-control"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className=" col s12 form-group">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  className="form-control"
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
