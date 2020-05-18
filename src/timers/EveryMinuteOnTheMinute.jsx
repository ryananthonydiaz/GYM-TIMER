import React, { useEffect, useState } from 'react';
import MultipleSelect from '../shared/MultipleSelect';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CountDown from '../shared/CountDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  const fontStyle = {
    width: '100vw',
    fontSize: '5rem',
    fontWeight: '100',
    color: 'white',
    textShadow: '0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0)',
  }
  return ({
    clock: {
      ...fontStyle,
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
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
  const [minutes, setMinutes] = useState(0);
  const [countDown, setCountDown] = useState(10);
  const [rounds, setRounds] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [countDownRunning, setCountDownRunning] = useState(false);

  const startClock = () => setClockRunning(true);

  const stopClock = () => setClockRunning(false);

  const resetClock = () => {
    setSeconds(0);
    setMinutes(0);
  }

  useEffect(() => {

  }, []);
  const matches = useMediaQuery('(max-width:600px)');
  let roundsStyled = (
    <div className={classes.rounds}>Rounds: {rounds}</div>
  );
  
  if (matches === true) {
    roundsStyled = (
      <div className={classes.rounds}>Rnds: {rounds}</div>
    );
  }

  const clock = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;

  const tMinus = <CountDown countDown={countDown} setCountDown={setCountDown} />;
  return (
    <>
      <Grid justify="center" container>
        <Grid item>
          {clockRunning ? roundsStyled : <MultipleSelect min={min} setMin={setMin} />}
        </Grid>
      </Grid>
      <div className={classes.clock}>
        {countDownRunning === true && countDown > 0 ? tMinus : clock}
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={startClock}>Start</Button>
          <Button className={classes.button} onClick={stopClock}>Stop</Button>
          <Button className={classes.button} onClick={resetClock}>Reset</Button>
        </div>
      </div>
    </>
  );
}

export default EveryMinuteOnTheMinute;
