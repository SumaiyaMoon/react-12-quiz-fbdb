import * as React from "react";
import {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type SMInputProps = {
  textFieldId: string;
  textFieldLabel: string;
  textFieldVariant: any;
  type: string;
  onChange?: any;
  value?: any;
  disabled?: boolean,
};

export default function SMInput(props: SMInputProps) {
 


    

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type={props.type}
          id={props.textFieldId}
          onChange={props.onChange}
          label={props.textFieldLabel}
          variant={props.textFieldVariant}
          className="w-100"
          value={props.value}
          disabled={props.disabled} 
        />
      </Box>
    </>
  );
}
