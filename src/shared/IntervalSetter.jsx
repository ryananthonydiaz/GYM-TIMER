import React from 'react';
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
  title: {
    alignText: 'center',
  }
}));

function IntervalSetter({ workRest, setWorkRest, mins, setMins, secs, setSecs }) {
  const classes = useStyles();


  const handleWorkRestChange = event => setWorkRest(event.target.value);

  const handleMinsChange = event => {
    console.log(typeof event.target.value);
    console.log(event.target.value);
    setMins(event.target.value)
  };

  const handleSecsChange = event => {
    console.log(event.target.value)
    setSecs(event.target.value)
  };
  
  const minuteOptions = [];
  for (let minOpt = 0; minOpt <= 10; minOpt++) {
    minuteOptions.push(<option key={minOpt} value={minOpt}>{minOpt}</option>)
  }

  const secondOptions = [];
  for (let secOpt = 0; secOpt < 60; secOpt++) {
    if (secOpt % 5 === 0) {
      secondOptions.push(<option key={secOpt} value={secOpt}>{secOpt}</option>);
    }
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
            {minuteOptions}
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
            {secondOptions}
          </NativeSelect>
          <FormHelperText>Seconds for {workRest}</FormHelperText>
        </FormControl>
      </Grid>
    </>   
  );
}

export default IntervalSetter;
