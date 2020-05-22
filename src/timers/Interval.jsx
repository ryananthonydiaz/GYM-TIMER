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
  restSettingSeconds: 0, // this value will be coming in as a string - must be converted to number
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

const resetState = () => initialState;

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
        restSettingSeconds: action.payload,
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
    case 'INCREMENT_ROUNDS':
      return {
        ...state,
        rounds: state.rounds + 1,
      };
    case 'SET_WORK_CLOCK_MINS':
      return {
        ...state,
        workClockMins: action.payload,
      };
    case 'DECREMENT_WORK_CLOCK_MINS':
      return {
        ...state,
        workClockMins: state.workClockMins - 1,
      };
    case 'DECREMENT_WORK_CLOCK_SECS':
      return {
        ...state,
        workClockSecs: state.workClockSecs - 1,
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
    case 'DECREMENT_REST_CLOCK_MINS':
      return {
        ...state,
        restClockMins: state.restClockMins - 1,
      };
    case 'DECREMENT_REST_CLOCK_SECS':
      return {
        ...state,
        restClockSecs: state.restClockSecs - 1,
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
    fontSize: '5rem',
    margin: theme.spacing(0, 0, 6, 0),
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    }
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

  const dispatchNewState = (type, payload) => dispatch({ type, payload });

  const initiateMins = (value) => {
    if (workRestDropDown === 'WORK') {
      dispatchNewState('SET_WORK_SETTING_MINS', value);
      dispatchNewState('SET_WORK_CLOCK_MINS', value);
    } else {
      dispatchNewState('SET_REST_SETTING_MINS', value);
      dispatchNewState('SET_REST_CLOCK_MINS', value);
    }
  }

  const initiateSecs = (value) => {
    if (workRestDropDown === 'WORK') {
      dispatchNewState('SET_WORK_SETTING_SECS', value);
      dispatchNewState('SET_WORK_CLOCK_SECS', parseInt(value));
    } else {
      dispatchNewState('SET_REST_SETTING_SECS', value);
      dispatchNewState('SET_REST_CLOCK_SECS', parseInt(value));
    }
  }

  const startClock = () => {
    if ((workSettingMinutes === 0 && workSettingSeconds === 0) ||(restSettingMinutes === 0 && restSettingSeconds === 0)) {
      return;
    }
    // If the clock is paused/stopped at 00:00:00
    if ((workClockMins === parseInt(workSettingMinutes) && workClockSecs === parseInt(workSettingSeconds)) && workClockRunning === false) {
      dispatchNewState('SET_COUNTDOWN_RUNNING', true);
      dispatchNewState('SET_COUNTDOWN', 10);
      dispatchNewState('SET_WORK_CLOCK_RUNNING', true);
    } else {
      dispatchNewState('SET_WORK_CLOCK_RUNNING', true);
    }
  }

  const stopClock = () => {
    if (countDownRunning === true) {
      dispatchNewState('SET_COUNTDOWN_RUNNING', false);
    }

    if (workClockRunning === true) {
      dispatchNewState('SET_WORK_CLOCK_RUNNING', false);
    }

    if (restClockRunning === true) {
      dispatchNewState('SET_REST_CLOCK_RUNNING', false);
    }
    dispatchNewState('SET_REST_CLOCK_MINS', parseInt(restSettingMinutes));
    dispatchNewState('SET_REST_CLOCK_SECS', parseInt(restSettingSeconds));    
  };

  const reset = () => {
    dispatchNewState('SET_WORK_CLOCK_MINS', parseInt(workSettingMinutes));

    dispatchNewState('SET_WORK_CLOCK_SECS', parseInt(workSettingSeconds));
    dispatchNewState('SET_REST_CLOCK_MINS', parseInt(restSettingMinutes));

    dispatchNewState('SET_REST_CLOCK_SECS', parseInt(restSettingSeconds));
    dispatchNewState('SET_ROUNDS', 0);
    dispatchNewState('SET_WORK_CLOCK_RUNNING', false);
  }

  let roundsStyled = (
    <Grid className={classes.rounds} item>Completed Rounds: {rounds}</Grid>
  );
  
  const matches = useMediaQuery('(max-width:700px)');
  if (matches === true) {
    roundsStyled = (
      <Grid item>
        <div className={classes.rounds}>Completed Rounds: {rounds}</div>
      </Grid>
    );
  }

  const tMinus = <CountDown countDown={countDown} setCountDown={(value) => dispatchNewState('SET_COUNTDOWN', value)} />;
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
      setWorkRest={(setting) => dispatchNewState('SET_WORK_REST_DROP_DOWN', setting)}
      mins={workRestDropDown === 'WORK' ? workSettingMinutes : restSettingMinutes}
      setMins={initiateMins}
      secs={workRestDropDown === 'WORK' ? workSettingSeconds : restSettingSeconds}
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
            dispatchNewState('SET_REST_CLOCK_RUNNING', true);
            dispatchNewState('SET_WORK_CLOCK_RUNNING', false);
            dispatchNewState('SET_WORK_CLOCK_MINS', workSettingMinutes);
            dispatchNewState('SET_WORK_CLOCK_SECS', workSettingSeconds);

            dispatchNewState('INCREMENT_ROUNDS');
            return;
          }
          dispatchNewState('SET_WORK_CLOCK_SECS', 59);
          dispatchNewState('DECREMENT_WORK_CLOCK_MINS');
        } else {
          dispatchNewState('DECREMENT_WORK_CLOCK_SECS');
        }
      } else {
        // rest clock logic (use logic from above)
        if (restClockSecs === 0) {
          if (restClockMins === 0) {
            dispatchNewState('SET_WORK_CLOCK_RUNNING', true);
            dispatchNewState('SET_REST_CLOCK_RUNNING', false);
            dispatchNewState('SET_REST_CLOCK_MINS', restSettingMinutes);
            dispatchNewState('SET_REST_CLOCK_SECS', restSettingSeconds);
            return;
          }
          dispatchNewState('SET_REST_CLOCK_SECS', 59);
          dispatchNewState('DECREMENT_REST_CLOCK_MINS');
        } else {
          dispatchNewState('DECREMENT_REST_CLOCK_SECS');
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
      <Grid justify="center" alignItems="center" container>
        <Grid item>
          {intervalRunning ? roundsStyled : intervalSetterComponent}
        </Grid>
      </Grid>
    </>
  );
}

export default Interval;
