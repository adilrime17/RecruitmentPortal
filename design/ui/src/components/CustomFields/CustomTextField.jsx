import React from "react";
import {
	FormGroup,
	FormLabel,
	FormControl,
	Box,
	FilledInput
} from '@material-ui/core'

function CustomTextField({label, type, name, placeholder, value, onChange}) {
  return (
		<FormGroup style={{ marginBottom: "0.5rem" }}>
			<FormLabel>{label}</FormLabel>
			<FormControl
				variant="filled"
				component={Box}
				width="100%"
				marginBottom="1rem!important"
			>
				<Box
					paddingLeft="0.75rem"
					paddingRight="0.75rem"
					component={FilledInput}
					autoComplete="off"
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</FormControl>
		</FormGroup>
	);
}

export default CustomTextField;
