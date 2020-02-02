/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Chartist from "chartist";

import React from "react";
// nodejs library to set properties for components

import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import { dailySalesChart, completedTasksChart } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import axios from "axios";
import SelectEntity from "../../components/textfield";
import LeafletMap from "views/Maps/LeafletMap";


// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

class Dashboard extends React.Component {
  constructor() {
    super();
    console.log("constructor called");
    this.state = {
      allContractsDetails: [],
      value: 0,
      emailsSubscriptionChart: {
        data: {
          labels: [],
          series: [[]]
        }
      },
      emailsSubscriptionChart1: {
        data: {
          labels: [],
          series: [[]]
        }
      },
      listData: [
        {
          value: "5d3977a758f96014607b539d",
          label: "Google, inc"
        }
      ],
      completedTasksChart: "",
      selectedParty: "ALL",
      dailySalesChart: ""
    };
  }

  
  // on selecting party
  onChangeHandler1 = event => {
    this.setState({ selectedParty: event.label });
    console.log("Selected Party", this.state.selectedParty);
    fetch(
      `http://localhost:3000/api/analytics/trending/companies/${event.label}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          console.log("this is data: ", data);
          this.setState({
            dailySalesChart: {
              data,
              options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
                }),
                low: 0,
                high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                axisY: {
                  onlyInteger: true,
                  offset: 20
                },
                chartPadding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              },
              // for animation
              animation: {
                draw: function(data) {
                  if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                      d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                          .clone()
                          .scale(1, 0)
                          .translate(0, data.chartRect.height())
                          .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                      }
                    });
                  } else if (data.type === "point") {
                    data.element.animate({
                      opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                      }
                    });
                  }
                }
              }
            }
          });
          console.log("parsed json", data);
        },
        ex => {
          this.setState({
            requestError: true
          });
          console.log("parsing failed", ex);
        }
      );
      
  };

  componentDidUpdate = () => {
    console.log("component did update");
  };

  componentDidMount = () => {
    console.log("component did mount");
    fetch("http://localhost:3000/api/analytics/histoGram")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          this.setState({
            emailsSubscriptionChart: {
              data: data,
              options: {
                axisX: {
                  showGrid: false
                },
                low: 0,
                high: 10,
                axisY: {
                  onlyInteger: true,
                  offset: 20
                },
                chartPadding: {
                  top: 0,
                  right: 5,
                  bottom: 0,
                  left: 0
                }
              },
              responsiveOptions: [
                [
                  "screen and (max-width: 640px)",
                  {
                    seriesBarDistance: 5,
                    axisX: {
                      labelInterpolationFnc: function(value) {
                        return value[0];
                      }
                    }
                  }
                ]
              ],
              animation: {
                draw: function(data) {
                  if (data.type === "bar") {
                    data.element.animate({
                      opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: "ease"
                      }
                    });
                  }
                }
              }
            }
          });
          console.log("parsed json", data);
        },
        ex => {
          this.setState({
            requestError: true
          });
          console.log("parsing failed", ex);
        }
      );
    fetch("http://localhost:3000/api/analytics/regionHistogram")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          this.setState({
            emailsSubscriptionChart1: {
              data: data,
              options: {
                axisX: {
                  showGrid: false
                },
                low: 0,
                high: 10,
                axisY: {
                  onlyInteger: true,
                  offset: 20
                },
                chartPadding: {
                  top: 0,
                  right: 5,
                  bottom: 0,
                  left: 0
                }
              },
              responsiveOptions: [
                [
                  "screen and (max-width: 640px)",
                  {
                    seriesBarDistance: 5,
                    axisX: {
                      labelInterpolationFnc: function(value) {
                        return value[0];
                      }
                    }
                  }
                ]
              ],
              animation: {
                draw: function(data) {
                  if (data.type === "bar") {
                    data.element.animate({
                      opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: "ease"
                      }
                    });
                  }
                }
              }
            }
          });
          console.log("parsed json", data);
        },
        ex => {
          this.setState({
            requestError: true
          });
          console.log("parsing failed", ex);
        }
      );

    fetch(
      `http://localhost:3000/api/analytics/trending/companies/${this.state.selectedParty}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          console.log("this is data: ", data);
          this.setState({
            dailySalesChart: {
              data: data,
              options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
                }),
                low: 0,
                high:8 , // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                axisY: {
                  onlyInteger: true
                },
                chartPadding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              },
              // for animation
              animation: {
                draw: function(data) {
                  if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                      d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                          .clone()
                          .scale(1, 0)
                          .translate(0, data.chartRect.height())
                          .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                      }
                    });
                  } else if (data.type === "point") {
                    data.element.animate({
                      opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                      }
                    });
                  }
                }
              }
            }
          });
          console.log("parsed json", data);
        },
        ex => {
          this.setState({
            requestError: true
          });
          console.log("parsing failed", ex);
        }
      );
    fetch("http://localhost:3000/api/analytics/trendingGraph/training")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(data => data.json())
      .then(
        data => {
          this.setState({
            completedTasksChart: {
              data: data,
              options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
                }),
                low: 0,
                high: 30, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                axisY: {
                  onlyInteger: true
                },
                chartPadding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              },
              animation: {
                draw: function(data) {
                  if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                      d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                          .clone()
                          .scale(1, 0)
                          .translate(0, data.chartRect.height())
                          .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                      }
                    });
                  } else if (data.type === "point") {
                    data.element.animate({
                      opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                      }
                    });
                  }
                }
              }
            }
          });
          console.log("parsed json", data);
        },
        ex => {
          this.setState({
            requestError: true
          });
          console.log("parsing failed", ex);
        }
      );
    fetch(`http://localhost:3000/api/projection/firstParty`)
      .then(results => results.json())
      .then(data => {
        console.log(data);
        //remove duplicate first pary coming from database
        const seen = new Set();
        const filterdData = data.filter(el => {
          const duplicate = seen.has(el.label);
          seen.add(el.label);
          return !duplicate;
        });
        //setLoading(false);
        this.setState({ listData: filterdData});
        //this.setState({ selectedParty: data[0].label });
      });
  };


  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    console.log("On Render............................................................................................")
    console.log(this.state.allContractsDetails);
    const { classes } = this.props;
    console.log("render compoents");
    return (
      <div>
        {/* <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>$34,245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer> */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.dailySalesChart.data}
                  type="Line"
                  options={this.state.dailySalesChart.options}
                  listener={this.state.dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "160px",zIndex:"1003" }}>
                <h4 className={classes.cardTitle}>Contracts Expiring</h4>
                <br></br>
                <p className={classes.cardCategory}>
                  {/* <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "} */}
                  {/* <input type="color" value="#FF0000" disabled></input> Zorang
                  Inc. <br></br>
                  <input type="color" value="#ffffff" disabled></input> Google
                  Inc. <br></br>
                  <input type="color" value="#f4c63d" disabled></input> Facebook
                  Inc. */}
                  <SelectEntity
                    techCompanies={this.state.listData}
                    onChangeHandler={this.onChangeHandler1}
                    value={this.state.selectedParty}
                  />
                  <br />
                  Select the company to know number of contracts expiring in
                  each month.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated a second ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.emailsSubscriptionChart.data}
                  type="Bar"
                  options={this.state.emailsSubscriptionChart.options}
                  responsiveOptions={
                    this.state.emailsSubscriptionChart.responsiveOptions
                  }
                  listener={this.state.emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "160px" }}>
                <h4 className={classes.cardTitle}>Contracts Count</h4>
                <p className={classes.cardCategory}>
                  This graph shows number of contracts with each company.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated a second ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.emailsSubscriptionChart1.data}
                  type="Bar"
                  options={this.state.emailsSubscriptionChart1.options}
                  responsiveOptions={
                    this.state.emailsSubscriptionChart1.responsiveOptions
                  }
                  listener={this.state.emailsSubscriptionChart1.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "160px" }}>
                <h4 className={classes.cardTitle}>Contracts Region Wise</h4>
                <p className={classes.cardCategory}>
                  This graph shows number of contracts in a geographical area.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated a second ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.completedTasksChart.data}
                  type="Line"
                  options={this.state.completedTasksChart.options}
                  listener={this.state.completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody style={{ height: "160px" }}>
                <h4 className={classes.cardTitle}>Rounds of Training</h4>
                <p className={classes.cardCategory}>
                  This graph shows how many times the model has been trained over the time
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated a second ago
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>
        <GridContainer>
        
          { <GridItem xs={12} sm={12} md={12}>
          <div id="map">
          <LeafletMap />
          </div>
         
          </GridItem> }
          <GridItem xs={12} sm={12} md={6}>
            {/* <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card> */}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
