import React, { useState, useEffect, Fragment } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Collapse, Input, Form } from "antd";
import { Button, Modal } from "react-bootstrap";
//spinner
import Spinner from "../components/spinner";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const { TextArea } = Input;

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default props => {
  const [documentContent, setDocumentContent] = useState("hello");
  const [statusTraining, setStatusTraining] = useState("hello");
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/contracts/5d3977a758f96014607b539e`)
      .then(function(response) {
        console.log(response.data);
        setDocumentContent(response.data);
      });
  });

  if (!props.uploadAllFileStatus) {
    return null;
  }
  return (
    <Fragment>
      <Collapse accordion onChange={callback}>
        {props.extractedEntities.map((element, index) => {
          let data = element.response;
          return (
            <Panel header={data.fileName} key={index}>
              <Form>
                <GridContainer>
                  <GridItem md={6}>
                    Start Date:{" "}
                    <Input
                      placeholder="Not Found"
                      value={data.effectiveDate}
                      allowClear
                      name="effectiveDate"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                  <GridItem md={6}>
                    Validity:{" "}
                    <Input
                      placeholder="Not Found"
                      allowClear
                      value={data.validity}
                      name="validity"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer>
                  <GridItem md={6}>
                    First Party Name:{" "}
                    <Input
                      placeholder="Not Found"
                      allowClear
                      value={data.firstParty}
                      name="firstParty"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                  <GridItem md={6}>
                    Second Party Name:{" "}
                    <Input
                      placeholder="Not Found"
                      allowClear
                      value={data.secondParty}
                      name="secondParty"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                <GridContainer>
                  <GridItem md={6}>
                    First Party Address:{" "}
                    <Input
                      placeholder="Not Found"
                      allowClear
                      value={data.firstPartyAddress}
                      name="firstPartyAddress"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                  <GridItem md={6}>
                    Second Party Address:{" "}
                    <Input
                      placeholder="Not Found"
                      allowClear
                      value={data.secondPartyAddress}
                      name="secondPartyAddress"
                      onChange={e => props.onChangeHandler(index, e)}
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                Document:
                <TextArea value={data.text} rows={18} />
              </Form>
            </Panel>
          );
        })}
      </Collapse>
      <br />
      <br />
      {props.trainingStatus ? (
        <Spinner></Spinner>
      ) : !props.statusTraining ? (
        <Button onClick={props.onSubmitHandler}>Start Training</Button>
      ) : (
        <>
          <Button variant="primary" onClick={handleShow}>
            Training Completed
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              {/* <Modal.Title>Training Completed</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>Training Completed</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                OK
              </Button>
              {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Fragment>
  );
};
