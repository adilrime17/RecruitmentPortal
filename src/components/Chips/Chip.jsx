import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
// import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);
  useEffect(() => {
    setChipData(props.addedDeformityList)
  }, [props.addedDeformityList])

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
    props.handleAddDeformity(chipToDelete)
  };

  console.log("Chip Data: ", chipData);

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        // let icon;

        // if (data.label === 'React') {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <li key={data.id}>
            <Chip
              // icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
