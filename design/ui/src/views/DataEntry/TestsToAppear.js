import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";
import {
  Box,
  Grid,
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
  Checkbox,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function TestsToAppear() {
  const classes = useStyles();
  const [testToAppear, setTestToAppear] = useState({
    cnic: "",
  });

  const handleSubmit = () => {
    console.log("Handle Submit: ", testToAppear);
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setTestToAppear({
      ...testToAppear,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log(e.target.name);

    setTestToAppear({
      ...testToAppear,
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
                    Tests to Appear
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
                        value={testToAppear.registration}
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
                        cnicRegex.test(testToAppear.cnic)
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
                        value={testToAppear.cnic}
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
                    {!cnicRegex.test(testToAppear.cnic) &&
                      testToAppear.cnic.length > 0 && (
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

              <Grid
                container
                direction="column"
                style={{ marginLeft: "40px" }}
                // alignItems="center"
                // justifyContent="space-between"
                // justify="center"
              >
                <Grid item xs={12} lg={2}>
                  <FormLabel>Personality Test</FormLabel>
                  <Checkbox
                    name="personalityTest"
                    color="primary"
                    checked={testToAppear.personalityTest}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Intelligence Test</FormLabel>
                  <Checkbox
                    name="intelligenceTest"
                    color="primary"
                    checked={testToAppear.intelligenceTest}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Written (Matric)</FormLabel>
                  <Checkbox
                    name="writtenMatric"
                    color="primary"
                    checked={testToAppear.writtenMatric}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Written (U/Matric)</FormLabel>
                  <Checkbox
                    name="writtenUnderMatric"
                    color="primary"
                    checked={testToAppear.writtenUnderMatric}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Clk Test</FormLabel>
                  <Checkbox
                    name="clk"
                    color="primary"
                    checked={testToAppear.clk}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Tech Test</FormLabel>
                  <Checkbox
                    name="tech"
                    color="primary"
                    checked={testToAppear.tech}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>DIT</FormLabel>
                  <Checkbox
                    name="dit"
                    color="primary"
                    checked={testToAppear.dit}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Driving Aptitude Test</FormLabel>
                  <Checkbox
                    name="driving"
                    color="primary"
                    checked={testToAppear.driving}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>Hafiz</FormLabel>
                  <Checkbox
                    name="hafiz"
                    color="primary"
                    checked={testToAppear.hafiz}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <FormLabel>PET</FormLabel>
                  <Checkbox
                    name="pet"
                    color="primary"
                    checked={testToAppear.pet}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginTop: "50px" }}
              >
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

export default TestsToAppear;
