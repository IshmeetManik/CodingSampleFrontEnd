import React, { useEffect } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "./ItemModel";
import axios from "axios";
import Spinner from "../components/spinner";
import LaunchIcon from '@material-ui/icons/LaunchTwoTone'
export default props => {
  const [modalShow, setModalShow] = React.useState(false);
  const [documentContent, setDocumentContent] = React.useState(
    <Spinner></Spinner>
  );

  useEffect(() => {
    console.log(props.id);
    if (modalShow) {
      axios
        .get(`http://localhost:3000/api/contracts/${props.id}`)
        .then(function(response) {
          console.log(response.data);
          setDocumentContent(response.data);
        });
    }
  }, [modalShow]);

  return (
    <ButtonToolbar>
     
      <LaunchIcon color="primary"  onClick={() => setModalShow(true)}>
     
      </LaunchIcon>

      <MyVerticallyCenteredModal
        show={modalShow}
        style={{ zIndex: "10005", color: "black" }}
        onHide={() => setModalShow(false)}
        data={documentContent}
      />
    </ButtonToolbar>
  );
};
