import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/profile.js";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  FormGroup,
  FormLabel,
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button,
	Checkbox
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function WoaWos() {
	const classes = useStyles();
	const [woawos, setWoawos] = useState({
		cnic: ""
	})

	const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setWoawos({
      ...woawos,
      [e.target.name]: e.target.value,
    });
  };

	const handleCheckFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log(e.target.name);

    setWoawos({
      ...woawos,
      [e.target.name]: e.target.checked,
    });
  };

	const handleSubmit = () => {
    console.log("Handle Submit: ", woawos);
  };
    return (
        <>
            <Grid
        item
        xs={12}
        // xl={8}
        component={Box}
        marginBottom="3rem"
        classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
      >
				<Card
          classes={{
            root: classes.cardRoot + " " + classes.cardRootSecondary,
          }}
        >
					<CardHeader
            subheader={
              <Grid
                container
                component={Box}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs="auto">
                  <Box
                    component={Typography}
                    variant="h3"
                    marginBottom="0!important"
                  >
                    WOA/WOS
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
					<CardContent>
					<div className={classes.plLg4}>
					<Grid container>
                <Grid item xs={12} lg={6}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Registration #:</FormLabel>
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
                        type="text"
                        name="registration"
                        placeholder="Registration No"
                        value={woawos.registration}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>CNIC (Format: xxxxx-xxxxxxx-x)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(woawos.cnic)
                          ? "1rem!important"
                          : "5px"
                      }
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        // error={!cnicRegex.test(medicalEligibilityData.cnic)}
                        component={FilledInput}
                        autoComplete="off"
                        type="text"
                        name="cnic"
                        placeholder="xxxxx-xxxxxxx-x"
                        value={woawos.cnic}
                        endAdornment={
                          <InputAdornment position="end">
                            <CheckCircleIcon
                              classes={{ root: classes.iconCnic }}
                            />
                          </InputAdornment>
                        }
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                    {!cnicRegex.test(woawos.cnic) &&
                      woawos.cnic.length > 0 && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text"
                          color="error"
                        >
                          Please follow CNIC format!
                        </FormHelperText>
                      )}
                  </FormGroup>
                </Grid>
              </Grid>

							<Grid container
                alignItems="center"
                // justifyContent="space-between"
                justify="center">
                <Grid item xs={12} lg={2}>
                  <FormLabel>WOS</FormLabel>
                  <Checkbox
                    name="wos"
                    color="primary"
                    checked={woawos.wos}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>WOA</FormLabel>
                  <Checkbox
                    name="woa"
                    color="primary"
                    checked={woawos.woa}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
								<Grid item xs={12} lg={4}>
								<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Army No</FormLabel>
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
                        type="text"
                        name="armyNo"
                        placeholder="Army No"
                        value={woawos.armyNo}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
								<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Name</FormLabel>
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
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={woawos.name}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>










							<Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Father's Name</FormLabel>
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
                        type="text"
                        name="fatherName"
                        placeholder="Provide Father Name"
                        value={woawos.fatherName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Unit</FormLabel>
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
                        type="text"
                        name="unit"
                        placeholder="Provide Unit"
                        value={woawos.unit}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Corps</FormLabel>
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
                        type="text"
                        name="corps"
                        placeholder="Provide Corps"
                        value={woawos.corps}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Contact</FormLabel>
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
                        type="text"
                        name="contact"
                        placeholder="Provide Contact"
                        value={woawos.contact}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>



							<Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>DOD</FormLabel>
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
                        type="text"
                        name="dod"
                        placeholder="Provide DOD"
                        value={woawos.dod}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
							</Grid>





















							<Grid container justify="center" alignItems="center" style={{marginTop: '50px'}}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>

					</div>
					</CardContent>
				</Card>
			</Grid>
        </>
    )
}

export default WoaWos
