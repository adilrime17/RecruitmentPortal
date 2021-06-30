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
import Chips from '../../components/Chips/Chip'

const medicalDeformityList = {
  "Surgical": {
    "Elbow Deformities": [
      "Cubitus valgus (carrying angle)",
      "Cubitus varum",
      "Other elbow deformities (Add remarks space for manual entry of specific problem)"
    ],
    "Chest Deformities": [
      "Pectus carinatum",
      "Pectus excavatum",
      "Other chest deformities (Add remarks space for manual entry of specific problem)"
    ],
    "Knee Deformities": [
      "Genu valgus (knee knock)",
      "Genu varum"
    ],
    "Foot Deformities": [
      "Hallux valgus",
      "Hallux varum",
      "Pes planus (flat foot)",
      "Pes cavum (high arched foot)",
      "Mobile Pes planum",
      "Over riding toes",
      "Hammer toes",
      "Other foot deformities (Add remarks space for manual entry of specific problem)"
    ],
    "Spinal Deformities": [
      "Kyphosis",
      "Scoliosis",
      "Spina bifida",
      "Winging of Scapula",
      "Other spinal deformities (Add remarks space for manual entry of specific problem)"
    ],
    "External Genitalia": [
      "Inguinal hernia",
      "Paraumbilical hernia",
      "Other hernias (Add remarks space for manual entry of specific problem)",
      "Epispadias",
      "Hypospadias",
      "Hydrocoele",
      "Varicocoele",
      "Undescended testis",
      "Atrophic testis",
      "Scrotal swelling",
      "External hemorrhoids",
      "Internal hemarrhoids",
      "Anal fissure",
      "Other genital diseases (Add remarks space for manual entry of specific problem)"
    ],
    "Scar Marks": [
      "Appendectomy",
      "Right Hand",
      "Left Hand",
      "Right Forearm",
      "Left Forearm",
      "Right Arm",
      "Left Arm",
      "Right Shoulder",
      "Left Shoulder",
      "Chest",
      "Back",
      "Abdomen",
      "Scalp",
      "Face",
      "Neck",
      "Right Hip",
      "Left Hip",
      "Right Thigh",
      "Left Thigh",
      "Right Leg",
      "Left Leg",
      "Right Foot",
      "Left Foot",
      "Other scar marks (Add remarks space for manual entry of specific problem)"
    ],
    "Other Surgical Defects (Add remarks space for manual entry of specific problem)": ""
  },
  "ENT": {
    "Nasal Deformities": [
      "DNS",
      "Enlarged turbinates",
      "Nasal polyp / polypi",
      "Atrophic rhinitis",
      "Other nasal deformities (Add remarks space for manual entry of specific problem)"
    ],
    "Ear Deformities": [
      "External ear defects (Add remarks space for manual entry of specific problem)",
      "Otitis externa",
      "Otitis media",
      "Aural discharge",
      "Wax",
      "Perforated tampanic membrane",
      "Wax + TM Exam",
      "Other ear defects (Add remarks space for manual entry of specific problem)"
    ],
    "Throat Deformities": [
      "Tonsillitis",
      "Deformed uvula",
      "Other throat deformities (Add remarks space for manual entry of specific problem)"
    ],
    "Other ENT Defects (Add remarks space for manual entry of specific problem)": ""
  },
  "Eye": {
    "Squint": {},
    "Trachoma": {},
    "Ptosis": {},
    "Conjunctivitis": {},
    "Lid swelling": {},
    "Dirty sclera": {},
    "Other eye defects (Add remarks space for manual entry of specific problem)": {}
  },
  "Skin": {
    "Hyper-pigmentation (Add remarks space for manual entry of specific problem)": {},
    "Hypo-pigmentation (Add remarks space for manual entry of specific problem)": {},
    "Hyperhydrosis": {},
    "Skin lesions (Add remarks space for manual entry of specific problem)": {},
    "Other skin deformities (Add remarks space for manual entry of specific problem)": {}
  },
  "Thyroid": {
    "Goitre": {},
    "Other thyroid defects (Add remarks space for manual entry of specific problem)": {}
  },
  "Lymph nodes": {
    "Swellings (Add remarks space for manual entry of specific problem)": {},
    "Lymphadenitis (Add remarks space for manual entry of specific problem)": {}
  },
  "Nail Deformities": {
    "Koilonychia": {},
    "Splinter hemorrhages": {},
    "Other nail deformities (Add remarks space for manual entry of specific problem)": {}
  },
  "Medical": {
    "Speech": [
      "Stammer",
      "Stutter",
      "Slurring",
      "Monotonous",
      "Other speech defects (Add remarks space for manual entry of specific problem)"
    ],
    "General": [
      "Anemia",
      "Jaundice",
      "Cyanosis (Add remarks space for manual entry of specific problem)",
      "Edema (Add remarks space for manual entry of specific problem)",
      "Clubbing (Add remarks space for manual entry of specific problem)"
    ],
    "Cardiac": [
      "Tachycardia",
"Bradycardia",
"Heart murmur",
"Hypertension",
"Arrythmia",
"Other cardiac defects (Add remarks space for manual entry of specific problem)"
      ],
    "Respiratory": [
      "Asthma",
"Bronchitis",
"History of TB",
"Other pulmonary diseases (Add remarks space for manual entry of specific problem)"
      ],
    "Abdominal": ["Defects (Add remarks space for manual entry of specific problem)"],
    "Other Medical Defects (Add remarks space for manual entry of specific problem)": {}
  },
  "Dental": {
    "Dental hygiene": {},
    "Caries": {},
    "Pyorrhea": {},
    "Scurvy": {},
    "Other dental defects (Add remarks space for manual entry of specific problem)": {}
  }
}

const useStyles = makeStyles(componentStyles);
const useStylesPopover = makeStyles(theme => ({
  root: {
    "& .MuiPopover-paper": {
      padding: '0px'
    }
  }
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
    // setDialogMessage('Eligible/Not Eligible')
    // setOpenConfirmationDialog(true)
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
                  <FormGroup>
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
                  <FormGroup>
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
                  <FormGroup>
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
                <Grid item xs={12} lg={3}>
                  <FormGroup>
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
                <Grid item xs={12} lg={3}>
                  <FormGroup>
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
                <Grid item xs={12} lg={3}>
                  <FormGroup>
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
                <Grid item xs={12} lg={3}>
                  <FormGroup>
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
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                style={{ marginBottom: "50px" }}
              >
                <Grid item xs={4}>
                  <Button
                    variant="text"
                    color="default"
                    endIcon={
                      <ArrowForwardIosIcon style={{ marginLeft: "20px" }} />
                    }
                    onClick={handleClick}
                  >
                    Deformity Templates
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                style={{ marginBottom: "50px" }}
              >
                <Grid item xs={12}>
                  <Chips />
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
          <DeformityListOne deformityList={medicalDeformityList} />
        </Popover>
      </Grid>
    </>
  );
}

export default Form;
