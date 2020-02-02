import React, { useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "components/ItemModel";
import axios from "axios";
import Spinner from "components/spinner";
import SignUp from "./../../components/login/signUp";

function UserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUp fromAdmin={true} auth={props.auth} onAdd={props.onAdd} />
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
export default UserModal;
