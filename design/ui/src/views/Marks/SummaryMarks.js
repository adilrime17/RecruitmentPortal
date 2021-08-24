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

function SummaryMarks() {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [summaryMarks, setSummaryMarks] = useState({
    registrationNo: "123",
    name: "john",
    district: "Rawalpindi",
    personality: "Unsuitable",
    initial: "20",
    written: "30",
    dlh: "Fail",
    dit: "Fail",
    pet: "Fail",
    sponser: "Name here",
    woswoa: "Verified",
    clerk: "20",
    tech: "30",
    hafiz: "Fail",
    medicalStatus: "FIT",
  });

  const handleCnicVerify = () => {
    API.getCandidateMarksSummary(cnic)
      .then((res) => {
        console.log(res);
        setSummaryMarks(res.candidateMarksSummary);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise summary marks test");
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", summaryMarks);
    API.updateCandidateMarksSummary(cnic, summaryMarks)
      .then((res) => {
        alert(res.updated);
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
      setSummaryMarks({
        ...summaryMarks,
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
                    Summary Marks
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
                    value={summaryMarks.registrationNo}
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
                    value={summaryMarks.name}
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
                        label="District"
                        type="text"
                        name="district"
                        placeholder="District"
                        value={summaryMarks.district}
                        // onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomSelectField
                        label="Personality"
                        type="text"
                        name="personality"
                        placeholder="Suitable/Unsuitable"
                        menuList={[
                          { id: 0, label: "Suitable" },
                          { id: 1, label: "Unsuitable" },
                        ]}
                        value={summaryMarks.personality}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomTextField
                        label="Initial Test"
                        type="text"
                        name="initial"
                        placeholder="Initial Test"
                        value={summaryMarks.initial}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomTextField
                        label="Written Test"
                        type="text"
                        name="written"
                        placeholder="Written Test"
                        value={summaryMarks.written}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Grid> */}

                <Grid item xs={12} lg={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <CustomSelectField
                        label="DLH"
                        type="text"
                        name="dlh"
                        placeholder="Pass/Fail"
                        menuList={[
                          { id: 0, label: "Pass" },
                          { id: 1, label: "Fail" },
                        ]}
                        value={summaryMarks.dlh}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomSelectField
                        label="DIT"
                        type="text"
                        name="dit"
                        placeholder="Pass/Fail"
                        menuList={[
                          { id: 0, label: "Pass" },
                          { id: 1, label: "Fail" },
                        ]}
                        value={summaryMarks.dit}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomSelectField
                        label="PET"
                        type="text"
                        name="pet"
                        placeholder="Pass/Fail"
                        menuList={[
                          { id: 0, label: "Pass" },
                          { id: 1, label: "Fail" },
                        ]}
                        value={summaryMarks.pet}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomTextField
                        label="Sponser"
                        type="text"
                        name="sponser"
                        placeholder="Sponser"
                        value={summaryMarks.sponser}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Grid item>
                      <CustomSelectField
                        label="WOS/WOA"
                        type="text"
                        name="woswoa"
                        placeholder="Pass/Fail"
                        menuList={[
                          { id: 0, label: "Verified" },
                          { id: 1, label: "Not Verified" },
                        ]}
                        value={summaryMarks.woswoa}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomTextField
                        label="Clerk Test"
                        type="text"
                        name="clerk"
                        placeholder="Clerk"
                        value={summaryMarks.clerk}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomTextField
                        label="Tech Test"
                        type="text"
                        name="tech"
                        placeholder="Tech"
                        value={summaryMarks.tech}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomSelectField
                        label="Hafiz"
                        type="text"
                        name="hafiz"
                        placeholder="Pass/Fail"
                        menuList={[
                          { id: 0, label: "Pass" },
                          { id: 1, label: "Fail" },
                        ]}
                        value={summaryMarks.hafiz}
                        onChange={handleFieldsChange}
                      />
                    </Grid>
                    <Grid item>
                      <CustomSelectField
                        label="Med Status"
                        type="text"
                        name="medicalStatus"
                        placeholder="Med Status"
                        menuList={[
                          { id: 0, label: "MUF" },
                          { id: 1, label: "FIT" },
                          { id: 2, label: "Ref" },
                        ]}
                        value={summaryMarks.medicalStatus}
                        onChange={handleFieldsChange}
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

export default SummaryMarks;
