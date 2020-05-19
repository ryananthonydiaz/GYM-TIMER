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
  restClock: {
    color: 'red',
  },
  rounds: {
    fontSize: '2rem',
  },
  gridItem: {
    alignSelf: 'center',
  },
  button: {
    margin: theme.spacing(0, 2),
  }
}));

function Interval() {
  const classes = useStyles();

  // State for interval setter component
  const [workRest, setWorkRest] = useState('WORK');
  const [workMins, setWorkMins] = useState(0);
  const [workSecs, setWorkSecs] = useState(0);
  const [restMins, setRestMins] = useState(0);
  const [restSecs, setRestSecs] = useState(0);

  const [workClockRunning, setWorkClockRunning] = useState(false);
  const [restClockRunning, setRestClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);

  const [countDown, setCountDown] = useState(10);
  const [rounds, setRounds] = useState(0);

  const [workClockMins, setWorkClockMins] = useState(0);
  const [workClockSecs, setWorkClockSecs] = useState(0);

  const [restClockMins, setRestClockMins] = useState(0);
  const [restClockSecs, setRestClockSecs] = useState(0);

  const initiateMins = (value) => {
    if (workRest === 'WORK') {
      setWorkMins(value);
      setWorkClockMins(value);
    } else {
      setRestMins(value);
      setRestClockMins(value);
    }
  }

  const initiateSecs = (value) => {
    if (workRest === 'WORK') {
      setWorkSecs(value);
      setWorkClockSecs(value);
    } else {
      setRestSecs(value);
      setRestClockSecs(value);
    }
  }

  const startClock = () => {
    if ((workMins === 0 && workSecs === 0) ||(restMins === 0 && restSecs === 0)) {
      return;
    }
    // If the clock is paused/stopped at 00:00:00
    if (workMins > 0 || workSecs > 0 && workClockRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setWorkClockRunning(true)
    } else {
      setWorkClockRunning(true);
    }
  }

  // const stopClock = () => {
  //   if (countDownRunning === true) {
  //     setCountDownRunning(false);
  //   }

  //   setClockRunning(false);
  // }

  // const reset = () => {
  //   setMinutes(0);
  //   setSeconds(0);
  //   setCountDown(false);
  //   setClockRunning(false)
  // }

  let roundsStyled = (
    <Grid className={classes.rounds} item>Rounds: {rounds}</Grid>
  );
  
  const matches = useMediaQuery('(max-width:600px)');
  if (matches === true) {
    roundsStyled = (
      <div className={classes.rounds}>Rnds: {rounds}</div>
    );
  }

  const workClock = `${workClockMins.toString().padStart(2, '0')} : ${workClockSecs.toString().padStart(2, '0')}`;
  const restClock = `${restClockMins.toString().padStart(2, '0')} : ${restClockSecs.toString().padStart(2, '0')}`;
  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;

  const intervalSetterComponent = (
    <IntervalSetter
      workRest={workRest}
      setWorkRest={setWorkRest}
      mins={workRest === 'WORK' ? workMins : restMins}
      setMins={initiateMins}
      secs={workRest === 'WORK' ? workSecs : restSecs}
      setSecs={initiateSecs} 
    />
  );

  useEffect(() => {
    const clockLogic = () => {
      if (workClockRunning === true) {
        if (workClockSecs === 0) {
          // Interval is complete if next if is true
          if (workClockMins === 0) {
            // set rest clock running to true and reset the work clock to the top of the interval add 1 to rounds
            setRestClockRunning(true);
            setWorkClockRunning(false);
            setWorkClockMins(workMins);
            setWorkClockSecs(workSecs);

            setRounds(rnds => rnds + 1);
            return;
          }
          setWorkClockSecs(59);
          setWorkClockMins(mins => mins - 1);
        } else {
          setWorkClockSecs(secs => secs - 1);
        }
      } else {
        // rest clock logic (use logic from above)
        if (restClockSecs === 0) {
          if (restClockMins === 0) {
            setWorkClockRunning(true);
            setRestClockRunning(false);
            setRestClockMins(restMins);
            setRestClockSecs(restSecs);
            return;
          }
          setRestClockSecs(59);
          setRestClockMins(mins => mins - 1);
        } else {
          setRestClockSecs(secs => secs - 1);
        }
      }
    }

    let clockInterval = null;

    if (countDown === 0) {
      clockInterval = setInterval(clockLogic, 1000);
    }

    return () => clearInterval(clockInterval);
  }, [workClockSecs, workClockMins, restClockSecs, restClockMins, countDown, workClockRunning, restClockRunning]);


  return (
    <>
      <div className={classes.clock}>
        <div className={restClockRunning && classes.restClock}>
          {countDownRunning === true && countDown > 0 ? tMinus : (restClockRunning ? restClock : workClock)}
        </div>
        <div className={classes.rounds}>Rounds: {rounds}</div>
        <div>
          <Button className={classes.button} onClick={startClock}>Start</Button>
          <Button className={classes.button} onClick={() => null}>Stop</Button>
          <Button className={classes.button} onClick={() => null}>Reset</Button>
        </div>
      </div>
      <Grid justify="center" container>
          {intervalSetterComponent}
      </Grid>
    </>
  );
}

export default Interval;
