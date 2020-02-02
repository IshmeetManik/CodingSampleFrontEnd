import React, { Component, useEffect } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import MaterialTable from "material-table";
import logo from "assets/img/reactlogo.png";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import routes from "routes.js";
import image from "assets/img/sidebar-2.jpg";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Navbar from "components/Navbars/Navbar.jsx";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {
  getAllUsersUrl,
  updateUserUrl,
  deleteUserUrl
} from "../../config/all.js";
import template from "es6-dynamic-template";

import UserModal from "./userCreationModal";
import { UserProfile } from "views/UserProfile/UserProfile.jsx";
class userTable extends Component {
  state = {
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Last  Name", field: "lastName" },
      { title: "Email", field: "email" },
      {
        title: "Role",
        field: "role",
        lookup: { 1: "Admin", 2: "User" }
      }
    ],
    data: [],
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false,
    showModal: false
  };

  async componentDidMount() {
    console.log("User List Component", this.state.data);
    console.log(
      "props --- User Info --component did Mount",
      this.props.auth.getUserInfo()
    );
    var userProfile = this.props.auth.getUserInfo();
    var self = this;
    const { data } = await axios.get(getAllUsersUrl(userProfile.organization));

    if (data) {
      console.log(data);

      self.setState({ data: data });
    }
    console.log("state", this.state);
  }
  async rowAdded() {
    this.setState({ ...this.setState, showModal: false });
    var self = this;
    var userProfile = this.props.auth.getUserInfo();
    const { data } = await axios.get(
      //template(getAllUsersUrl, userProfile.organization)
      getAllUsersUrl(userProfile.organization)
    );

    if (data) {
      console.log(data);

      self.setState({ data: data });
    }
    console.log("state", this.state);
  }
  onClose = () => {
    this.setState({ ...this.setState, showModal: false });
  };
  async rowUpdated(newData) {
    var userProfile = this.props.auth.getUserInfo();
    const { data } = await axios.put(updateUserUrl, {
      email: newData.email,
      password: newData.password,
      firstName: newData.firstName,
      lastName: newData.lastName,
      role: newData.role === "1" ? "Admin" : "User",
      organization: userProfile.organization
    });
  }
  async rowDelete(oldData) {
    var UserProfile = this.props.getUserInfo();

    const { data } = await axios.delete(
      deleteUserUrl(UserProfile.organization, oldData.email)
    );
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  mainPanel = React.createRef();
  render() {
    console.log("Props--userlist->", this.props);
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Zorang"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />

        <div className={classes.mainPanel} ref={this.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <Navbar
                routes={routes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
              <MaterialTable
                title="Users"
                columns={this.state.columns}
                data={this.state.data}
                disableUnderline="true"
                actions={[
                  {
                    icon: "add",
                    tooltip: "Add User",
                    isFreeAction: true,
                    onClick: event =>
                      this.setState({ ...this.state, showModal: true })
                  }
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        this.rowUpdated(newData);
                        const data = [...this.state.data];
                        data[data.indexOf(oldData)] = newData;
                        this.setState({ ...this.state, data });
                      }, 600);
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...this.state.data];
                        data.splice(data.indexOf(oldData), 1);
                        this.setState({ ...this.state, data });
                        this.rowDelete(oldData);
                      }, 600);
                    })
                }}
              />
              <UserModal
                show={this.state.showModal}
                onAdd={this.rowAdded.bind(this)}
                onHide={this.onClose}
                data={""}
                auth={this.props.auth}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(dashboardStyle)(userTable);
