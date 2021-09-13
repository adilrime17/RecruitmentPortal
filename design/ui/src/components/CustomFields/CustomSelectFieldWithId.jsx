import React from "react";
import {
	FormGroup,
	FormLabel,
	FormControl,
	Box,
	Select,
	MenuItem
} from '@material-ui/core'

function CustomSelectField({label, type, name, menuList, placeholder, value, onChange}) {
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
					component={Select}
					autoComplete="off"
					displayEmpty
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				>
					{menuList.map(
						(option) => (
							<MenuItem key={option.id} value={option.label}>
								{option.label}
							</MenuItem>
						)
					)}
				</Box>
			</FormControl>
		</FormGroup>
	);
}

export default CustomSelectField;
