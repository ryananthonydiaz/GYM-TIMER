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
    margin: theme.spacing(0, 0, 6, 0),
  },
  gridItem: {
    alignSelf: 'center',
  },
  button: {
    margin: theme.spacing(0, 2),
  },
  timeLabel: {
    fontSize: '1rem',
  },
  restSignal: {
    testTransform: 'capitalize',
    fontSize: '1rem',
  },
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
      setWorkMins(() => value);
      setWorkClockMins(() => value);
    } else {
      setRestMins(() => value);
      setRestClockMins(() => value);
    }

    reset();
  }

  const initiateSecs = (value) => {
    if (workRest === 'WORK') {
      setWorkSecs(() => value);
      setWorkClockSecs(() => value);
    } else {
      setRestSecs(() => value);
      setRestClockSecs(() => value);
    }

    reset();
  }

  const startClock = () => {
    if ((workMins === 0 && workSecs === 0) ||(restMins === 0 && restSecs === 0)) {
      return;
    }
    // If the clock is paused/stopped at 00:00:00
    if ((workClockMins === workMins && workClockSecs === workSecs) && workClockRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setWorkClockRunning(true)
    } else {
      setWorkClockRunning(true);
    }
  }

  const stopClock = () => {
    if (countDownRunning === true) {
      setCountDownRunning(false);
    }

    if (workClockRunning === true) {
      setWorkClockRunning(false);
    }

    if (restClockRunning === true) {
      setRestClockRunning(false);
    }
  };

  const reset = () => {
    setWorkClockMins(workMins);
    setWorkClockSecs(workSecs);
    setRestClockMins(restMins);
    setRestClockSecs(restSecs);
    setRounds(0);
    setWorkClockRunning(false);
  }

  let roundsStyled = (
    <Grid className={classes.rounds} item>Completed Rounds: {rounds}</Grid>
  );
  
  const matches = useMediaQuery('(max-width:600px)');
  if (matches === true) {
    roundsStyled = (
      <Grid item>
        <div>Completed Rounds: {rounds}</div>
      </Grid>
    );
  }

  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;
  const formattedWorkMinutesString = `${workClockMins.toString().padStart(2, '0')}`;
  const formattedWorkSecondsString = `${workClockSecs.toString().padStart(2, '0')}`;
  const formattedRestMinutesString = `${restClockMins.toString().padStart(2, '0')}`;
  const formattedRestSecondsString = `${restClockSecs.toString().padStart(2, '0')}`;

  let minutesToDisplay;
  let secondsToDisplay;
  if (restClockRunning === true) {
    minutesToDisplay = formattedRestMinutesString;
    secondsToDisplay = formattedRestSecondsString;
  } else {
    minutesToDisplay = formattedWorkMinutesString;
    secondsToDisplay = formattedWorkSecondsString;
  }
  const clock = (
    <>
      <Grid justify="center" alignItems="flex-end" direction="column" xs={4} item container>
        <Grid item>{minutesToDisplay}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Minutes</Grid>
        </Grid>
      </Grid>
      <Grid justify="center" alignItems="center" direction="column" xs={4} item container>
        <Grid item>:</Grid>
      </Grid>
      <Grid justify="center" alignItems="flex-start" direction="column" xs={4} item container>
        <Grid item>{secondsToDisplay}</Grid>
        <Grid justify="center" item container>
          <Grid className={classes.timeLabel} item>Seconds</Grid>
        </Grid>
      </Grid>
    </>
  );

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

  const intervalRunning = workClockRunning || restClockRunning;

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
  }, [countDown, workClockSecs, workClockMins, workClockRunning, restClockSecs, restClockMins, restClockRunning]);

  let restClockStyles = '';
  if (restClockRunning === true) {
    restClockStyles = classes.restClock;
  }

  let roundsStyles = '';
  if (intervalRunning === true) {
    roundsStyles = classes.round;
  }

  return (
    <>
      <Grid className={classes.clock} container>
        <Grid justify="center" className={restClockStyles} xs={12} item container>
          {countDownRunning === true && countDown > 0 ? tMinus : clock}
        </Grid>
        <Grid justify="center" item container>
          <Grid item>
            <Button className={classes.button} onClick={startClock}>Start</Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} onClick={stopClock}>Stop</Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} onClick={reset}>Reset</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid justify="center" alignItems="center" className={roundsStyles} container>
        <Grid item>
          {intervalRunning ? roundsStyled : intervalSetterComponent}
        </Grid>
      </Grid>
    </>
  );
}

export default Interval;
