const componentStyles = (theme) => ({
  header: {
    position: "relative",
    // background: "linear-gradient(87deg," + theme.palette.info.main + ", #01411c)",
    background: "linear-gradient(87deg, #027b35, #01411c)",
    paddingBottom: "8rem",
    paddingTop: "3rem",
    [theme.breakpoints.up("md")]: {
      paddingTop: "5rem",
    },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
