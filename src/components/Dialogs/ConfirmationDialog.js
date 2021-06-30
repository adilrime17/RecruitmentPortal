import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import componentStyles from "../../assets/theme/components/confirmationDialog";

const useStyles = makeStyles(componentStyles);


function AlertDialog({open, handleClose, message}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        classes={{ paper: classes.dialogRoot }}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          <DialogContentText variant='h2' classes={{ root: classes.dialogText }}id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions }}>
          {/* <Button onClick={() => handleClose(false)} color="primary">
            Disagree
          </Button> */}
          <Button onClick={() => handleClose(false)} color="primary" variant='contained' autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// AlertDialog.defaultProps = {
//   color: "bgPrimaryLight",
// };

AlertDialog.propTypes = {
  // subtitle: PropTypes.string,
  // title: PropTypes.string,
  // footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // icon: PropTypes.oneOfType([
  //   // i.e. an icon name from Nucleo Icons - e.g. ni ni-atom
  //   // // or an icon name from Font Awesome - e.g. fa fa-heart
  //   PropTypes.string,
  //   // i.e. a component from @material-ui/icons
  //   PropTypes.object,
  // ]),
  // color: PropTypes.oneOf([
  //   "bgPrimary",
  //   "bgPrimaryLight",
  //   "bgError",
  //   "bgErrorLight",
  //   "bgWarning",
  //   "bgWarningLight",
  //   "bgInfo",
  //   "bgInfoLight",
  // ]),
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	message: PropTypes.string,
};

export default AlertDialog;
