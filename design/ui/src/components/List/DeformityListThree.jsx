import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import Popover from "@material-ui/core/Popover";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: "200px",
    padding: "0px",
  },
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [selectedListItem, setSelectedListItem] = useState("");

  const deformityListArray = Array.isArray(props.deformityList) ? props.deformityList : Object.keys(props.deformityList);
  
  const handleListItemClick = (event, item, index) => {
    setSelectedIndex(index);
    props.handleAddDeformity(item)
    props.handleClose()
  };

  // console.log("Three: ", deformityListArray);

  return (
    <div className={classes.root}>
      <List
        dense={true}
        component="nav"
        aria-label="main mailbox folders"
        className={classes.list}
      >
        {deformityListArray && deformityListArray.map((item, index) => {
          return (
            <>
              <ListItem
                button
                key={item.id}
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, item, index);
                }}
              >
                <ListItemText primary={item.label} />
                {/* <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    {selectedIndex === index && <ArrowForwardIosIcon />}
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
}
