import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";

export default props => {
  // const [selectedOption,setSelectedOption]=useState();
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "black",
      padding: 20
    })
  };
  //console.log(props.loading);
  if (props.loading) {
    return <props.Spinner></props.Spinner>;
  }

  if (props.from === "tablelist")
    return (
      <Select
        options={props.techCompanies}
        styles={customStyles}
        onChange={props.onChangeHandler}
      />
    );

  return (
    <Select
      options={props.techCompanies}
      onChange={props.onChangeHandler}
      value={{ value: "", label: props.value }}
      styles={customStyles}
    />
  );
};
