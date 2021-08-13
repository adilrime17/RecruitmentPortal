import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
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
  Button,
	Select,
	MenuItem
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import componentStyles from "assets/theme/views/admin/profile.js";

const useStyles = makeStyles(componentStyles);
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/g;

function SummaryMarks() {
  const classes = useStyles();
  const [marksData, setMarksData] = useState({
    cnic: "",
  });

  const handleSubmit = () => {
    console.log("Handle Submit: ", marksData);
  };

  const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setMarksData({
      ...marksData,
      [e.target.name]: e.target.value,
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
                    Summary Marks
                  </Box>
                </Grid>
              </Grid>
            }
            classes={{ root: classes.cardHeaderRoot }}
          ></CardHeader>
          <CardContent>
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12} lg={4}>
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
                        value={marksData.registration}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>CNIC (Format: xxxxx-xxxxxxx-x)</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom={
                        cnicRegex.test(marksData.cnic)
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
                        value={marksData.cnic}
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
                    {!cnicRegex.test(marksData.cnic) &&
                      marksData.cnic.length > 0 && (
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
                <Grid item xs={12} lg={4}>
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
                        placeholder="Name"
                        value={marksData.name}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
							<Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
              <Grid item xs={12} lg={4}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <FormGroup style={{ marginBottom: "0.5rem" }}>
                      <FormLabel>District</FormLabel>
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
                          name="district"
                          placeholder="District"
                          value={marksData.district}
                          onChange={handleFieldsChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Pers</FormLabel>
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
                        name="pers"
                        displayEmpty
                        placeholder="Suitable/Unsuitable"
                        value={marksData.pers}
                        onChange={handleFieldsChange}
                      >
                        {["Suitable", "Unsuitable"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
                  <Grid item>
                    <FormGroup style={{ marginBottom: "0.5rem" }}>
                      <FormLabel>Int</FormLabel>
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
                          name="int"
                          placeholder="Int"
                          value={marksData.int}
                          onChange={handleFieldsChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item>
                    <FormGroup style={{ marginBottom: "0.5rem" }}>
                      <FormLabel>Wtn</FormLabel>
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
                          name="wtn"
                          placeholder="Wtn"
                          value={marksData.wtn}
                          onChange={handleFieldsChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  
                </Grid>
              </Grid>
              {/* </Grid> */}

              
                <Grid item xs={12} lg={4}>
								<Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
<Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>DLH</FormLabel>
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
                        name="dlh"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.dlh}
                        onChange={handleFieldsChange}
                      >
                        {["Pass", "Fail"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
									<Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>DIT</FormLabel>
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
                        name="dit"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.dit}
                        onChange={handleFieldsChange}
                      >
                        {["Pass", "Fail"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
									<Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>PET</FormLabel>
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
                        name="pet"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.pet}
                        onChange={handleFieldsChange}
                      >
                        {["Pass", "Fail"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
									<Grid item>
                    <FormGroup style={{ marginBottom: "0.5rem" }}>
                      <FormLabel>Sponser</FormLabel>
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
                          name="sponser"
                          placeholder="Sponser"
                          value={marksData.sponser}
                          onChange={handleFieldsChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
								</Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>WOS/WOA</FormLabel>
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
                        name="wosWoa"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.wosWoa}
                        onChange={handleFieldsChange}
                      >
                        {["Verified", "Unverified"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
                    <Grid item>
                      <FormGroup style={{ marginBottom: "0.5rem" }}>
                        <FormLabel>Clk</FormLabel>
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
                            name="clk"
                            placeholder="Clk"
                            value={marksData.clk}
                            onChange={handleFieldsChange}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item>
                      <FormGroup style={{ marginBottom: "0.5rem" }}>
                        <FormLabel>Tech</FormLabel>
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
                            name="tech"
                            placeholder="Tech"
                            value={marksData.tech}
                            onChange={handleFieldsChange}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Hafiz</FormLabel>
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
                        name="hafiz"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.hafiz}
                        onChange={handleFieldsChange}
                      >
                        {["Pass", "Fail"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
									<Grid item>
                    
										<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Med Status</FormLabel>
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
                        name="medStatus"
                        displayEmpty
                        placeholder="Pass/Fail"
                        value={marksData.medStatus}
                        onChange={handleFieldsChange}
                      >
                        {["MUF", "FIT", "Ref"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Box>
                    </FormControl>
                  </FormGroup>
                  </Grid>
                  </Grid>
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
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SummaryMarks;
