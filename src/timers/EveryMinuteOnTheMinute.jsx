import React, { useEffect, useState } from 'react';
import MultipleSelect from '../shared/MultipleSelect';
import CountDown from '../shared/CountDown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  const fontStyle = {
    width: '100vw',
    fontSize: '10rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '5rem',
    },
    fontWeight: '100',
    color: 'white',
    textShadow: '0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)',
  }
  return ({
    clock: {
      ...fontStyle,
      textAlign: 'center',
    },
    timeLabel: {
      fontSize: '1rem',
    },
    button: {
      margin: theme.spacing(0, 2),
    },
    rounds: {
      fontSize: '5rem',
      margin: theme.spacing(0, 0, 6, 0),
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
      }
    },
  });
});

function EveryMinuteOnTheMinute() {
  const classes = useStyles();
  const [min, setMin] = useState('One');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [countDown, setCountDown] = useState(10);
  const [rounds, setRounds] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);

  const startClock = () => {
    // If the clock is paused/stopped at 00:00:00
    if (minutes > 0 && clockRunning === false) {
      setCountDownRunning(true)
      setCountDown(10);
      setClockRunning(true)
    } else {
      setClockRunning(true);
    }
  };  

  const stopClock = () => {
    if (countDownRunning === true) {
      setCountDownRunning(false);
    }

    setClockRunning(false);
  };

  const resetClock = () => {
    setSeconds(0);
    setEMOMAmount(min);
    setRounds(0);
    setCountDown(false);
    setClockRunning(false);
  }

  const setEMOMAmount = (minuteValue) => {
    setMin(minuteValue);

    switch (minuteValue) {
      case 'One':
        setMinutes(1);
        break;
      case 'Two':
        setMinutes(2);
        break;
      case 'Three':
        setMinutes(3);
        break;
      case 'Four':
        setMinutes(4);
        break;
      case 'Five':
        setMinutes(5);
        break;
      case 'Six':
        setMinutes(6);
        break;
      case 'Seven':
        setMinutes(7);
        break;
      case 'Eight':
        setMinutes(8);
        break;
        default:
          break;
    }
  }

  let roundsStyled = (
    <Grid justify="center" alignItems="center" className={classes.rounds} item container>
    <Grid item>
      <div>Completed Rounds: {rounds}</div>
    </Grid>
  </Grid>
  );

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
          if (minutes === 0) {
            setEMOMAmount(min);
            setRounds(rnds => rnds + 1);
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
  }, [min, minutes, seconds, clockRunning, countDown]);

  return (
    <>
      <Grid justify="center" className={classes.clock} container>
      <Grid justify="center" xs={12} item container>{countDownRunning === true && countDown > 0 ? tMinus : clock}</Grid>
        <Grid justify="center" item container>
          <Grid item><Button className={classes.button} onClick={startClock}>Start</Button></Grid>
          <Grid item><Button className={classes.button} onClick={stopClock}>Stop</Button></Grid>
          <Grid item><Button className={classes.button} onClick={resetClock}>Reset</Button></Grid>
        </Grid>
      </Grid>


      <Grid justify="center" container>
        <Grid item>
          {clockRunning ? roundsStyled : <MultipleSelect min={min} setMin={setEMOMAmount} />}
        </Grid>
      </Grid>
    </>
  );
}

export default EveryMinuteOnTheMinute;
