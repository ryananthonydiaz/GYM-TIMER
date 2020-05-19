import React, { useEffect, useState } from 'react';
import MultipleSelect from '../shared/MultipleSelect';
import CountDown from '../shared/CountDown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
    button: {
      margin: theme.spacing(0, 2),
    },
    rounds: {
      ...fontStyle,
      color: 'red',
      textAlign: 'center',
      textShadow: '',
    }
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
    <div className={classes.rounds}>Rounds: {rounds}</div>
  );
  
  const matches = useMediaQuery('(max-width:600px)');
  if (matches === true) {
    roundsStyled = (
      <div className={classes.rounds}>Rnds: {rounds}</div>
    );
  }

  const clock = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;

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
  }, [minutes, seconds, clockRunning, countDown]);

  return (
    <>
      <div className={classes.clock}>
        {countDownRunning === true && countDown > 0 ? tMinus : clock}
        <div>
          <Button className={classes.button} onClick={startClock}>Start</Button>
          <Button className={classes.button} onClick={stopClock}>Stop</Button>
          <Button className={classes.button} onClick={resetClock}>Reset</Button>
        </div>
      </div>
      <Grid justify="center" container>
        <Grid item>
          {clockRunning ? roundsStyled : <MultipleSelect min={min} setMin={setEMOMAmount} />}
        </Grid>
      </Grid>
    </>
  );
}

export default EveryMinuteOnTheMinute;
