import React, { useState, useEffect } from 'react';
import CountDown from '../shared/CountDown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
  button: {
    margin: theme.spacing(0, 2),
  },
  timeLabel: {
    fontSize: '1rem',
  },
}));

function Timer() {
  const classes = useStyles();
  const [clockRunning, setClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startClock = () => {
    // If the clock is paused/stopped at 00:00:00
    if (hours === 0 && minutes === 0 && seconds === 0 && clockRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setClockRunning(true)
    } else {
      setClockRunning(true);
    }
  }

  const stopClock = () => {
    if (countDownRunning === true) {
      setCountDownRunning(false);
    }

    setClockRunning(false);
  }

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setCountDown(false);
    setClockRunning(false)
  }

  const formattedHoursString = `${hours.toString().padStart(2, '0')}:`;
  const formattedMinutesString = `${minutes.toString().padStart(2, '0')}`;
  const formattedSecondsString = `:${seconds.toString().padStart(2, '0')}`;
  const clock = (
    <>
      <Grid justify="center" alignItems="flex-end" direction="column" xs={4} item container>
        <Grid item>{formattedHoursString}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Hours</Grid>
        </Grid>
      </Grid>
      <Grid justify="center" direction="column" xs={4} item container>
        <Grid item>{formattedMinutesString}</Grid>
        <Grid className={classes.timeLabel} item>Minutes</Grid>
      </Grid>
      <Grid justify="center" alignItems="flex-start" direction="column" xs={4} item container>
        <Grid item>{formattedSecondsString}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Seconds</Grid>
        </Grid>
      </Grid>
    </>
  );
  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;

  useEffect(() => {
    const clockLogic = () => {
      if (clockRunning === true) {
        if (seconds === 59) {
          if (minutes === 59) {
            setHours(hrs => hrs + 1);
            setMinutes(0);
            setSeconds(0);
            return;
          }
          setSeconds(0);
          setMinutes(mins => mins + 1);
        } else {
          setSeconds(secs => secs + 1);
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
      <Grid justify="center" className={classes.clock} container>
        <Grid justify="center" xs={12} item container>{countDownRunning === true && countDown > 0 ? tMinus : clock}</Grid>
        <Grid justify="center" item container>
          <Grid item><Button className={classes.button} onClick={startClock}>Start</Button></Grid>
          <Grid item><Button className={classes.button} onClick={stopClock}>Stop</Button></Grid>
          <Grid item><Button className={classes.button} onClick={reset}>Reset</Button></Grid>
        </Grid>
      </Grid>
  );
}

export default Timer;
