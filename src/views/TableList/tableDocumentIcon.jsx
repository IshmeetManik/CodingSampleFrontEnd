import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { ButtonToolbar, Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "components/ItemModel";
import Spinner from "components/spinner";
import axios from "axios";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
function TableDocumentIcon(props) {
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
      <OpenInNewIcon onClick={() => setModalShow(true)}>
        View Document
      </OpenInNewIcon>
      <div style={{ zIndex: "10005" }}>
        <MyVerticallyCenteredModal
          show={modalShow}
          style={{ zIndex: "10005", color: "black" }}
          onHide={() => setModalShow(false)}
          data={documentContent}
        />
      </div>
    </ButtonToolbar>
  );
}
export default withRouter(TableDocumentIcon);
