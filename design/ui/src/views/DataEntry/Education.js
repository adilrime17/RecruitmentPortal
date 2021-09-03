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
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import API from "utils/api";
import CustomTextField from "components/CustomFields/CustomTextField";
import CustomCheckboxField from "components/CustomFields/CustomCheckboxField";

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

// function createData(qualification, major, subject, obtained, total, grade) {
//   return { qualification, major, subject, obtained, total, grade };
// }

function Education() {
  const classes = useStyles();
  // const history = useHistory();
  const [cnic, setCnic] = useState("");
  const [isCnicVerified, setIsCnicVerified] = useState(false);
  const [checkCnicFormat, setCheckCnicFormat] = useState(false);
  const [candidateEducationData, setCandidateEducationData] = useState({
    registrationNo: "",
    ncse: false,
    maxQualification: "",
    candidateEducationalData: [],
  });
  const [qualificationLevel, setQualificationLevel] = useState([]);
  const [qualificationDegree, setQualificationDegree] = useState([])
  const [qualificationMajors, setQualificationMajors] = useState([]);
  const [qualificationMajorsSubjects, setQualificationMajorsSubjects] = useState([]);
  

  // const [rows, setRows] = useState([])

  // const handleTableData = async (data) => {
  //   console.log("Handle Table Data", data);
  //   await setRows(data.map(item => {
  //     return createData(item.qualification, item.major, item.subject, item.obtained, item.total, item.grade)
  //   }))
  // }

  const handleCnicVerify = () => {
    Promise.all([
      
      API.getCandidateEducationalData(cnic),
      API.getQualificationLevel(),
      // API.getQualificationDegree(),
      // API.getQualificationMajorList(),
      // API.getQualificationMajorSubjectList()
      
    ])
      .then((res) => {
        console.log(res);
        setCandidateEducationData(res[0].data ? res[0].data : {
          registrationNo: "",
          ncse: false,
          maxQualification: "",
          candidateEducationalData: []
        });
        setQualificationLevel(res[1].data);
        // setQualificationDegree(res[2].data);
        // setQualificationMajors(res[3].data);
        // setQualificationMajorsSubjects(res[4].data);
        setIsCnicVerified(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error in handleCnicVerify Promise Educational Info");
      });
  };

  // console.log("ROWS: ", rows);

  const handleSubmit = () => {
    console.log("Handle Submit: ", candidateEducationData);
    API.updateCandidateEducationalData(cnic, candidateEducationData.candidateEducationalData)
      .then((res) => {
        console.log(res);
        alert(res.data ? "Updated Successfully" : "Nothing updated")
        // setCandidateEducationData({
        //   registrationNo: "",
        //   ncse: false,
        //   maxQualification: "",
        //   candidateEducationalData: []
        // });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.name + " = " + e.target.value);

    if (e.target.name === "cnic") {
      setCheckCnicFormat(cnicRegex.test(e.target.value));
      setIsCnicVerified(false);
      setCnic(e.target.value);
    } else {
      setCandidateEducationData({
        ...candidateEducationData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleTableEducationData = (index, key, value) => {

    if(key === 'level') {
      let id = qualificationLevel.find(x => x.label === value).id
      console.log("Hello world: ", id);
      API.getQualificationDegree(id)
      .then(res => {
        setQualificationDegree(res.data);
      })
      .catch(err => {
        alert(err)
      })
    } else if(key === 'degree') {
      let id = qualificationDegree.find(x => x.label === value).id
      console.log("Hello world: ", id);
      API.getQualificationMajorList(id)
      .then(res => {
        console.log(res);
        setQualificationMajors(res.data);
      })
      .catch(err => {
        alert(err)
      })
    } else if(key === 'major') {
      let id = qualificationMajors.find(x => x.label === value).id
      API.getQualificationMajorSubjectList(id)
      .then(res => {
        console.log(res);
        setQualificationMajorsSubjects(res.data);
      })
      .catch(err => {
        alert(err)
      })
    }


    let temp = candidateEducationData.candidateEducationalData;
    temp[index][key] = value;
    setCandidateEducationData({
      ...candidateEducationData,
      candidateEducationalData: temp,
    });
    console.log(temp);
  };

  const handleAddEducation = () => {
    setCandidateEducationData({
      ...candidateEducationData,
      candidateEducationalData: [
        ...candidateEducationData.candidateEducationalData,
        {
          level: "",
          degree: "",
          major: "",
          subject: "",
          obtained: "",
          total: "",
          grade: "",
        },
      ],
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
                <Grid item xs={12} lg={3}>
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
                  lg={3}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Registration #:"
                    type="text"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={candidateEducationData.registrationNo}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={3}
                  style={isCnicVerified ? {} : { display: "none" }}
                >
                  <CustomTextField
                    label="Max Qualification"
                    type="text"
                    name="maxQualification"
                    placeholder="Max Qualification"
                    value={candidateEducationData.maxQualification}
                    // onChange={handleFieldsChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={3}
                  style={
                    isCnicVerified
                      ? { direction: "rtl", paddingTop: "20px" }
                      : { display: "none" }
                  }
                >
                  <CustomCheckboxField
                    label="Applying as NCsE"
                    name="ncse"
                    checked={candidateEducationData.ncse}
                    // onChange={handleCheckFieldsChange}
                  />
                </Grid>
              </Grid>
              <div style={isCnicVerified ? {} : { display: "none" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container justify="flex-end">
                      <Button
                        onClick={handleAddEducation}
                        variant="contained"
                        style={{
                          backgroundColor: "#01411c",
                          color: "white",
                          marginRight: "15px",
                          marginBottom: "15px",
                        }}
                      >
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
                              Degree
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Major
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Subject
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Marks Obtained
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Total Marks
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {candidateEducationData.candidateEducationalData.map(
                            (row, index) => (
                              <TableRow key={index}>
                                <TableCell align="center">
                                  <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="70%"
                                    // marginBottom="1rem!important"
                                  >
                                    <Box
                                      // paddingLeft="0.75rem"
                                      // paddingRight="0.75rem"
                                      component={Select}
                                      autoComplete="off"
                                      displayEmpty
                                      type="text"
                                      name="level"
                                      value={row.level}
                                      onChange={(e) => handleTableEducationData(index, e.target.name, e.target.value)}
                                    >
                                      {qualificationLevel.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.label}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Box>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                  <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="90%"
                                    // marginBottom="1rem!important"
                                  >
                                    <Box
                                      // paddingLeft="0.75rem"
                                      // paddingRight="0.75rem"
                                      component={Select}
                                      autoComplete="off"
                                      displayEmpty
                                      type="text"
                                      name="degree"
                                      value={row.degree}
                                      onChange={(e) => handleTableEducationData(index, e.target.name, e.target.value)}
                                    >
                                      {qualificationDegree.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.label}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Box>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                  <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="70%"
                                    // marginBottom="1rem!important"
                                  >
                                    <Box
                                      // paddingLeft="0.75rem"
                                      // paddingRight="0.75rem"
                                      component={Select}
                                      autoComplete="off"
                                      displayEmpty
                                      type="text"
                                      name="major"
                                      value={row.major}
                                      onChange={(e) => handleTableEducationData(index, e.target.name, e.target.value)}
                                    >
                                      {qualificationMajors.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.label}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Box>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                  <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="70%"
                                    // marginBottom="1rem!important"
                                  >
                                    <Box
                                      // paddingLeft="0.75rem"
                                      // paddingRight="0.75rem"
                                      component={Select}
                                      autoComplete="off"
                                      displayEmpty
                                      type="text"
                                      name="subject"
                                      value={row.subject}
                                      onChange={(e) => handleTableEducationData(index, e.target.name, e.target.value)}
                                    >
                                      {qualificationMajorsSubjects.map(
                                        (option) => (
                                          <MenuItem
                                            key={option.id}
                                            value={option.label}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        )
                                      )}
                                    </Box>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                  <TextField
                                    id="obtained"
                                    style={{ width: "70%" }}
                                    name="obtained"
                                    value={row.obtained}
                                    onChange={(e) => handleTableEducationData(index, e.target.name, parseInt(e.target.value))}
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <TextField
                                    id="total"
                                    style={{ width: "70%" }}
                                    name="total"
                                    value={row.total}
                                    onChange={(e) => handleTableEducationData(index, e.target.name, parseInt(e.target.value))}
                                    variant="outlined"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.grade}
                                </TableCell>
                              </TableRow>
                            )
                          )}
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
      </Grid>
    </>
  );
}

export default Education;
