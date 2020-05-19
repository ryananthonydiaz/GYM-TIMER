import React, { useState, useEffect } from 'react';
import CountDown from '../shared/CountDown';
import AmrapSlider from '../shared/AmrapSlider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  clock: {
    // border: '1px solid white',
    width: '100vw',
    fontSize: '10rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '5rem',
    },
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
    textShadow: '0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)',
  },
  timeLabel: {
    fontSize: '1rem',
  },
  button: {
    margin: theme.spacing(0, 2),
  }
}));

function AsManyRoundsAsPossible() {
  const classes = useStyles();
  const [amrap, setAMRAP] = useState(0);

  const [clockRunning, setClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const setSliderAndMinutes = (value) => {
    setAMRAP(value);
    setMinutes(value);
    setSeconds(0);
    setClockRunning(false);
    if (countDownRunning === true) {
      setCountDownRunning(false);
    }
  }

  const startClock = () => {
    if (countDownRunning === true || amrap === 0) {
      return;
    }
    // If the clock is paused/stopped at 00:00:00
    if (minutes > 0 && seconds === 0 && clockRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setClockRunning(true)
    } else {
      setClockRunning(true);
    }
  }

  const stopClock = () => {
    setClockRunning(false);
    setCountDownRunning(false);
  }

  const reset = () => {
    setSeconds(0);
    setMinutes(amrap);
    setCountDown(false);
    setClockRunning(false);
  }

  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;
  const formattedMinutesString = `${minutes.toString().padStart(2, '0')}`;
  const formattedSecondsString = `${seconds.toString().padStart(2, '0')}`;
  const clock = (
    <>
      <Grid justify="center" alignItems="flex-end" direction="column" xs={4} item container>
        <Grid item>{formattedMinutesString}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Minutes</Grid>
        </Grid>
      </Grid>
      <Grid justify="center" direction="column" xs={4} item container>
        <Grid item>:</Grid>
      </Grid>
      <Grid justify="center" alignItems="flex-start" direction="column" xs={4} item container>
        <Grid item>{formattedSecondsString}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Seconds</Grid>
        </Grid>
      </Grid>
    </>
  );

  useEffect(() => {
    const clockLogic = () => {
      if (clockRunning === true) {
        if (seconds === 0) {
          // Time is up so don't do anything
          if (minutes === 0) {
            setClockRunning(false);
            setAMRAP(0);
            return;
          }
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(secs => secs - 1);
        }
      }
    }
    
    let clockInterval = null;

    if (countDown === 0) {
      clockInterval = setInterval(clockLogic, 1000);
    }

    return () => clearInterval(clockInterval);
  }, [seconds, minutes, countDown, clockRunning]);

  return (
    <>
      <Grid className={classes.clock} container>
      <Grid justify="center" xs={12} item container>{countDownRunning === true && countDown > 0 ? tMinus : clock}</Grid>
        <Grid justify="center" item container>
          <Grid item><Button className={classes.button} onClick={startClock}>Start</Button></Grid>
          <Grid item><Button className={classes.button} onClick={stopClock}>Stop</Button></Grid>
          <Grid item><Button className={classes.button} onClick={reset}>Reset</Button></Grid>
        </Grid>
      </Grid>
      <Grid justify="center" alignContent="center" container>
        <Grid item>
          <AmrapSlider amrap={amrap} setAMRAP={setSliderAndMinutes} />
        </Grid>
      </Grid>
    </>
  );
}

export default AsManyRoundsAsPossible;
