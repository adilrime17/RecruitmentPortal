import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";
import API from "../../utils/api";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomSelectField from "components/CustomFields/CustomSelectField";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function TestMarks({ type, testName, testLabel }) {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [marksData, setMarksData] = useState({
    registrationNo: "123",
    name: "john",
    marksObtained: "40",
    todayFail: "2",
    totalFail: "100",
    todayPass: "5",
    totalPass: "100",
  });

  const handleCnicVerify = () => {
    API.getCandidateTestDetail(cnic, testName)
      .then((res) => {
        console.log(res);
        if (testName === 'hafiz') {
          res.data.marksObtained = res.data.marksObtained === 0 ? 'Fail' : 'Pass'
        }
        setMarksData(res.data);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.response.data.message);
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", marksData);
    API.updateCandidateTestMarks(cnic, {testResults: parseInt(marksData.marksObtained === 'Pass' ? '1' : marksData.marksObtained === 'Fail' ? '0': marksData.marksObtained)}, testName)
      .then((res) => {
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
      setMarksData({
        ...marksData,
        [e.target.name]: e.target.value,
      });
    }
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
                    {testLabel}
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
                        inputProps={{ maxLength: 13 }}
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
                            ) : <span />}
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
                  lg={4}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Registration #:"
                    type="text"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={marksData.registrationNo}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Name: "
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={marksData.name}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} lg={6}>
                    {type === "text" ? (
                      <CustomTextField
                        label="Result"
                        type="text"
                        name="marksObtained"
                        placeholder="Results"
                        value={marksData.marksObtained}
                        onChange={handleFieldsChange}
                      />
                    ) : (
                      <CustomSelectField
                        label="Hafiz Test"
                        type="text"
                        name="marksObtained"
                        placeholder="Results"
                        menuList={['Pass', 'Fail']}
                        value={marksData.marksObtained}
                        onChange={handleFieldsChange}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <CustomTextField
                          label="Today Fail"
                          type="text"
                          name="todayFail"
                          placeholder="Today Fail"
                          value={marksData.todayFail}
                          // onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Total Fail"
                          type="text"
                          name="totalFail"
                          placeholder="Total Fail"
                          value={marksData.totalFail}
                          // onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Today Pass"
                          type="text"
                          name="todayPass"
                          placeholder="Today Pass"
                          value={marksData.todayPass}
                          // onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Total Pass"
                          type="text"
                          name="totalPass"
                          placeholder="Total Pass"
                          value={marksData.totalPass}
                          // onChange={handleFieldsChange}
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
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default TestMarks;
