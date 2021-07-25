import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";

// core components
// import Header from "components/Headers/Header.js";
import HeaderTemp from "components/Headers/HeaderTemp.js";
// import FormComponent from "../../components/FormComponents/Form.js"
import MedicalEligibility from "../Medical/MedicalEligibility";
import InitialMedical from "../Medical/InitialMedical";
import FinalMedical from "../Medical/FinalMedical";

import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import PersonalInformation from "views/DataEntry/PersonalInformation";
import Education from "views/DataEntry/Education";
import WoaWos from "views/DataEntry/WoaWos";
import TestsToAppear from "views/DataEntry/TestsToAppear";
import PrintSlip from "views/DataEntry/PrintSlip";
import Summary from "views/DataEntry/Summary";
import IntelligenceTest from "views/Marks/IntelligenceTest";
import PersonalityTest from "views/Marks/PersonalityTest";
import WrittenMatric from "views/Marks/WrittenMatric";
import WrittenUnderMatric from "views/Marks/WrittenUnderMatric";
import ClkTest from "views/Marks/ClkTest";
import TechTest from "views/Marks/TechTest";
import CptrDiploma from "views/Marks/CptrDiploma";
import DrivingTest from "views/Marks/DrivingTest";
import HafizTest from "views/Marks/HafizTest";
import Pet from "views/Marks/Pet";
import SummaryMarks from "views/Marks/SummaryMarks";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  let location = useLocation();
  location = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  console.log(location);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <HeaderTemp />
      {/* Page content */}
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
            <IntelligenceTest />
          ) : location === "personality-test" ? (
            <PersonalityTest />
          ) : location === "written-test-matric" ? (
            <WrittenMatric />
          ) : location === "written-test-u-matric" ? (
            <WrittenUnderMatric />
          ) : location === "clk-test" ? (
            <ClkTest />
          ) : location === "tech-test" ? (
            <TechTest />
          ) : location === "cptr-diploma-test" ? (
            <CptrDiploma />
          ) : location === "driving-test" ? (
            <DrivingTest />
          ) : location === "hafiz-test" ? (
            <HafizTest />
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
