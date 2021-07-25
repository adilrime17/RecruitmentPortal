import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Card, CardHeader, Typography, CardContent, FormGroup, FormLabel, FormControl, FilledInput, InputAdornment, FormHelperText, Button } from '@material-ui/core';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;


function DrivingTest() {

	const classes = useStyles();
  const [marksData, setMarksData] = useState({
		cnic: ""
	});

	const handleSubmit = () => {
    console.log("Handle Submit: ", marksData);
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setMarksData({
      ...marksData,
      [e.target.name]: e.target.value,
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
                    Driving Test
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
					<CardContent>
					<div className={classes.plLg4}>
					<Grid container>
                <Grid item xs={12} lg={4}>
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
                        value={marksData.registration}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>CNIC (Format: xxxxx-xxxxxxx-x)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(marksData.cnic)
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
                        value={marksData.cnic}
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
                    {!cnicRegex.test(marksData.cnic) &&
                      marksData.cnic.length > 0 && (
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
                        value={marksData.name}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>

							<Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-start"
>
							<Grid item xs={12} lg={6}>
								<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Aptitude Test</FormLabel>
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
                        name="marks"
                        placeholder="Marks Obtained"
                        value={marksData.marks}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
								<Grid item xs={12} lg={6}>
								<Grid
									container
									direction="column"
									justifyContent="center"
									alignItems="flex-end"
								>
									<Grid item>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Today Fail</FormLabel>
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
                        name="todayFail"
                        placeholder="Today Fail"
                        value={marksData.todayFail}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
									</Grid>
									<Grid item>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Total Fail</FormLabel>
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
                        name="totalFail"
                        placeholder="Total Fail"
                        value={marksData.totalFail}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
									</Grid>
									<Grid item>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Today Pass</FormLabel>
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
                        name="todayPass"
                        placeholder="Today Pass"
                        value={marksData.todayPass}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
									</Grid>
									<Grid item>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Total Pass</FormLabel>
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
                        name="totalPass"
                        placeholder="Total Pass"
                        value={marksData.totalPass}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
									</Grid>
								</Grid>
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

export default DrivingTest
