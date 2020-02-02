import React, { Component } from "react";
import MaterialTable from "material-table";
import image from "assets/img/sidebar-2.jpg";
import TableDocumentIcon from "./tableDocumentIcon";
class ContractsTableList extends Component {
  state = {
    columns: [
      { title: "Document Name", field: "documentname" },
      { title: "First Party", field: "firstparty" },
      { title: "Second Party", field: "secondparty" },
      {
        title: "Start Date",
        field: "startdate"
      },
      {
        title: "Termination Date",
        field: "terminationdate"
      },
      {
        title: "",
        field: "id",
        render: rowData => <TableDocumentIcon id={rowData.id} />
      }
    ],
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false
  };
  render() {
    console.log("Props--ContractsList->", this.props);
    const { classes, ...rest } = this.props;

    return (
      <MaterialTable
        title="Contracts"
        columns={this.state.columns}
        data={this.props.data}
        disableUnderline="true"
        actions={[]}
      />
    );
  }
}

export default ContractsTableList;
