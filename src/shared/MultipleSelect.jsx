import React, { useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    margin: theme.spacing(1),
    minWidth: '23vw',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const minutes = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',];


function MultipleSelect() {
  const classes = useStyles();
  const [min, setMin] = useState('One');

  const handleChange = (event) => setMin(event.target.value);

  let selectLabel;
  switch(min) {
    case 'One':
      selectLabel = 'Every 1 Minute On The Minute';
      break;
    case 'Two':
      selectLabel = 'Every 2 Minutes On The 2 Minutes';
      break;
    case 'Three':
      selectLabel = 'Every 3 Minutes On The 3 Minutes';
      break;
    case 'Four':
      selectLabel = 'Every 4 Minutes On The 4 Minutes';
      break;
    case 'Five':
      selectLabel = 'Every 5 Minutes On The 5 Minutes';
      break;
    case 'Six':
      selectLabel = 'Every 6 Minutes On The 6 Minutes';
      break;
    case 'Seven':
      selectLabel = 'Every 7 Minutes On The 7 Minutes';
      break;
    case 'Eight':
      selectLabel = 'Every 8 Minutes On The 8 Minutes';
      break;
  }

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="multipleSelectLabel">{selectLabel}</InputLabel>
        <Select
          labelId="everyMinute"
          id="mutlipleSelect"
          value={min}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          MenuProps={MenuProps}
        >
          {minutes.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


    </div>
  );
}

export default MultipleSelect;
