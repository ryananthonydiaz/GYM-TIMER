import React from 'react';
import MultipleSelect from '../shared/MultipleSelect';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  clock: {
    // border: '1px solid white',
    width: '100vw',
    fontSize: '5rem',
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textShadow: '0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)',
    [theme.breakpoints.down('sm')]: {
      top: '30%',
      transform: 'translate(-50%, -30%)',
    },
  },
  buttons:  {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%)',
  },
  button: {
    margin: theme.spacing(0, 2),
  }
}));

function EveryMinuteOnTheMinute() {
  const classes = useStyles();

  return <>
  <MultipleSelect />
  <div className={classes.clock}>
    timer here
  <div className={classes.buttons}>
    <Button className={classes.button} onClick={() => console.log('start')}>Start</Button>
    <Button className={classes.button} onClick={() => console.log('stop')}>Stop</Button>
    <Button className={classes.button} onClick={() => console.log('reset')}>Reset</Button>
  </div>
</div>
</>
}

export default EveryMinuteOnTheMinute;
