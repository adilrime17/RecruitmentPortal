import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import Popover from "@material-ui/core/Popover";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: '200px', padding: '0px'
  }
}));

const useStylesPopover = makeStyles(theme => ({
  root: {
    "& .MuiPopover-paper": {
      padding: '0px'
    }
  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
//   const classesPopover = useStylesPopover();
//   const [anchorEl, setAnchorEl] = React.useState(null);
  const [deformityListArray, setDeformityListArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedListItem, setSelectedListItem] = useState("")

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const open = Boolean(anchorEl);

  useEffect(() => {
    setDeformityListArray(Object.keys(props.deformityList));
  }, [props.deformityList]);

  const handleListItemClick = (event, item, index) => {
    setSelectedIndex(index);
    setSelectedListItem(item)
  };

  console.log("List 3: ", props.deformityList)

  return (
    <div className={classes.root}>
      <List dense={true} component="nav" aria-label="main mailbox folders" className={classes.list}>
        {
          deformityListArray.map((item, index) => {
            return (
              <>
              <ListItem
          button
          selected={selectedIndex === index}
          onClick={(event) => {
            handleListItemClick(event, item, index);
            // handleClick(event);
          }}
        >
          <ListItemText primary={item} />
          <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    {selectedIndex === index && <ArrowForwardIosIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        </>
            )
          })
        }
      </List>
      {/* <Popover
          className={classesPopover.root}
          id="deformity-templates"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          style={{ marginLeft: "5px" }}
        >
          <DeformityListThree deformityList={props.deformityList[selectedListItem]} />
        </Popover> */}
    </div>
  );
}
