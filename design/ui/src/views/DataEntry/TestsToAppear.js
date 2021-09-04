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
  Button,
  IconButton,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import API from "../../utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function TestsToAppear() {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [testToAppear, setTestToAppear] = useState({
    registrationNo: "sp121212-12",
    personality: false,
    intelligence: false,
    writtenMatric: false,
    writtenUnderMatric: false,
    clerk: false,
    tech: false,
    dit: false,
    dlh: false,
    hafiz: false,
    pet: false,
  });
  const [chargesPaid, setChargesPaid] = useState(false);

  const handleCnicVerify = () => {
    API.getCandidateTestsToAppear(cnic)
      .then((res) => {
        setTestToAppear(res.data.testsToAppear);
        setChargesPaid(res.data.chargesPaid);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.error(err.message);
        alert("Some error in handleCnicVerify Promise test to appear data");
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", {testsToAppear: testToAppear, chargesPaid});
    API.updateCandidateTestsToAppear(cnic, {testsToAppear: testToAppear, chargesPaid})
      .then((res) => {
        console.log(res);
        alert(res.data ? "Updated Successfully" : "Nothing updated")
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.value);

    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
    } else {
      setTestToAppear({
        ...testToAppear,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.checked);

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
                  <FormGroup style={{ marginBottom: "1.5rem" }}>
                    <FormLabel>CNIC (Format: 1234512345671)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(cnic) ? "1rem!important" : "5px"
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
                        placeholder="Provide only numbers without dashes"
                        value={cnic}
                        endAdornment={
                          <InputAdornment position="end">
                            {isCnicVerified ? (
                              <IconButton disabled>
                                <CheckCircleIcon
                                  classes={{ root: classes.iconCnic }}
                                />
                              </IconButton>
                            ) : checkCnicFormat ? (
                              <IconButton
                                onClick={handleCnicVerify}
                                disabled={!checkCnicFormat}
                              >
                                <HelpOutlineIcon
                                  classes={{ root: classes.iconCnic }}
                                />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        }
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                    {!checkCnicFormat && cnic.length > 0 && (
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
                <Grid
                  item
                  xs={12}
                  lg={6}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Registration #:"
                    type="text"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={testToAppear.registrationNo}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
                <Grid container>
                  <Grid item xs={12} lg={6}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginLeft: "40px" }}
                    >
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Personality Test"
                          name="personality"
                          checked={testToAppear.personality}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Intelligence Test"
                          name="intelligence"
                          checked={testToAppear.intelligence}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Written (Matric)"
                          name="writtenMatric"
                          checked={testToAppear.writtenMatric}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Written (U/Matric)"
                          name="writtenUnderMatric"
                          checked={testToAppear.writtenUnderMatric}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Clk Test"
                          name="clerk"
                          checked={testToAppear.clerk}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginLeft: "40px" }}
                    >
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Tech Test"
                          name="tech"
                          checked={testToAppear.tech}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="DIT"
                          name="dit"
                          checked={testToAppear.dit}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Driving Aptitude Test"
                          name="dlh"
                          checked={testToAppear.dlh}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="Hafiz"
                          name="hafiz"
                          checked={testToAppear.hafiz}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxField
                          label="PET"
                          name="pet"
                          checked={testToAppear.pet}
                          onChange={handleCheckFieldsChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: "50px" }}
                >
                  <Grid item>
                    <CustomCheckboxField
                      label="Charges Paid"
                      name="chargesPaid"
                      checked={chargesPaid}
                      onChange={(e) => setChargesPaid(e.target.checked)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!chargesPaid}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default TestsToAppear;
