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

function Pet() {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [marksData, setMarksData] = useState({
    registrationNo: "",
    name: "",
    totalPetObtained: "",
    oneMile: "",
    pullUp: "",
    pushUp: "",
    crunches: "",
    ditch: "",
    todayFail: "",
    totalFail: "",
    todayPass: "",
    totalPass: "",
  });

  const handleCnicVerify = () => {
    API.getCandidateTestDetail(cnic, "pet")
      .then((res) => {
        console.log(res);
        setMarksData(res.data);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise pet test");
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", marksData);
    let data = marksData
    data.ditch = data.ditch === 'Clear' ? true : false
    API.updateCandidateTestMarks(cnic, data, "pet")
      .then((res) => {
        alert(res);
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
                    PET
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
                            ) : (
                              <span />
                            )}
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
                  <Grid item xs={12} lg={4}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <CustomTextField
                          label="1 Mile"
                          type="text"
                          name="oneMile"
                          placeholder="1 Mile"
                          value={marksData.oneMile}
                          onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Pull Up"
                          type="text"
                          name="pullUp"
                          placeholder="Pull Up"
                          value={marksData.pullUp}
                          onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Push Up"
                          type="text"
                          name="pushUp"
                          placeholder="Push Up"
                          value={marksData.pushUp}
                          onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                          label="Crunches"
                          type="text"
                          name="crunches"
                          placeholder="Crunches"
                          value={marksData.crunches}
                          onChange={handleFieldsChange}
                        />
                      </Grid>
                      <Grid item>
                        <CustomSelectField
                          label="Ditch"
                          type="text"
                          name="ditch"
                          placeholder="Clear/Unclear"
                          menuList={[
                            { id: 0, label: "Unclear" },
                            { id: 1, label: "Clear" },
                          ]}
                          value={marksData.ditch}
                          onChange={handleFieldsChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* </Grid> */}

                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Total PET Marks"
                      type="text"
                      name="totalPetObtained"
                      placeholder="Marks Obtained"
                      value={marksData.totalPetObtained}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
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

export default Pet;
