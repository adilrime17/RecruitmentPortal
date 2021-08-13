import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import componentStyles from "assets/theme/views/admin/profile.js";
import { Box, Typography, CardContent, Grid, TableCell, Card, CardHeader, Checkbox, FormGroup, FormLabel, FormControl, FilledInput, Button, TableBody, Table, TableHead, TableRow, TableContainer, Paper } from '@material-ui/core'

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
	const [summary, setSummary] = useState({})

	const rows = [
    createData(1, 'abc-123', 'Saad Ali', 'Ali Khan', 'Haripur', 500),
    createData(2, 'abc-124', 'Saad Ali', 'Ali Khan', 'Haripur', 500),
    createData(3, 'abc-125', 'Saad Ali', 'Ali Khan', 'Haripur', 500),
    createData(4, 'abc-126', 'Saad Ali', 'Ali Khan', 'Haripur', 500),
    createData(5, 'abc-127', 'Saad Ali', 'Ali Khan', 'Haripur', 500),
  ]

	const handleFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setSummary({
      ...summary,
      [e.target.name]: e.target.value,
    });
  };

	const handleShowAll = () => {
		console.log('show all');
	}

	const handleCheckFieldsChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log(e.target.name);

    setSummary({
      ...summary,
      [e.target.name]: e.target.checked,
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
                <Grid item xs={12} lg={4} style={{marginTop: '20px'}}>
								<FormLabel>Day Wise</FormLabel>
                  <Checkbox
                    name="dayWise"
                    color="primary"
                    checked={summary.dayWise}
                    onChange={handleCheckFieldsChange}
                  />
									</Grid>
									<Grid item xs={12} lg={4}>
									<FormGroup style={{ marginBottom: "0.5rem" }}>
                    <FormLabel>Select Date</FormLabel>
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
                        name="selectedDate"
                        placeholder="Select Date"
                        value={summary.selectedDate}
                        onChange={handleFieldsChange}
                      />
                    </FormControl>
                  </FormGroup>
									</Grid>
									<Grid item xs={12} lg={4}>
                  <Grid container justify='flex-end'>
                  <Button onClick={handleShowAll} variant="contained" style={{backgroundColor: '#01411c', color: 'white', marginTop: '20px', marginRight: '15px'}}>
                    Show Summary of all registered candidates
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
                            Sr #
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Regn #
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Name
                          </StyledTableCell>
													<StyledTableCell align="center">
                            Father
                          </StyledTableCell>
													<StyledTableCell align="center">
                            District
                          </StyledTableCell>
													<StyledTableCell align="center">
                            Amount Paid
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.sr}>
                            <TableCell align="center">
                              {row.sr}
                            </TableCell>
                            <TableCell align="center">{row.regn}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.father}</TableCell>
                            <TableCell align="center">{row.district}</TableCell>
                            <TableCell align="center">{row.amountPaid}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
					</div>
					</CardContent>
				</Card>
			</Grid>
            
        </>
    )
}

export default Summary
