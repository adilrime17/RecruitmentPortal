import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
