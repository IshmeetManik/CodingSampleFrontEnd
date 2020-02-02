import React, { useEffect, useState, Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { TextField } from "@material-ui/core";
import SelectEntity from "../../components/textfield";
import SelectDate from "../../components/datepicker";

//Table for Showing Data
import TableData from "../../components/table";

//modal button import
import ModalButton from "../../components/modelbutton";

//import chatbot
import ChatBot from "../../components/chatbot";

//spinner
import Spinner from "../../components/spinner";
import ContractsTableList from "./contractsTableList";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
const techCompanies = [
  { label: "First party", value: "firstParty" },
  { label: "Second party", value: "secondParty" },
  { label: "Effective date", value: "startDate" },
  { label: "Termination date", value: "endDate" }
];

function TableList(props) {
  //set Loading status
  const [loading, setLoading] = useState(false);

  const [currentEntity, setcurrentEntity] = React.useState("");
  const [isLoading, setisLoading] = useState(false);
  const [partyName, setpartyName] = useState("");
  const [data, setdata] = useState([{ label: "", value: "" }]);
  const [selectedDate, setSelectedDate] = useState("");

  const [tableData, setTableData] = useState({
    columns: [
      // {
      //   label: "S No.",
      //   field: "id",
      //   sort: "asc",
      //   width: 150
      // },
      // {
      //   label: "Document Name",
      //   field: "documentname",a
      //   sort: "asc",
      //   width: 270
      // },
      // {
      //   label: "First Party",
      //   field: "firstparty",
      //   sort: "asc",
      //   width: 200
      // },
      // {
      //   label: "Second Party",
      //   field: "secondparty",
      //   sort: "asc",
      //   width: 100
      // },
      // {
      //   label: "Start date",
      //   field: "startdate",
      //   sort: "asc",
      //   width: 150
      // },
      // {
      //   label: "Termination date",
      //   field: "endDate",
      //   sort: "asc",
      //   width: 100
      // },
      // {
      //   label: "Quick View",
      //   field: "viewdocument",
      //   sort: "asc",
      //   width: 100
      // }
    ],

    rows: [
      // {
      //   id: "123",
      //   documentname: "google-fb.txt",
      //   firstparty: "Google Inc.",
      //   secondparty: "Facebook Inc.",
      //   startdate: "2011/04/25",
      //   endDate: "2011/04/25",
      //   documentdata: "hey i am document"
      // }
    ]
  });

  const [selectedEntity, setSelectedEntity] = useState("");

  // on entity select
  const onChangeHandler = event => {
    console.log(event.value);
    setcurrentEntity(event.value);
    setSelectedEntity(event.label);
  };

  // on selecting party
  const onChangeHandler1 = event => {
    console.log(event.label);
    setpartyName(event.label);
  };

  //on date change
  const onDatechange = event => {
    console.log(event.target.value);
    const time = new Date(event.target.value).getTime();
    console.log(time);
    setSelectedDate(time);
  };

  useEffect(() => {
    if (currentEntity === "firstParty" || currentEntity === "secondParty") {
      setLoading(true);
      fetch(`http://localhost:3000/api/projection/${currentEntity}`)
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
          setLoading(false);
          setdata(filterdData);
        });
    }
  }, [currentEntity]);

  useEffect(() => {
    if (partyName) {
      fetch(`http://localhost:3000/api/search/${currentEntity}/${partyName}`)
        .then(results => results.json())
        .then(data => {
          console.log("Data For Enetiy", data);
          setTableData(data);
        })
        .catch(error => {
          console.log(error);
          setTableData("");
        });
    }
  }, [partyName]);

  useEffect(() => {
    console.log(currentEntity);
    console.log(typeof selectedDate.toString());
    if (selectedDate) {
      fetch(
        `http://localhost:3000/api/search/${currentEntity}/${selectedDate.toString()}`
      )
        .then(results => results.json())
        .then(data => {
          console.log(data);
          setTableData(data);
        })
        .catch(error => {
          console.log(error);
          setTableData("");
        });
    }
  }, [selectedDate]);

  return (
    <GridContainer>
      <GridItem style={{ zIndex: "10003",color:"black" }} xs={5} sm={5} md={5}>
        <span>Select Entity</span>
        <SelectEntity
          techCompanies={techCompanies}
          onChangeHandler={onChangeHandler}
          value={selectedEntity}
          from="tablelist"
        ></SelectEntity>
      </GridItem>
      <GridItem style={{ zIndex: "10003",color:"black" }} xs={5} sm={5} md={5}>
        {currentEntity === "startDate" || currentEntity === "endDate" ? (
          <SelectDate onDatechange={onDatechange}></SelectDate>
        ) : (
          <Fragment>
            {!loading ? (
              <span>
                Select{" "}
                {currentEntity
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()
                  .charAt(0)
                  .toUpperCase() +
                  currentEntity
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .toLowerCase()
                    .slice(1)}
              </span>
            ) : (
              ""
            )}
            <SelectEntity
              loading={loading}
              techCompanies={data}
              onChangeHandler={onChangeHandler1}
              Spinner={Spinner}
              value={partyName}
              from="tablelist"
            />
          </Fragment>
        )}
      </GridItem>
      <GridItem style={{ zIndex: "0" }}>
        <div style={{ marginTop: "30px", marginRight: "50px" }}>
          {partyName || selectedDate ? (
            // <TableData tableData={tableData} isLoading={isLoading}></TableData>
            <ContractsTableList data={tableData.rows} />
          ) : (
            ""
          )}
        </div>
      </GridItem>

      <div style={{ zIndex: "10005" }}>
        <ChatBot></ChatBot>
      </div>
    </GridContainer>
  );
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);
