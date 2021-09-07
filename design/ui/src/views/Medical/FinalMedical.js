import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import componentStyles from "assets/theme/views/admin/profile.js";
import { Button } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Chips from "../../components/Chips/Chip";
import { IconButton } from "@material-ui/core";
import API from "utils/api";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomSelectField from "components/CustomFields/CustomSelectField";


const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function Form() {
  const classes = useStyles();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [initialMedicalData, setInitialMedicalData] = useState({
    registrationNo: "123",
    name: "john",
    height: 20,
    chest: {
      chest0: 20,
      chest1: 40,
    },
    weight: 60,
    temperature: 20,
    pulseRate: "20/30",
    bloodPressure: {
      bp0: 20,
      bp1: 40,
    },
    medicalStatusUpdate: "Fit By RMO",
    remarks: "new remarks",
    commentsByRMO: "comments here",
    addedDeformityList: [
      {
        id: 1,
        label: "Lid Swelling",
      },
      {
        id: 2,
        label: "Bone Fracture",
      },
    ],
    someVisibleDeformity: false,
  });
  // const [medicallyFit, setMedicallyFit] = useState(false)

  const [addedDeformityList, setAddedDeformityList] = useState([{
    id: 0,
    label: "Cubitus valgus (carrying angle)",
  },{
    id: 0,
    label: "Genu valgus (knee knock)",
  },{
    id: 7,
    label:
      "Other foot deformities (Add remarks space for manual entry of specific problem)",
  }]);

  const handleCnicVerify = () => {
    API.getCandidateMedical(cnic)
      .then((res) => {
        console.log(res);
        setInitialMedicalData(res.data);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Personal Info");
      });
  };

  const handleSubmit = (medicallyFit) => {
    console.log("Handle Submit: ", initialMedicalData);
    let initialCopy = initialMedicalData
    initialCopy.temperature = parseFloat(initialCopy.temperature)
    API.updateCandidateMedical(cnic, {candidateMedicalData: initialCopy, medicallyFit: medicallyFit})
    .then(res => {
      alert(res.data ? "Updated Successfully" : "Nothing updated")
    }).catch(err => {
      alert(err)
    })
  };

  const handleAddDeformity = (item) => {
    console.log("Add Deformity: ", item);
    let addedDeformityListTemp = addedDeformityList;
    let index = addedDeformityListTemp.findIndex(
      (listItem) => listItem.label === item.label
    );
    if (index >= 0) {
      addedDeformityListTemp.splice(index, 1);
    } else {
      addedDeformityListTemp.push(item);
    }
    setAddedDeformityList(addedDeformityListTemp);
    setInitialMedicalData({
      ...initialMedicalData,
      addedDeformityList: addedDeformityListTemp,
    });
  };

  const handleFieldsChange = (e) => {
    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
    } else if (e.target.name === 'chest0' || e.target.name === 'chest1') {
      setInitialMedicalData({
        ...initialMedicalData,
        chest: {
          ...initialMedicalData.chest,
          [e.target.name]: e.target.value
        }
      });
    } else if (e.target.name === 'bp0' || e.target.name === 'bp1') {
      setInitialMedicalData({
        ...initialMedicalData,
        bloodPressure: {
          ...initialMedicalData.bloodPressure,
          [e.target.name]: e.target.value
        }
      });
    } else {
      setInitialMedicalData({
        ...initialMedicalData,
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
                    Final Medical
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
                    value={initialMedicalData.registrationNo}
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
                    value={initialMedicalData.name}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <CustomTextField
                    label="Height (Inches)"
                    type="number"
                    name="height"
                    placeholder="Height in Inches"
                    value={initialMedicalData.height}
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
                        value={initialMedicalData.chest.chest0}
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
                        value={initialMedicalData.chest.chest1}
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
                    value={initialMedicalData.weight}
                    onChange={handleFieldsChange}
                  />
                </Grid>
              </Grid>


              <Grid container>
                <Grid item xs={12} lg={4}>
                  <CustomTextField
                    label="Temperature"
                    type="text"
                    name="temperature"
                    placeholder="Body Temperature"
                    value={initialMedicalData.temperature}
                    onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <CustomTextField
                    label="Pulse Rate"
                    type="text"
                    name="pulseRate"
                    placeholder="Pulse Rate"
                    value={initialMedicalData.pulseRate}
                    onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>BP: </FormLabel>
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
                        name="bp0"
                        placeholder=""
                        value={initialMedicalData.bloodPressure.bp0}
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
                        name="bp1"
                        placeholder=""
                        value={initialMedicalData.bloodPressure.bp1}
                        onChange={handleFieldsChange}
                        style={{ width: "50%" }}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                
              </Grid>

              <Grid container>
                <Grid item xs={12} lg={4}>
                <CustomSelectField
                          label="Status Update"
                          type="text"
                          name="status"
                          placeholder="Status Update"
                          menuList={[
                            {id: 0, label: "FIT by RMO"},
                            {id: 1, label: "UNFIT By RMO (Reason fetched from template)"},
                            {id: 2, label: "TUF (Reason)"},
                            {id: 3, label: "Referred to Specialist (Incl type of specialist from referrals)"},
                            {id: 4, label: "UNFIT by ______ Specialist in __________."},
                          ]}
                          value={initialMedicalData.status}
                          onChange={handleFieldsChange}
                        />
                </Grid>

                <Grid item xs={12} lg={8}>
                <CustomTextField
                      label="Remarks"
                      type="text"
                      name="remarks"
                      placeholder="Remarks"
                      value={initialMedicalData.remarks}
                      onChange={handleFieldsChange}
                    />
                </Grid>
              </Grid>

              <Grid
                container
                justify="flex-start"
                alignItems="center"
                style={{ marginBottom: "50px" }}
              >

                <Grid item xs={12} lg={6}>
                <CustomTextField
                      label="Comments by RMO"
                      type="text"
                      name="commentsByRMO"
                      placeholder="Comments by RMO"
                      value={initialMedicalData.commentsByRMO}
                      onChange={handleFieldsChange}
                    />
                </Grid>
                {addedDeformityList.length > 0 && (
                  <Grid item xs={6}>
                  <Chips
                    addedDeformityList={addedDeformityList}
                    handleAddDeformity={handleAddDeformity}
                  />
                </Grid>
                )}
              </Grid>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(true)}
                  >
                    Medically Fit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(false)}
                  >
                    Medically Unfit
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

export default Form;
