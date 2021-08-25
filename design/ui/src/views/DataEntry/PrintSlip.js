import React, { useState, useRef  } from "react";
import ReactToPrint from 'react-to-print';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  CardContent,
  FormGroup,
  FormLabel,
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  Button, IconButton
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import API from "utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#01411c",
    color: theme.palette.common.white,
    fontSize: "0.80rem",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^(\d{13})$/gm;

function createData(test, dateTime, status) {
  return { test, dateTime, status };
}

function PrintSlip() {
  const classes = useStyles();
  const componentRef = useRef();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [printSlipData, setPrintSlipData] = useState({
    slipDetails: []
  });

  // const rows = [
  //   createData("Initial Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
  //   createData("Personality Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
  //   createData("Hafiz Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
  //   createData("Medical By RMO", "Monday, June 15, 2009 1:45 PM", "Pending"),
  //   createData("Physical Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
  // ];

  const handleCnicVerify = () => {
      API.getCandidatePrintTestSlip(cnic)
      .then((res) => {
        console.log(res);
        setPrintSlipData(res.data)
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Print slip Info");
      });
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.value);

    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
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
        ref={componentRef}
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
                    Tests to Appear
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
          <CardContent>
            <div className={classes.plLg4}>
              <Grid container>
              <Grid item xs={12} lg={6}>
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
                  lg={6}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Registration #:"
                    type="text"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={printSlipData.registrationNo}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
              <Grid container>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Tests
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Date and Time
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {printSlipData.slipDetails.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">
                              <InsertDriveFileOutlinedIcon
                                style={{ marginRight: "10px" }}
                              />
                              {row.test}
                            </TableCell>
                            <TableCell align="center">{row.day}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginTop: "50px" }}
              >
                <Grid item>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrintSlip}
                  >
                    Print Slip
                  </Button> */}
                  <ReactToPrint
                    trigger={() => <Button
                      variant="contained"
                      color="primary"
                    >Print Slip</Button>}
                    content={() => componentRef.current}
                  />
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

export default PrintSlip;
