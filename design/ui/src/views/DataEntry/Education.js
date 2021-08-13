import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/profile.js";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  FormGroup,
  FormLabel,
  FormControl,
  FilledInput,
  InputAdornment,
  FormHelperText,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField, Button,
} from "@material-ui/core";

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
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function createData(name, calories, fat, carbs, slash, protein, grades) {
  return { name, calories, fat, carbs, slash, protein, grades };
}


function Education() {
  const classes = useStyles();
  const [educationPageData, setEducationPageData] = useState({
    cnic: "",
  });
  const [rows, setRows] = useState([
    createData("Matric", "S", "S", 24, "/", 100, "A"),
    createData("Inter", "CS", "CS", 37, "/", 100, "B"),
    createData("Bachelors", "T", "T", 24, "/", 100, "C"),
    createData("Masters", "-", "-", 67, "/", 100, "D"),
  ])

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setEducationPageData({
      ...educationPageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEducation = () => {
    setRows([
      ...rows,
      createData("", "", "", "", "/", "", ""),
    ])
  }

  const handleSubmit = () => {
    console.log("Handle Submit: ", educationPageData);
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
                    Educational Information
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
                        value={educationPageData.registration}
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
                        cnicRegex.test(educationPageData.cnic)
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
                        value={educationPageData.cnic}
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
                    {!cnicRegex.test(educationPageData.cnic) &&
                      educationPageData.cnic.length > 0 && (
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
                    <FormLabel>For NCsE</FormLabel>
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
                        name="ncse"
                        placeholder="For NCsE"
                        value={educationPageData.ncse}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Under Matric</FormLabel>
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
                        name="underMatric"
                        placeholder="Under Matric Info"
                        value={educationPageData.underMatric}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Grid container justify='flex-end'>
                  <Button onClick={handleAddEducation} variant="contained" style={{backgroundColor: '#01411c', color: 'white', marginTop: '20px', marginRight: '15px'}}>
                    Add Education
                  </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Level of Education
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Major
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Subject
                          </StyledTableCell>
                          {/* <StyledTableCell align='center'>Marks Obtained</StyledTableCell>
            <StyledTableCell align='center'>/</StyledTableCell>
            <StyledTableCell align='center'>Total Marks</StyledTableCell> */}
                          <StyledTableCell align="center">
                            Marks Obtained / Total Marks
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Grade
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell align="center">
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                // label="Native select"
                                value={row.name}
                                // onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                                // helperText="Please select your currency"
                                variant="outlined"
                              >
                                {[
                                  "Matric",
                                  "Inter",
                                  "Bachelors",
                                  "Masters",
                                ].map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </TextField>
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id="outlined-select-cunativerrency-"
                                select
                                // label="Native select"
                                value={row.calories}
                                // onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                                // helperText="Please select your currency"
                                variant="outlined"
                              >
                                {["S", "CS", "T", "-"].map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </TextField>
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                id="outlined-select-cunativerrency-"
                                select
                                // label="Native select"
                                value={row.fat}
                                // onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                                // helperText="Please select your currency"
                                variant="outlined"
                              >
                                {["S", "CS", "T", "-"].map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </TextField>
                            </TableCell>
                            {/* <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.slash}</TableCell>
              <TableCell align='center'>{row.protein}</TableCell> */}
                            <TableCell align="center">
                              <TextField
                                id="outlined-select-cunativerrency-"
                                style={{width: 100}}
                                // select
                                // label="Native select"
                                value={row.carbs}
                                // onChange={handleChange}
                                // SelectProps={{
                                //   native: true,
                                // }}
                                // helperText="Please select your currency"
                                variant="outlined"
                              />
                              <span
                                style={{
                                  fontSize: "25px",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                {row.slash}
                              </span>
                              <TextField
                                id="outlined-select-cunativerrency-"
                                style={{width: 100}}
                                // select
                                // label="Native select"
                                value={row.protein}
                                // onChange={handleChange}
                                // SelectProps={{
                                //   native: true,
                                // }}
                                // helperText="Please select your currency"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">{row.grades}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center" style={{marginTop: '50px'}}>
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
      </Grid>
    </>
  );
}

export default Education;
