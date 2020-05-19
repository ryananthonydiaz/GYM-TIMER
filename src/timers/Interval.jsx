import React, { useState, useEffect } from 'react';
import CountDown from '../shared/CountDown';
import IntervalSetter from '../shared/IntervalSetter';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  gridItem: {
    alignSelf: 'center',
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

function Interval() {
  const classes = useStyles();
  const [workRest, setWorkRest] = useState('WORK');
  const [workMins, setWorkMins] = useState(0);
  const [workSecs, setWorkSecs] = useState(0);
  const [restMins, setRestMins] = useState(0);
  const [restSecs, setRestSecs] = useState(0);

  const setIntervalMins = () => {
    if (workRest === 'WORK') {
      // set work time
    } else {
      // set rest time
    }
  }

  const [clockRunning, setClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);
  const [countDown, setCountDown] = useState(10);
  const [rounds, setRounds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const startClock = () => {
    // If the clock is paused/stopped at 00:00:00
    if (minutes === 0 && seconds === 0 && clockRunning === false) {
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
    setMinutes(0);
    setSeconds(0);
    setCountDown(false);
    setClockRunning(false)
  }

  let roundsStyled = (
    <Grid className={classes.rounds} item>Rounds: {rounds}</Grid>
  );
  
  const matches = useMediaQuery('(max-width:600px)');
  if (matches === true) {
    roundsStyled = (
      <div className={classes.rounds}>Rnds: {rounds}</div>
    );
  }

  const clock = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;

  const intervalSetterComponent = (
    <IntervalSetter
      workRest={workRest}
      setWorkRest={setWorkRest}
      mins={workRest === 'WORK' ? workMins : restMins}
      setMins={workRest === 'WORK' ? setWorkMins : setRestMins}
      secs={workRest === 'WORK' ? workSecs : restSecs}
      setSecs={workRest === 'WORK' ? setWorkSecs : setRestSecs} 
    />
  );

  useEffect(() => {
    const clockLogic = () => {
      if (clockRunning === true) {
        if (seconds === 59) {
          if (minutes === 59) {
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

  console.log(`type: ${workRest}`);
  console.log(`work mins: ${workMins}`);
  console.log(`work secs: ${workSecs}`);

  console.log(`rest mins: ${restMins}`);
  console.log(`rest secs: ${restSecs}`);

  return (
    <>
      <Grid justify="center" container>
          {clockRunning ? roundsStyled : intervalSetterComponent}
      </Grid>
      <div className={classes.clock}>
        {countDownRunning === true && countDown > 0 ? tMinus : clock}
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={startClock}>Start</Button>
          <Button className={classes.button} onClick={stopClock}>Stop</Button>
          <Button className={classes.button} onClick={reset}>Reset</Button>
        </div>
      </div>
    </>
  );
}

export default Interval;
