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
  IconButton
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import componentStyles from "assets/theme/views/admin/profile.js";
// import { useHistory } from 'react-router-dom';
import API from "../../utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";
import CustomSelectField from "components/CustomFields/CustomSelectField";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function PersonalInformation() {
  const classes = useStyles();
  // const history = useHistory();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [candidateData, setCandidateData] = useState({
    registrationNo: "",
    svasXmatch: false,
    ncse: false,
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    district: "",
    locationClass: "",
    dateOfBirth: "",
    contactNo: "",
    guardianContactNo: "",
    maxQualification: "",
    woa: false,
    wos: false,
    dlh: false,
    dit: false,
    hafiz: false
  });
  const [districtList, setDistrictList] = useState([]);
  const [locationClasses, setLocationClasses] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const handleCnicVerify = () => {
    Promise.all([
      API.getAllDistricts(),
      API.getAllLocationClasses(),
      API.getAllQualifications(),
      API.getCandidateDetails(cnic)
    ])
      .then((res) => {
        console.log(res);
        setDistrictList(res[0].data);
        setLocationClasses(res[1].data);
        setQualifications(res[2].data);
        setCandidateData(res[3].data ? res[3].data : {
          registrationNo: "",
          svasXmatch: false,
          ncse: false,
          firstName: "",
          middleName: "",
          lastName: "",
          fatherName: "",
          district: "",
          locationClass: "",
          dateOfBirth: "",
          contactNo: "",
          guardianContactNo: "",
          maxQualification: "",
          woa: false,
          wos: false,
          dlh: false,
          dit: false,
          hafiz: false
        })
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Personal Info")
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", candidateData);
    API.updateCandidateData(cnic, {...candidateData, cnic})
    .then(res => {
      alert(res)
    }).catch(err => {
      alert(err)
    })
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.name + ' = ' + e.target.value);

    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
    } else {
      setCandidateData({
        ...candidateData,
        [e.target.name]: e.target.value,
      });
    }

    
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.name + ' = ' + e.target.checked);

    if(e.target.name === 'woa' && e.target.checked === true) {
      setCandidateData({
        ...candidateData,
        woa: true,
        wos: false
      });
    } else if(e.target.name === 'wos' && e.target.checked === true) {
      setCandidateData({
        ...candidateData,
        wos: true,
        woa: false
      });
    } else {
      setCandidateData({
        ...candidateData,
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
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "1.5rem" }}>
                    <FormLabel>CNIC (Format: 1234512345671)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(cnic)
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
                  lg={4}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                      label="Registration #:"
                      type="text"
                      name="registrationNo"
                      placeholder="Registration No"
                      value={candidateData.registrationNo}
                      // onChange={handleFieldsChange}
                    />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={2}
                  style={
                    isCnicVerified ? { direction: "rtl", paddingTop: '20px' } : { display: "none" }
                  }
                >
                  <CustomCheckboxField
                    label="SVAS/XMatch"
                    name="svasXmatch"
                    checked={candidateData.svasXmatch}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={2}
                  style={
                    isCnicVerified ? { direction: "rtl", paddingTop: '20px' } : { display: "none" }
                  }
                >
                  <CustomCheckboxField
                    label="Applying as NCsE"
                    name="ncse"
                    checked={candidateData.ncse}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="First Name"
                      type="text"
                      name="firstName"
                      placeholder="Provide First Name"
                      value={candidateData.firstName}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Middle Name"
                      type="text"
                      name="middleName"
                      placeholder="Provide Middle Name"
                      value={candidateData.middleName}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Provide Last Name"
                      value={candidateData.lastName}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Father's Name"
                      type="text"
                      name="fatherName"
                      placeholder="Provide Father's Name"
                      value={candidateData.fatherName}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomSelectField
                      label="District"
                      type="text"
                      name="district"
                      placeholder="Select District"
                      menuList={districtList}
                      value={candidateData.district}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomSelectField
                      label="Class"
                      type="text"
                      name="locationClass"
                      placeholder="Select Class"
                      menuList={locationClasses}
                      value={candidateData.locationClass}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Date of Birth"
                      type="date"
                      name="dateOfBirth"
                      placeholder="Provide Date of Birth"
                      value={candidateData.dateOfBirth}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Contact #:"
                      type="text"
                      name="contactNo"
                      placeholder="Provide Contact No"
                      value={candidateData.contactNo}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Guardian's Contact #:"
                      type="text"
                      name="guardianContactNo"
                      placeholder="Provide Guardian's Contact No"
                      value={candidateData.guardianContactNo}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomSelectField
                      label="Max Qualification"
                      type="text"
                      name="maxQualification"
                      placeholder="Select Max Qualification"
                      menuList={qualifications}
                      value={candidateData.maxQualification}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <FormLabel style={{display: 'block'}}>Additional Info</FormLabel>
                    <CustomCheckboxField
                      label="WOA"
                      name="woa"
                      checked={candidateData.woa}
                      onChange={handleCheckFieldsChange}
                    />
                    <CustomCheckboxField
                      label="WOS"
                      name="wos"
                      checked={candidateData.wos}
                      onChange={handleCheckFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} style={{ paddingTop: "23px" }}>
                    <CustomCheckboxField
                      label="DLH"
                      name="dlh"
                      checked={candidateData.dlh}
                      onChange={handleCheckFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} style={{ paddingTop: "23px" }}>
                    <CustomCheckboxField
                      label="DIT"
                      name="dit"
                      checked={candidateData.dit}
                      onChange={handleCheckFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} style={{ paddingTop: "23px" }}>
                    <CustomCheckboxField
                      label="Hafiz"
                      name="hafiz"
                      checked={candidateData.hafiz}
                      onChange={handleCheckFieldsChange}
                    />
                  </Grid>
                </Grid>
                

                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: "40px" }}
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

export default PersonalInformation;
