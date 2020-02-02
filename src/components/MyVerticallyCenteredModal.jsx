import { Modal, Button } from "react-bootstrap";
import React from "react";
import { Input } from 'antd';
import "bootstrap/dist/css/bootstrap.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Advertisement-Contract
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        {/* <input type="text" value={props.data}></input> */}
        {/* <p>{props.data.replace('\n', "<br>")}</p> */}
        <Input value="Basic usage" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
