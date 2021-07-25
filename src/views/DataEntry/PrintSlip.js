import React, { useState } from "react";
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
  Button,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function createData(test, dateTime, status) {
  return { test, dateTime, status };
}

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

function PrintSlip() {
  const classes = useStyles();
  const [printSlipData, setPrintSlipData] = useState({
    cnic: "",
  });

  const rows = [
    createData("Initial Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
    createData("Personality Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
    createData("Hafiz Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
    createData("Medical By RMO", "Monday, June 15, 2009 1:45 PM", "Pending"),
    createData("Physical Test", "Monday, June 15, 2009 1:45 PM", "Pending"),
  ];

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setPrintSlipData({
      ...printSlipData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log(e.target.name);

    setPrintSlipData({
      ...printSlipData,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePrintSlip = () => {
    console.log("Handle Submit: ", printSlipData);
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
                        value={printSlipData.registration}
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
                        cnicRegex.test(printSlipData.cnic)
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
                        value={printSlipData.cnic}
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
                    {!cnicRegex.test(printSlipData.cnic) &&
                      printSlipData.cnic.length > 0 && (
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
                          <StyledTableCell align="center">
                            Test Status
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell align="center">
                              <InsertDriveFileOutlinedIcon
                                style={{ marginRight: "10px" }}
                              />
                              {row.test}
                            </TableCell>
                            <TableCell align="center">{row.dateTime}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
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
                  <FormLabel>Charges Paid</FormLabel>
                  <Checkbox
                    name="chargesPaid"
                    color="primary"
                    checked={printSlipData.chargesPaid}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrintSlip}
                  >
                    Print Slip
                  </Button>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default PrintSlip;
