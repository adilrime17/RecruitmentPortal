import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// import Container from "@material-ui/core/Container";
// import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from "@material-ui/core/Typography";
import componentStyles from "assets/theme/views/admin/profile.js";
import { Checkbox, Button } from "@material-ui/core";
// import boxShadows from "assets/theme/box-shadow.js";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(componentStyles);

const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function Form() {
  const classes = useStyles();
  const theme = useTheme();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [medicalEligibilityData, setMedicalEligibilityData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    cnic: "",
    dob: "",
    height: '',
    chest: '',
    weight: '',
    deformity: false
  });
  const [dialogMessage, setDialogMessage] = useState('')

  const handleSubmit = () => {
    console.log("Handle Submit: ", medicalEligibilityData);
    setDialogMessage('Eligible/Not Eligible')
    setOpenConfirmationDialog(true)
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setMedicalEligibilityData({
      ...medicalEligibilityData,
      [e.target.name]: e.target.name === 'deformity' ? e.target.checked : e.target.value,
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
                // justifyContent="space-between"
                justifyContent="center"
              >
                <Grid item xs="auto">
                  <Box
                    component={Typography}
                    variant="h3"
                    marginBottom="0!important"
                  >
                    Check Medical Eligibility
                  </Box>
                </Grid>
                {/* <Grid item xs="auto">
                  <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                    <Button variant="contained" color="primary" size="small">
                      Settings
                    </Button>
                  </Box>
                </Grid> */}
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
          <CardContent>
            {/* <Box
              component={Typography}
              variant="h6"
              color={theme.palette.gray[600] + "!important"}
              paddingTop=".25rem"
              paddingBottom=".25rem"
              fontSize=".75rem!important"
              letterSpacing=".04em"
              marginBottom="1.5rem!important"
              classes={{ root: classes.typographyRootH6 }}
            >
              User Information
            </Box> */}
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>First Name</FormLabel>
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
                        name="firstName"
                        placeholder="Provide First Name"
                        value={medicalEligibilityData.firstName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>Middle Name</FormLabel>
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
                        name="middleName"
                        placeholder="Provide Middle Name"
                        value={medicalEligibilityData.middleName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>Last Name</FormLabel>
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
                        name="lastName"
                        placeholder="Provide Last Name"
                        value={medicalEligibilityData.lastName}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>CNIC (Format: xxxxx-xxxxxxx-x)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(medicalEligibilityData.cnic)
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
                        value={medicalEligibilityData.cnic}
                        endAdornment={<InputAdornment position="end"><CheckCircleIcon classes={{ root: classes.iconCnic }} /></InputAdornment>}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                    {!cnicRegex.test(medicalEligibilityData.cnic) &&
                      medicalEligibilityData.cnic.length > 0 && (
                        <FormHelperText error id="standard-weight-helper-text" color='error'>
                          Please follow CNIC format!
                          </FormHelperText>
                      )}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>Date of Birth</FormLabel>
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
                        type="date"
                        name="dob"
                        value={medicalEligibilityData.dob}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4}>
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
                        value={medicalEligibilityData.height}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
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
                        value={medicalEligibilityData.chest}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
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
                        value={medicalEligibilityData.weight}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginBottom: "50px" }}
              >
                <Grid item>
                  <FormLabel>Some Visible Deformity? </FormLabel>
                  <Checkbox name='deformity' color="primary" checked={medicalEligibilityData.deformity} onChange={handleFieldsChange} />
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
            {/* <Box
              component={Divider}
              marginBottom="1.5rem!important"
              marginTop="1.5rem!important"
            />
            <Box
              component={Typography}
              variant="h6"
              color={theme.palette.gray[600] + "!important"}
              paddingTop=".25rem"
              paddingBottom=".25rem"
              fontSize=".75rem!important"
              letterSpacing=".04em"
              marginBottom="1.5rem!important"
              classes={{ root: classes.typographyRootH6 }}
            >
              Contact Information
            </Box>
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>Address</FormLabel>
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
                        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>City</FormLabel>
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
                        defaultValue="New York"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>Country</FormLabel>
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
                        defaultValue="United States"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormLabel>Postal code</FormLabel>
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
                        placeholder="Postal code"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
            <Box
              component={Divider}
              marginBottom="1.5rem!important"
              marginTop="1.5rem!important"
            />
            <Box
              component={Typography}
              variant="h6"
              color={theme.palette.gray[600] + "!important"}
              paddingTop=".25rem"
              paddingBottom=".25rem"
              fontSize=".75rem!important"
              letterSpacing=".04em"
              marginBottom="1.5rem!important"
              classes={{ root: classes.typographyRootH6 }}
            >
              About me
            </Box>
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>About me</FormLabel>
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
                        multiline
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                        rows="4"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </div> */}
          </CardContent>
        </Card>
        <ConfirmationDialog
          open={openConfirmationDialog}
          handleClose={setOpenConfirmationDialog}
          message={dialogMessage}
        />
      </Grid>
    </>
  );
}

export default Form;
