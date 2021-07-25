import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Card, CardHeader, Typography, CardContent, FormGroup, FormLabel, FormControl, FilledInput, InputAdornment, FormHelperText, Select, MenuItem, Checkbox, Button } from '@material-ui/core';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function PersonalInformation() {
  const classes = useStyles();
  const [personalInformation, setPersonalInformation] = useState({
		cnic: ""
	});

  const handleSubmit = () => {
    console.log("Handle Submit: ", personalInformation);
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setPersonalInformation({
      ...personalInformation,
      [e.target.name]: e.target.value,
    });
  };

	const handleCheckFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log(e.target.name);

    setPersonalInformation({
      ...personalInformation,
      [e.target.name]: e.target.checked,
    });
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
                    Personal Information
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
                        value={personalInformation.registration}
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
                        cnicRegex.test(personalInformation.cnic)
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
                        value={personalInformation.cnic}
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
                    {!cnicRegex.test(personalInformation.cnic) &&
                      personalInformation.cnic.length > 0 && (
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



							<Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>First Name</FormLabel>
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
                        name="firstName"
                        placeholder="Provide First Name"
                        value={personalInformation.firstName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Middle Name</FormLabel>
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
                        name="middleName"
                        placeholder="Provide Middle Name"
                        value={personalInformation.middleName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Last Name</FormLabel>
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
                        name="lastName"
                        placeholder="Provide Last Name"
                        value={personalInformation.lastName}
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
                        placeholder="Provide Father's Name"
                        value={personalInformation.fatherName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>District</FormLabel>
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
                        type="text"
                        name="district"
                        displayEmpty
                        placeholder="Select District"
                        value={personalInformation.district}
                        onChange={handleFieldsChange}
                      >
                        {["Multan", "ISB", "Lahore", "Karachi"].map(
                          (option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}
                      </Box>
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Date of Birth</FormLabel>
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
                        type="date"
                        name="dob"
                        value={personalInformation.dob}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>

							






							<Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Contact #:</FormLabel>
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
                        name="contactNo"
                        placeholder="Provide Father's Name"
                        value={personalInformation.contactNo}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Guardian's Contact #:</FormLabel>
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
                        name="guardianContactNo"
                        placeholder="Provide Father's Name"
                        value={personalInformation.guardianContactNo}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Online Regn #:</FormLabel>
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
                        name="onlineRegnNo"
                        placeholder="Provide Father's Name"
                        value={personalInformation.onlineRegnNo}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								</Grid>








								<Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Class</FormLabel>
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
                        type="text"
                        name="class"
                        displayEmpty
                        placeholder="Select Class"
                        value={personalInformation.class}
                        onChange={handleFieldsChange}
                      >
                        {["class1", "class2", "class3", "class4"].map(
                          (option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}
                      </Box>
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>SVAS/XMatch</FormLabel>
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
                        name="svasXmatch"
                        placeholder="Provide Father's Name"
                        value={personalInformation.svasXmatch}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
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
                    checked={personalInformation.wos}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>WOA</FormLabel>
                  <Checkbox
                    name="woa"
                    color="primary"
                    checked={personalInformation.woa}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>DLH</FormLabel>
                  <Checkbox
                    name="dlh"
                    color="primary"
                    checked={personalInformation.dlh}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
								<Grid item xs={12} lg={2}>
                  <FormLabel>DIT</FormLabel>
                  <Checkbox
                    name="dit"
                    color="primary"
                    checked={personalInformation.dit}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
								<Grid item xs={12} lg={2}>
                  <FormLabel>Hafiz</FormLabel>
                  <Checkbox
                    name="hafiz"
                    color="primary"
                    checked={personalInformation.hafiz}
                    onChange={handleCheckFieldsChange}
                  />
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
  );
}

export default PersonalInformation;
