import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function DatePickers(props) {


  return (
    
      <TextField
        id="date"
        label="Select date"
        type="date"
      onChange={props.onDatechange}
        defaultValue=""
        
        InputLabelProps={{
          shrink: true
        }}
      />
    
  );
}
