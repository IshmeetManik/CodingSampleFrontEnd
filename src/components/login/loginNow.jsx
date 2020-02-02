import React, { Component } from "react";
import SignIn from "./sigin";
import axios from "axios";
class LoginNow extends Component {
  state = {};

  loginUser = values => {
    // console.log(props);
    console.log(values);
    // const user = {
    //   email: values.email,
    //   password: values.password
    // };
    // axios
    //   .post(`http://192.168.1.22:3000/api/authenticate/login`, {
    //     email: values.email,
    //     password: values.password
    //   })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //     if (res.status) {
    //       //################################
    //       //This is where I put it
    //       console.log("12345", props.history);
    //       props.history.push("/admin");
    //       console.log("212212121", props.history);
    //       //################################
    //     }
    //   });
    // const { data } = axios.post(
    //   "http://192.168.1.22:3000/api/authenticate/login",
    //   {
    //     email: values.email,
    //     password: values.password
    //   }
    // );
    // if (data) {
    //   //history.forceRefresh = true;
    //   // console.log("12345", history);
    //   this.props.history.push("/admin");
    //   console.log("212212121", this.props.history);
    // }
    this.props.history.push("/admin");
  };

  render() {
    return <SignIn onLogin={this.loginUser} {...this.props}></SignIn>;
  }
}

export default LoginNow;
