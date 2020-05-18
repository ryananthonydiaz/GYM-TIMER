import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '50vw',
    [theme.breakpoints.down('md')]: {
      width: '80vw'
    }
  },
}));

export default function TimePickers() {
  const classes = useStyles();
  const [workRest, setWorkRest] = useState('WORK');
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const handleWorkRestChange = event => setWorkRest(event.target.value);

  const handleMinsChange = event => setMins(event.target.value);

  const handleSecsChange = event => setSecs(event.target.value);
  
  const timeOptions = [];

  for (let opt = 0; opt <= 10; opt++) {
    timeOptions.push(<option key={opt} value={opt}>{opt}</option>)
  }
  return (
    <>
      <Grid className={classes.gridItem} item>
      <FormControl className={classes.formControl}>
        <InputLabel>Choose what you would like to set</InputLabel>
        <NativeSelect
          value={workRest}
          onChange={handleWorkRestChange}
        >
          <option value={'WORK'}>Work Time</option>
          <option value={'REST'}>Rest Time</option>
        </NativeSelect>
        <FormHelperText>{workRest} is ready to be set</FormHelperText>
      </FormControl>
      </Grid>

      <Grid className={classes.gridItem} item>
      <FormControl className={classes.formControl}>
        <InputLabel>Set Minutes</InputLabel>
        <NativeSelect
          value={mins}
          onChange={handleMinsChange}
        >
          {timeOptions}
        </NativeSelect>
        <FormHelperText>Minutes for {workRest}</FormHelperText>
      </FormControl>
      </Grid>

      <Grid item>
      <FormControl className={classes.formControl}>
        <InputLabel>Set Seconds</InputLabel>
        <NativeSelect
          value={secs}
          onChange={handleSecsChange}
        >
          {timeOptions}
        </NativeSelect>
        <FormHelperText>Seconds for {workRest}</FormHelperText>
      </FormControl>
      </Grid>
    </>   
  );
}