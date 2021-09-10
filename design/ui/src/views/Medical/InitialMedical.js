import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Popover from "@material-ui/core/Popover";
// import Container from "@material-ui/core/Container";
// import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import componentStyles from "assets/theme/views/admin/profile.js";
import { Button, IconButton } from "@material-ui/core";
// import boxShadows from "assets/theme/box-shadow.js";
// import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DeformityListOne from "../../components/List/DeformityListOne";
import Chips from "../../components/Chips/Chip";
import API from "utils/api";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomSelectField from "components/CustomFields/CustomSelectField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";

const medicalDeformityList = [
  {
    id: 0,
    label: "Surgical",
    values: [
      {
        id: 0,
        label: "Elbow Deformities",
        values: [
          {
            id: 0,
            label: "Cubitus valgus (carrying angle)",
          },
          {
            id: 1,
            label: "Cubitus varum",
          },
          {
            id: 2,
            label:
              "Other elbow deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 1,
        label: "Chest Deformities",
        values: [
          {
            id: 0,
            label: "Pectus carinatum",
          },
          {
            id: 1,
            label: "Pectus excavatum",
          },
          {
            id: 2,
            label:
              "Other chest deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 2,
        label: "Knee Deformities ",
        values: [
          {
            id: 0,
            label: "Genu valgus (knee knock)",
          },
          {
            id: 1,
            label: "Genu varum ",
          },
        ],
      },
      {
        id: 3,
        label: "Foot Deformities",
        values: [
          {
            id: 0,
            label: "Hallux valgus",
          },
          {
            id: 1,
            label: "Hallux varum",
          },
          {
            id: 2,
            label: "Pes planus (flat foot)",
          },
          {
            id: 3,
            label: "Pes cavum (high arched foot)",
          },
          {
            id: 4,
            label: "Mobile Pes planum",
          },
          {
            id: 5,
            label: "Over riding toes",
          },
          {
            id: 6,
            label: "Hammer toes",
          },
          {
            id: 7,
            label:
              "Other foot deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 4,
        label: "Spinal Deformities",
        values: [
          {
            id: 0,
            label: "Kyphosis",
          },
          {
            id: 1,
            label: "Scoliosis",
          },
          {
            id: 2,
            label: "Spina bifida",
          },
          {
            id: 3,
            label: "Winging of Scapula",
          },
          {
            id: 4,
            label:
              "Other spinal deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 5,
        label: "External Genitalia ",
        values: [
          {
            id: 0,
            label: "Inguinal hernia",
          },
          {
            id: 1,
            label: "Paraumbilical hernia",
          },
          {
            id: 2,
            label:
              "Other hernias (Add remarks space for manual entry of specific problem)",
          },
          {
            id: 3,
            label: "Epispadias",
          },
          {
            id: 4,
            label: "Hypospadias",
          },
          {
            id: 5,
            label: "Hydrocoele ",
          },
          {
            id: 6,
            label: "Varicocoele",
          },
          {
            id: 7,
            label: "Undescended testis",
          },
          {
            id: 8,
            label: "Atrophic testis",
          },
          {
            id: 9,
            label: "Scrotal swelling",
          },
          {
            id: 10,
            label: "External hemorrhoids",
          },
          {
            id: 11,
            label: "Internal hemarrhoids ",
          },
          {
            id: 12,
            label: "Anal fissure",
          },
          {
            id: 13,
            label:
              "Other genital diseases (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 6,
        label: "Scar Marks",
        values: [
          {
            id: 0,
            label: "Appendectomy ",
          },
          {
            id: 1,
            label: "Right Hand",
          },
          {
            id: 2,
            label: "Left Hand",
          },
          {
            id: 3,
            label: "Right Forearm",
          },
          {
            id: 4,
            label: "Left Forearm",
          },
          {
            id: 5,
            label: "Right Arm",
          },
          {
            id: 6,
            label: "Left Arm",
          },
          {
            id: 7,
            label: "Right Shoulder",
          },
          {
            id: 8,
            label: "Left Shoulder ",
          },
          {
            id: 9,
            label: "Chest",
          },
          {
            id: 10,
            label: "Back",
          },
          {
            id: 11,
            label: "Abdomen",
          },
          {
            id: 12,
            label: "Scalp",
          },
          {
            id: 13,
            label: "Face",
          },
          {
            id: 14,
            label: "Neck",
          },
          {
            id: 15,
            label: "Right Hip",
          },
          {
            id: 16,
            label: "Left Hip",
          },
          {
            id: 17,
            label: "Right Thigh",
          },
          {
            id: 18,
            label: "Left Thigh",
          },
          {
            id: 19,
            label: "Right Leg",
          },
          {
            id: 20,
            label: "Left Leg",
          },
          {
            id: 21,
            label: "Right Foot",
          },
          {
            id: 22,
            label: "Left Foot",
          },
          {
            id: 23,
            label:
              "Other scar marks (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 7,
        label:
          "Other Surgical Defects (Add remarks space for manual entry of specific problem)",
        values: [
          {
            id: 0,
            label:
              "Other scar marks (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    label: "ENT",
    values: [
      {
        id: 0,
        label: "Nasal Deformities",
        values: [
          {
            id: 0,
            label: "DNS",
          },
          {
            id: 1,
            label: "Enlarged turbinates",
          },
          {
            id: 2,
            label: "Nasal polyp / polypi ",
          },
          {
            id: 3,
            label: "Atrophic rhinitis",
          },
          {
            id: 4,
            label:
              "Other nasal deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 1,
        label: "Ear Deformities",
        values: [
          {
            id: 0,
            label:
              "External ear defects (Add remarks space for manual entry of specific problem)",
          },
          {
            id: 1,
            label: "Otitis externa",
          },
          {
            id: 2,
            label: "Otitis media",
          },
          {
            id: 3,
            label: "Aural discharge",
          },
          {
            id: 4,
            label: "Wax",
          },
          {
            id: 5,
            label: "Perforated tampanic membrane",
          },
          {
            id: 6,
            label: "Wax + TM Exam",
          },
          {
            id: 7,
            label:
              "Other ear defects (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 2,
        label: "Throat Deformities",
        values: [
          {
            id: 0,
            label: "Tonsillitis",
          },
          {
            id: 1,
            label: "Deformed uvula",
          },
          {
            id: 2,
            label:
              "Other throat deformities (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 3,
        label:
          "Other ENT Defects (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 2,
    label: "Eye",
    values: [
      {
        id: 0,
        label: "Squint",
      },
      {
        id: 1,
        label: "Trachoma",
      },
      {
        id: 2,
        label: "Ptosis",
      },
      {
        id: 3,
        label: "Conjunctivitis",
      },
      {
        id: 4,
        label: "Lid swelling",
      },
      {
        id: 5,
        label: "Dirty sclera",
      },
      {
        id: 6,
        label:
          "Other eye defects (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 3,
    label: "Skin",
    values: [
      {
        id: 0,
        label:
          "Hyper-pigmentation (Add remarks space for manual entry of specific problem)",
      },
      {
        id: 1,
        label:
          "Hypo-pigmentation (Add remarks space for manual entry of specific problem)",
      },
      {
        id: 2,
        label: "Hyperhydrosis",
      },
      {
        id: 3,
        label:
          "Skin lesions (Add remarks space for manual entry of specific problem)",
      },
      {
        id: 4,
        label:
          "Other skin deformities (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 4,
    label: "Thyroid",
    values: [
      {
        id: 0,
        label: "Goitre",
      },
      {
        id: 1,
        label:
          "Other thyroid defects (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 5,
    label: "Lymph nodes",
    values: [
      {
        id: 0,
        label:
          "Swellings (Add remarks space for manual entry of specific problem)",
      },
      {
        id: 1,
        label:
          "Lymphadenitis (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 6,
    label: "Nail Deformities",
    values: [
      {
        id: 0,
        label: "Koilonychia",
      },
      {
        id: 1,
        label: "Splinter hemorrhages",
      },
      {
        id: 2,
        label:
          "Other nail deformities (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 7,
    label: "Medical",
    values: [
      {
        id: 0,
        label: "Speech",
        values: [
          {
            id: 0,
            label: "Stammer",
          },
          {
            id: 1,
            label: "Stutter",
          },
          {
            id: 2,
            label: "Slurring",
          },
          {
            id: 3,
            label: "Monotonous",
          },
          {
            id: 4,
            label:
              "Other speech defects (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 1,
        label: "General",
        values: [
          {
            id: 0,
            label: "Anemia",
          },
          {
            id: 1,
            label: "Jaundice",
          },
          {
            id: 2,
            label:
              "Cyanosis (Add remarks space for manual entry of specific problem)",
          },
          {
            id: 3,
            label:
              "Edema (Add remarks space for manual entry of specific problem)",
          },
          {
            id: 4,
            label:
              "Clubbing (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 2,
        label: "Cardiac",
        values: [
          {
            id: 0,
            label: "Tachycardia",
          },
          {
            id: 1,
            label: "Bradycardia",
          },
          {
            id: 2,
            label: "Heart murmur",
          },
          {
            id: 3,
            label: "Hypertension",
          },
          {
            id: 4,
            label: "Arrythmia",
          },
          {
            id: 5,
            label:
              "Other cardiac defects (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 3,
        label: "Respiratory",
        values: [
          {
            id: 0,
            label: "Asthma",
          },
          {
            id: 1,
            label: "Bronchitis",
          },
          {
            id: 2,
            label: "History of TB",
          },
          {
            id: 3,
            label:
              "Other pulmonary diseases (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 4,
        label: "Abdominal ",
        values: [
          {
            id: 0,
            label:
              "Defects (Add remarks space for manual entry of specific problem)",
          },
        ],
      },
      {
        id: 5,
        label:
          "Other Medical Defects (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
  {
    id: 8,
    label: "Dental",
    values: [
      {
        id: 0,
        label: "Dental hygiene ",
      },
      {
        id: 1,
        label: "Caries",
      },
      {
        id: 2,
        label: "Pyorrhea",
      },
      {
        id: 3,
        label: "Scurvy",
      },
      {
        id: 4,
        label:
          "Other dental defects (Add remarks space for manual entry of specific problem)",
      },
    ],
  },
];

const useStyles = makeStyles(componentStyles);
const useStylesPopover = makeStyles(() => ({
  root: {
    "& .MuiPopover-paper": {
      padding: "0px",
    },
  },
}));

const cnicRegex = /^(\d{13})$/gm;

function Form() {
  const classes = useStyles();
  const classesPopover = useStylesPopover();
  // const theme = useTheme();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [initialMedicalData, setInitialMedicalData] = useState({
    registrationNo: "",
    name: "",
    height: 0,
    chest: {
      chest0: 0,
      chest1: 0,
    },
    weight: 0,
    temperature: 0,
    pulseRate: "0/0",
    bloodPressure: {
      bp0: 0,
      bp1: 0,
    },
    medicalStatusUpdate: "",
    remarks: "",
    commentsByRMO: "",
    addedDeformityList: [],
    someVisibleDeformity: false,
  });
  const [addedDeformityList, setAddedDeformityList] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleCnicVerify = () => {
    API.getCandidateMedical(cnic)
      .then((res) => {
        console.log(res);
        setInitialMedicalData(res.data);
        setIsCnicVerified(true);
        setAddedDeformityList(res.data.addedDeformityList ? res.data.addedDeformityList : [])
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Personal Info");
      });
  };

  const handleSubmit = () => {
    console.log("Handle Submit: ", initialMedicalData);
    let initialCopy = initialMedicalData
    initialCopy.temperature = parseFloat(initialCopy.temperature)
    initialCopy.pulseRate = parseFloat(initialCopy.pulseRate)
    initialCopy.bloodPressure.bp0 = parseInt(initialCopy.bloodPressure.bp0)
    initialCopy.bloodPressure.bp1 = parseInt(initialCopy.bloodPressure.bp1)
    initialCopy.addedDeformityList = initialCopy.addedDeformityList ? initialCopy.addedDeformityList.map(x => {
      x.id = "" + x.id;
      return x;
    }) : []
    API.updateCandidateMedical(cnic, {candidateMedicalData: initialCopy, medicallyFit: false})
    .then(res => {
      alert(res.data ? "Updated Successfully" : "Nothing updated")
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

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.checked);

    setInitialMedicalData({
      ...initialMedicalData,
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
                    Initial Medical
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
                          menuList={["FIT by RMO", "UNFIT By RMO (Reason fetched from template)", "TUF (Reason)", "Referred to Specialist (Incl type of specialist from referrals)", "UNFIT by ______ Specialist in __________."]}
                          value={initialMedicalData.status ? initialMedicalData.status : ""}
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
                <Grid item xs={3}>
                  <Button
                    variant="text"
                    color="default"
                    // fullWidth
                    endIcon={
                      <ArrowForwardIosIcon style={{ marginLeft: "20px" }} />
                    }
                    onClick={handleClick}
                  >
                    Deformity Templates
                  </Button>
                </Grid>
                {addedDeformityList.length > 0 && (
                  <Grid item xs={9}>
                    <Chips
                      addedDeformityList={addedDeformityList}
                      handleAddDeformity={handleAddDeformity}
                    />
                  </Grid>
                )}
              </Grid>
              {/* {addedDeformityList.length > 0 && (
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  style={{ marginBottom: "50px" }}
                >
                  <Grid item xs={12}>
                    <Chips
                      addedDeformityList={addedDeformityList}
                      handleAddDeformity={handleAddDeformity}
                    />
                  </Grid>
                </Grid>
              )} */}
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginBottom: "30px" }}
              >
                <Grid item>
                <CustomCheckboxField
                    label="Some Visible Deformity? "
                    name="deformity"
                    checked={initialMedicalData.deformity}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center">
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
        <Popover
          className={classesPopover.root}
          id="deformity-templates"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          style={{ marginLeft: "5px" }}
        >
          <DeformityListOne
            deformityList={medicalDeformityList}
            handleAddDeformity={handleAddDeformity}
            handleClose={handleClose}
          />
        </Popover>
      </Grid>
    </>
  );
}

export default Form;
