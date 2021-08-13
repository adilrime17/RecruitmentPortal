import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
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
import { Button } from "@material-ui/core";
// import boxShadows from "assets/theme/box-shadow.js";
// import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DeformityListOne from "../../components/List/DeformityListOne";
import Chips from "../../components/Chips/Chip";
import { Select, MenuItem } from "@material-ui/core";

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
const useStylesPopover = makeStyles((theme) => ({
  root: {
    "& .MuiPopover-paper": {
      padding: "0px",
    },
  },
}));

const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function Form() {
  const classes = useStyles();
  const classesPopover = useStylesPopover();
  const theme = useTheme();
  const [initialMedicalData, setInitialMedicalData] = useState({
    registration: "",
    name: "",
    cnic: "",
    height: "",
    chest: "",
    weight: "",
    bp: ["", ""],
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

  const handleSubmit = () => {
    console.log("Handle Submit: ", initialMedicalData);
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
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setInitialMedicalData({
      ...initialMedicalData,
      [e.target.name]:
        e.target.name === "deformity" ? e.target.checked : e.target.value,
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
              <Grid container justifyContent="center">
                <Grid item xs={12} lg={4} style={{ margin: "auto" }}>
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
                        value={initialMedicalData.registration}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Name</FormLabel>
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
                        name="name"
                        disabled
                        placeholder="Name"
                        value={initialMedicalData.name}
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
                        cnicRegex.test(initialMedicalData.cnic)
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
                        value={initialMedicalData.cnic}
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
                    {!cnicRegex.test(initialMedicalData.cnic) &&
                      initialMedicalData.cnic.length > 0 && (
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
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Height (Inches)</FormLabel>
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
                        type="number"
                        name="height"
                        placeholder="Height in Inches"
                        value={initialMedicalData.height}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Chest (Inches)</FormLabel>
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
                        type="number"
                        name="chest"
                        placeholder="Chest in Inches"
                        value={initialMedicalData.chest}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Weight (Kg)</FormLabel>
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
                        type="number"
                        name="weight"
                        placeholder="Weight in Kg"
                        value={initialMedicalData.weight}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Temperature</FormLabel>
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
                        name="temperature"
                        placeholder="Body Temperature"
                        value={initialMedicalData.temperature}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Pulse Rate</FormLabel>
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
                        name="pulseRate"
                        placeholder="Pulse Rate"
                        value={initialMedicalData.pulseRate}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
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
                        name="weight"
                        placeholder=""
                        value={initialMedicalData.weight}
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
                        name="weight"
                        placeholder=""
                        value={initialMedicalData.weight}
                        onChange={handleFieldsChange}
                        style={{ width: "50%" }}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Status Update</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        component={Select}
                        autoComplete="off"
                        type="text"
                        name="status"
                        displayEmpty
                        placeholder="Status"
                        value={initialMedicalData.status}
                        onChange={handleFieldsChange}
                      >
                        {[
                          "FIT by RMO",
                          "UNFIT By RMO (Reason fetched from template)",
                          "TUF (Reason)",
                          "Referred to Specialist (Incl type of specialist from referrals)",
                          "UNFIT by ______ Specialist in __________.",
                        ].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item xs={12} lg={8}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Remarks</FormLabel>
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
                        name="remarks"
                        // multiline
                        placeholder="Remarks"
                        value={initialMedicalData.remarks}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
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
