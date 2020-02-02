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
import React, { useState, Fragment, useEffect } from "react";
// nodejs library to set properties for components
import Chartist from "chartist";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import CardFooter from "components/Card/CardFooter.jsx";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Quote from "components/Typography/Quote.jsx";
import Muted from "components/Typography/Muted.jsx";
import Primary from "components/Typography/Primary.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success.jsx";
import Warning from "components/Typography/Warning.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

//import upload component
import UploadComponent from "../../components/uploadComponent";
//import collapseable panel
import CollapseablePanel from "../../components/collapsepanel";

import Modal from "../../components/MyVerticallyCenteredModal";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import { message } from "antd";

import axios from "axios";

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function TypographyPage(props) {
  const { classes } = props;
  const [uploadAllFileStatus, setuploadAllFileStatus] = useState(false);
  const [extractedEntities, setExtractedEntities] = useState([]);
  const [completedTasksChart, setCompletedTasksChart] = useState("");
  
  const [value, setValue] = React.useState(0);
  const [trainingStatus, setTrainingStatus] = React.useState(false);

  const [statusTraining, setStatusTraining] = useState(false);



  useEffect(()=>{
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
        setCompletedTasksChart({
          data: data,
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
        });
      }
        
    );
  

  },[]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const fileEntites = [
    {
      id: 101,
      name: "fileName",
      entities: {
        startDate: "",
        endDate: "",
        firstParty: "",
        secondParty: "",
        firstPartyAddress: "",
        secondPartyAddress: ""
      }
    },
    {
      id: 102,
      name: "fileName",
      entities: {
        startDate: "",
        endDate: "",
        firstParty: "",
        secondParty: "",
        firstPartyAddress: "",
        secondPartyAddress: ""
      }
    }
  ];
  const properties = {
    name: "file",
    multiple: true,
    action: "http://localhost:8000/upload",
    onChange(info) {
      const { status, response } = info.file;

      if (status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(info.fileList, "filelist");
        if (info.fileList.every(file => file.status === "done")) {
          console.log("upload completed");
          setExtractedEntities(info.fileList);
          setuploadAllFileStatus(true);
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const onChangeHandler = (index, e) => {
    console.log(index, e.target.value, e.target.name);
    console.log(extractedEntities[index].response[e.target.name]);
    const copy = [...extractedEntities];
    copy[index].response[e.target.name] = e.target.value;
    console.log(copy);
    setExtractedEntities(copy);
  };

  const onSubmitHandler = () => {
    setTrainingStatus(true);
    axios({
      method: "post",
      url: "http://localhost:3000/api/train/model",
      data: extractedEntities,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function(response) {
        //handle success
        console.log(response.data.status);
        setTrainingStatus(false);
        setStatusTraining(true)
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  const renderCompoent=()=>{
    if(value === 1){
      return <GridItem xs={12} sm={12} md={12}>
      <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
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
        
      </GridItem>
    }

    else{
      return <GridItem xs={12} sm={12} md={12}>

    <div style={{marginTop:"15px"}}>
        {!uploadAllFileStatus ? (
          <UploadComponent properties={properties}></UploadComponent>
        ) : (
          ""
        )}
        <br />
        {console.log(extractedEntities, "data to be sent")}
        <CollapseablePanel
          uploadAllFileStatus={uploadAllFileStatus}
          extractedEntities={extractedEntities}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          trainingStatus={trainingStatus}
          statusTraining={statusTraining}
        ></CollapseablePanel>
      </div>
    </GridItem>
    }
  }

  return (
    <Fragment>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Upload Files" />
        <Tab label="Analytics"/>
        
      </Tabs>
    </Paper>
    <GridContainer>
    
    {renderCompoent()}
  </GridContainer>
  </Fragment>
  );
}

TypographyPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(TypographyPage);
