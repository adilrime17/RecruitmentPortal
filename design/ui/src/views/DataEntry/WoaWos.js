import React, { useState } from "react";
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
  IconButton,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import API from "../../utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function WoaWos() {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [candidateWoaWosData, setCandidateWoaWosDataData] = useState({
    registrationNo: "",
    woa: false,
    wos: false,
    armyNo: "",
    name: "",
    fatherName: "",
    unit: "",
    corps: "",
    contact: "",
    dod: "",
  });

  const handleCnicVerify = () => {
    API.getCandidateWoaWosData(cnic)
      .then((res) => {
        setCandidateWoaWosDataData(res.data);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise WoaWos data");
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", candidateWoaWosData);
    API.updateCandidateWoaWosData(cnic, candidateWoaWosData)
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
      setCandidateWoaWosDataData({
        ...candidateWoaWosData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.checked);

    if (e.target.name === "woa" && e.target.checked === true) {
      setCandidateWoaWosDataData({
        ...candidateWoaWosData,
        woa: true,
        wos: false,
      });
    } else if (e.target.name === "wos" && e.target.checked === true) {
      setCandidateWoaWosDataData({
        ...candidateWoaWosData,
        wos: true,
        woa: false,
      });
    } else {
      setCandidateWoaWosDataData({
        ...candidateWoaWosData,
        [e.target.name]: e.target.checked,
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
                  lg={4}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Registration #:"
                    type="text"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={candidateWoaWosData.registrationNo}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <FormLabel style={{ display: "block" }}>
                    Additional Info
                  </FormLabel>
                  <CustomCheckboxField
                    label="WOA"
                    name="woa"
                    checked={candidateWoaWosData.woa}
                    onChange={handleCheckFieldsChange}
                  />
                  <CustomCheckboxField
                    label="WOS"
                    name="wos"
                    checked={candidateWoaWosData.wos}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Army No"
                      type="text"
                      name="armyNo"
                      placeholder="Provide Army No"
                      value={candidateWoaWosData.armyNo}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Name"
                      type="text"
                      name="name"
                      placeholder="Provide Name"
                      value={candidateWoaWosData.name}
                      onChange={handleFieldsChange}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Father's Name"
                      type="text"
                      name="fatherName"
                      placeholder="Provide Father's Name"
                      value={candidateWoaWosData.fatherName}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} lg={2}>
                    <CustomTextField
                      label="Unit"
                      type="text"
                      name="unit"
                      placeholder="Provide Unit"
                      value={candidateWoaWosData.unit}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <CustomTextField
                      label="Corps"
                      type="text"
                      name="corps"
                      placeholder="Provide Corps"
                      value={candidateWoaWosData.corps}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Contact"
                      type="text"
                      name="contact"
                      placeholder="Provide Contact"
                      value={candidateWoaWosData.contact}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="DOD"
                      type="date"
                      name="dod"
                      placeholder="Provide DOD"
                      value={candidateWoaWosData.dod ? candidateWoaWosData.dod.split("T")[0] : ""}
                      onChange={handleFieldsChange}
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
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default WoaWos;
