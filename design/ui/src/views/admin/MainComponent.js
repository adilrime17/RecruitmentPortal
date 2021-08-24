import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
import HeaderTemp from "components/Headers/HeaderTemp.js";
import MedicalEligibility from "../Medical/MedicalEligibility";
import InitialMedical from "../Medical/InitialMedical";
import FinalMedical from "../Medical/FinalMedical";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import PersonalInformation from "views/DataEntry/PersonalInformation";
import Education from "views/DataEntry/Education";
import WoaWos from "views/DataEntry/WoaWos";
import TestsToAppear from "views/DataEntry/TestsToAppear";
import PrintSlip from "views/DataEntry/PrintSlip";
import Summary from "views/DataEntry/Summary";
import Pet from "views/Marks/Pet";
import SummaryMarks from "views/Marks/SummaryMarks";
import TestMarks from "views/Marks/TestMarks";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  let location = useLocation();
  location = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  console.log(location);


  return (
    <>
      <HeaderTemp />
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container className={classes.formContainer}>
          {location === "medical-eligibility" ? (
            <MedicalEligibility />
          ) : location === "initial-medical" ? (
            <InitialMedical />
          ) : location === "final-medical" ? (
            <FinalMedical />
          ) : location === "personal-information" ? (
            <PersonalInformation />
          ) : location === "education" ? (
            <Education />
          ) : location === "woa-wos" ? (
            <WoaWos />
          ) : location === "tests-to-appear" ? (
            <TestsToAppear />
          ) : location === "print-slip" ? (
            <PrintSlip />
          ) : location === "summary" ? (
            <Summary />
          ) : location === "intelligence-test" ? (
            <TestMarks
              type="text"
              testName="intelligence"
              testLabel="Intelligence Test"
            />
          ) : location === "personality-test" ? (
            <TestMarks
              type="text"
              testName="personality"
              testLabel="Personality Test"
            />
          ) : location === "written-test-matric" ? (
            <TestMarks
              type="text"
              testName="writtenMatric"
              testLabel="Written Test (Matric)"
            />
          ) : location === "written-test-u-matric" ? (
            <TestMarks
              type="text"
              testName="writtenUnderMatric"
              testLabel="Written Test (Under Matric)"
            />
          ) : location === "clk-test" ? (
            <TestMarks type="text" testName="clerk" testLabel="Clk Test" />
          ) : location === "tech-test" ? (
            <TestMarks type="text" testName="tech" testLabel="Tech Test" />
          ) : location === "cptr-diploma-test" ? (
            <TestMarks
              type="text"
              testName="dit"
              testLabel="CPTR Diploma Test"
            />
          ) : location === "driving-test" ? (
            <TestMarks type="text" testName="dlh" testLabel="Driving Test" />
          ) : location === "hafiz-test" ? (
            <TestMarks type="select" testName="hafiz" testLabel="Hafiz Test" />
          ) : location === "PET" ? (
            <Pet />
          ) : location === "summary-marks" ? (
            <SummaryMarks />
          ) : (
            ""
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
