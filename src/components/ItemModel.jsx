import React from "react";

import { Modal, Button } from "react-bootstrap";
import { POINT_CONVERSION_COMPRESSED } from "constants";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Software License Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p style={{"white-space": "pre-line"}}>{typeof(props.data) !=='Object'?props.data:props.data.toString().replace(/\s{2,}/g,' ').trim()}</p>
        
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
