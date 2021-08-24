import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/profile.js";
import {
  Box,
  Typography,
  CardContent,
  Grid,
  TableCell,
  Card,
  CardHeader,
  // Checkbox,
  // FormGroup,
  // FormLabel,
  // FormControl,
  // FilledInput,
  Button,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@material-ui/core";
import CustomTextField from "components/CustomFields/CustomTextField";
import API from "utils/api";

const useStyles = makeStyles(componentStyles);

function createData(sr, regn, name, father, district, amountPaid) {
  return { sr, regn, name, father, district, amountPaid };
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

function Summary() {
  const classes = useStyles();
  const [summaryDate, setSummaryDate] = useState("")
  const [summaryData, setSummaryData] = useState([]);

  const getCandidatesSummary = () => {
    API.getCandidatesSummary(summaryDate)
    .then(res => {
      setSummaryData(res.data)
    })
    .catch(err => {
      console.log(err);
        alert("Some error in get candidates Summary");
    })
  }

  // const rows = [
  //   createData(1, "abc-123", "Saad Ali", "Ali Khan", "Haripur", 500),
  //   createData(2, "abc-124", "Saad Ali", "Ali Khan", "Haripur", 500),
  //   createData(3, "abc-125", "Saad Ali", "Ali Khan", "Haripur", 500),
  //   createData(4, "abc-126", "Saad Ali", "Ali Khan", "Haripur", 500),
  //   createData(5, "abc-127", "Saad Ali", "Ali Khan", "Haripur", 500),
  // ];

  // const handleFieldsChange = (e) => {
  //   console.log(e.target.value);
  //   console.log(e.target.name);
  //   setSummary({
  //     ...summary,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleShowAll = () => {
  //   console.log("show all");
  // };

  // const handleCheckFieldsChange = (e) => {
  //   console.log(e.target.value);
  //   console.log(e.target.checked);
  //   console.log(e.target.name);

  //   setSummary({
  //     ...summary,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

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
                    Summary
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
          <CardContent>
            <div className={classes.plLg4}>
              <Grid container>
                {/* <Grid item xs={12} lg={4} style={{ marginTop: "20px" }}>
                  <FormLabel>Day Wise</FormLabel>
                  <Checkbox
                    name="dayWise"
                    color="primary"
                    checked={summary.dayWise}
                    onChange={handleCheckFieldsChange}
                  />
                </Grid> */}
                <Grid item xs={12} lg={4}>
                  <CustomTextField
                    label="Select Date"
                    type="date"
                    name="summaryDate"
                    placeholder="Choose Date"
                    value={summaryDate}
                    onChange={(e) => {
                      setSummaryDate(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Grid container justify="flex-end">
                    <Button
                      onClick={getCandidatesSummary}
                      variant="contained"
                      style={{
                        backgroundColor: "#01411c",
                        color: "white",
                        marginTop: "20px",
                        marginRight: "15px",
                      }}
                    >
                      Show Summary
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              
              {
                summaryData.length > 0 && 
              
              <Grid container>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Regn #
                          </StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">
                            Father's Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            District
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Date
                          </StyledTableCell>
                          <StyledTableCell align="center">Amount Paid</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {summaryData.map((row) => (
                          <TableRow key={row.sr}>
                            <TableCell align="center">{row.registrationNo}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.fathersName}</TableCell>
                            <TableCell align="center">{row.district}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">
                              {row.amountPaid}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            }
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Summary;
