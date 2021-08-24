import React from "react";
import { FormLabel, Checkbox } from "@material-ui/core";

function CustomCheckboxField({ label, name, checked, onChange }) {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Checkbox
        name={name}
        color="primary"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
}

export default CustomCheckboxField;
