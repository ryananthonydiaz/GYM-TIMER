import React, { useState, useEffect } from 'react';
import CountDown from '../shared/CountDown';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

function StandardRunningClock() {
  const classes = useStyles();
  const [timerRunning, setTimerRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startClock = () => {
    // If the clock is paused/stopped at 00:00:00
    if (hours === 0 && minutes === 0 && seconds === 0 && timerRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setTimerRunning(true)
    } else {
      setTimerRunning(true);
    }
  }

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  const tenSecondCountDown = () => setCountDown(cntDown => cntDown - 1);

  const stopWatch = () => {
    if (timerRunning === true) {
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

  const clock = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;

  useEffect(() => {
    let stopWatchInterval = null;

    if (countDown === 0) {
      stopWatchInterval = setInterval(stopWatch, 1000);
    }

    return () => clearInterval(stopWatchInterval);
  }, [seconds, minutes, countDown, timerRunning]);

  return (
      <div className={classes.clock}>
        {countDownRunning === true && countDown > 0 ? tMinus : clock}
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={startClock}>Start</Button>
          <Button className={classes.button} onClick={() => setTimerRunning(false)}>Stop</Button>
          <Button className={classes.button} onClick={reset}>Reset</Button>
        </div>
      </div>
  );
}

export default StandardRunningClock;
