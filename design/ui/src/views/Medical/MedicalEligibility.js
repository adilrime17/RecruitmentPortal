import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { useTheme } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/profile.js";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FilledInput,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  FormHelperText,
} from "@material-ui/core";
import API from "../../utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";
import CustomSelectField from "components/CustomFields/CustomSelectField";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function Form() {
  const classes = useStyles();
  const history = useHistory();
  // const theme = useTheme();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [candidateData, setCandidateData] = useState({
    svasXmatch: false,
    ncse: false,
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    district: "",
    locationClass: "",
    dateOfBirth: "",
    maxQualification: "",
    woa: false,
    wos: false,
    dlh: false,
    height: null,
    chest: {
      chest0: null,
      chest1: null,
    },
    weight: null
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
          svasXmatch: false,
          ncse: false,
          firstName: "",
          middleName: "",
          lastName: "",
          fatherName: "",
          district: "",
          locationClass: "",
          dateOfBirth: "",
          maxQualification: "",
          woa: false,
          wos: false,
          dlh: false,
          height: null,
          chest: {
            chest0: null,
            chest1: null,
          },
          weight: null
        })
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Medical Eligibility")
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", candidateData);
    API.checkCandidateEligibility({...candidateData, cnic})
    .then(res => {
      setDialogMessage(res.data.candidateEligible ? "Eligible": "Not Eligible");
      setOpenConfirmationDialog(true);
    }).catch(err => {
      alert(err)
    })
  };

  const handleFieldsChange = (e) => {
    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
    } else if (e.target.name === 'chest0' || e.target.name === 'chest1') {
      setCandidateData({
        ...candidateData,
        chest: {
          ...candidateData.chest,
          [e.target.name]: parseInt(e.target.value)
        }
      });
    } else if (e.target.name === 'height' || e.target.name === 'weight') {
      setCandidateData({
        ...candidateData,
        [e.target.name]: parseInt(e.target.value)

      });
    } else {
      setCandidateData({
        ...candidateData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.checked);

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

  const handleDialogClose = () => {
    if (dialogMessage === 'Eligible') {
      setOpenConfirmationDialog(false);
      history.push('/admin/personal-information')
    } else {
      setOpenConfirmationDialog(false);
    }
  }

  return (
    <>
      <Grid
        item
        xs={12}
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
                    Eligibility Check
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
          <CardContent>
            <div className={classes.plLg4}>
              <Grid container justify="space-between">
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
                  lg={4}
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
                  <Grid item xs={12} lg={3}>
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
                  <Grid item xs={12} lg={1} style={{ paddingTop: "20px" }}>
                    <CustomCheckboxField
                      label="DLH"
                      name="dlh"
                      checked={candidateData.dlh}
                      onChange={handleCheckFieldsChange}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Height (Inches)"
                      type="number"
                      name="height"
                      placeholder="Height in Inches"
                      value={candidateData.height}
                      onChange={handleFieldsChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <FormGroup style={{ marginBottom: "0.5rem" }}>
                      <FormLabel>Chest (Inches): </FormLabel>
                      <FormControl
                        variant="filled"
                        component={Box}
                        width="100%"
                        marginBottom="1rem!important"
                        style={{ flexDirection: "row" }}
                      >
                        <Box
                          paddingLeft="0.75rem"
                          paddingRight="0.75rem"
                          component={FilledInput}
                          autoComplete="off"
                          type="number"
                          name="chest0"
                          placeholder=""
                          value={candidateData.chest.chest0}
                          onChange={handleFieldsChange}
                          style={{ width: "50%" }}
                        />
                        <Box
                          paddingLeft="0.75rem"
                          paddingRight="0.75rem"
                          marginTop="0.75rem"
                        >
                          {" / "}
                        </Box>
                        <Box
                          paddingLeft="0.75rem"
                          paddingRight="0.75rem"
                          component={FilledInput}
                          autoComplete="off"
                          type="number"
                          name="chest1"
                          placeholder=""
                          value={candidateData.chest.chest1}
                          onChange={handleFieldsChange}
                          style={{ width: "50%" }}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <CustomTextField
                      label="Weight (Kg)"
                      type="number"
                      name="weight"
                      placeholder="Weight in Kg"
                      value={candidateData.weight}
                      onChange={handleFieldsChange}
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
        <ConfirmationDialog
          open={openConfirmationDialog}
          handleClose={handleDialogClose}
          message={dialogMessage}
        />
      </Grid>
    </>
  );
}

export default Form;
