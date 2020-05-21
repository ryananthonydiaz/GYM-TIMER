import React, { useState, useEffect, useReducer } from 'react';
import CountDown from '../shared/CountDown';
import IntervalSetter from '../shared/IntervalSetter';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
  workRestDropDown: 'WORK',
  workSettingMinutes: 0, // this value will be coming in as a string - must be converted to number
  workSettingSeconds: 0, // this value will be coming in as a string - must be converted to number
  restSettingMinutes: 0, // this value will be coming in as a string - must be converted to number
  restSettingsSeconds: 0, // this value will be coming in as a string - must be converted to number
  workClockRunning: false,
  restClockRunning: false,
  countDownRunning: false,
  countDown: 10,
  rounds: 0,
  workClockMins: 0,
  workClockSecs: 0,
  restClockMins: 0,
  restClockSecs: 0,
};

function intervalReducer(state, action) {
  switch (action.type) {
    case 'SET_WORK_REST_DROP_DOWN':
      return {
        ...state,
        workRestDropDown: action.payload,
      };
    case 'SET_WORK_SETTING_MINS':
      return {
        ...state,
        workSettingMinutes: action.payload,
      };
    case 'SET_WORK_SETTING_SECS':
      return {
        ...state,
        workSettingSeconds: action.payload,
      };
    case 'SET_REST_SETTING_MINS':
      return {
        ...state,
        restSettingMinutes: action.payload,
      };
    case 'SET_REST_SETTING_SECS':
      return {
        ...state,
        restSettingsSeconds: action.payload,
      };
    case 'SET_WORK_CLOCK_RUNNING':
      return {
        ...state,
        workClockRunning: action.payload,
      };
    case 'SET_REST_CLOCK_RUNNING':
      return {
        ...state,
        restClockRunning: action.payload,
      };
    case 'SET_COUNTDOWN_RUNNING':
      return {
        ...state,
        countDownRunning: action.payload,
      };
    case 'SET_COUNTDOWN':
      return {
        ...state,
        countDown: action.payload,
      };
    case 'SET_ROUNDS':
      return {
        ...state,
        rounds: action.payload,
      };
    case 'SET_WORK_CLOCK_MINS':
      return {
        ...state,
        workClockMins: action.payload,
      };
    case 'SET_WORK_CLOCK_SECS':
      return {
        ...state,
        workClockSecs: action.payload,
      };
    case 'SET_REST_CLOCK_MINS':
      return {
        ...state,
        restClockMins: action.payload,
      };
    case 'SET_REST_CLOCK_SECS':
      return {
        ...state,
        restClockSecs: action.payload,
      };
      default:
        throw new Error();
  }
}

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

  const [state, dispatch] = useReducer(intervalReducer, initialState);
  const {
    workRestDropDown,
    workSettingMinutes,
    workSettingSeconds,
    restSettingMinutes,
    restSettingSeconds,
    workClockRunning,
    restClockRunning,
    countDownRunning,
    countDown,
    rounds,
    workClockMins,
    workClockSecs,
    restClockMins,
    restClockSecs,
  } = state;

  console.log(state)

  const initiateMins = (value) => {
    if (workRestDropDown === 'WORK') {
      dispatch({ type: 'SET_WORK_SETTING_MINS', payload: value });
      dispatch({ type: 'SET_WORK_CLOCK_MINS', payload: value });
    } else {
      dispatch({ type: 'SET_REST_SETTING_MINS', payload: value });
      dispatch({ type: 'SET_REST_CLOCK_MINS', payload: value });
    }

    reset();
  }

  const initiateSecs = (value) => {
    if (workRestDropDown === 'WORK') {
      dispatch({ type: 'SET_WORK_SETTING_SECS', payload: value });
      dispatch({ type: 'SET_WORK_CLOCK_SECS', payload: value });
    } else {
      dispatch({ type: 'SET_REST_SETTING_SECS', payload: value });
      dispatch({ type: 'SET_REST_CLOCK_SECS', payload: value });
    }

    reset();
  }

  const startClock = () => {
    if ((workSettingMinutes === 0 && workSettingSeconds === 0) ||(restMins === 0 && restSecs === 0)) {
      return;
    }
    // If the clock is paused/stopped at 00:00:00
    if ((workClockMins === workSettingMinutes && workClockSecs === workSettingSeconds) && workClockRunning === false) {
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
    setWorkClockMins(workSettingMinutes);
    setWorkClockSecs(workSettingSeconds);
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
      workRest={workRestDropDown}
      setWorkRest={setWorkRest}
      mins={workRest === 'WORK' ? workSettingMinutes : restSettingMinutes}
      setMins={initiateMins}
      secs={workRest === 'WORK' ? workSettingSeconds : restSettingSeconds}
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
            setWorkClockMins(workSettingMinutes);
            setWorkClockSecs(workSettingSeconds);

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
