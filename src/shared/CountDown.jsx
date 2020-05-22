import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  timeLabel: {
    fontSize: '1rem',
  },
});

function CountDown({ countDown, setCountDown }) {
  const classes = useStyles();
  const [countDownLabel, setCountDownLabel] = useState('');

  const memoizedSetCountDown = useCallback(() => setCountDown(cntDwn => cntDwn - 1), [setCountDown]);

  useEffect(() => {
    let countDownInterval = setInterval(memoizedSetCountDown, 1000);
    setCountDownLabel(`${countDown.toString().padStart(2, '0')}`);
    if (countDown === 0) {
      clearInterval(countDownInterval);
      setCountDownLabel('');
    }

    return () => clearInterval(countDownInterval);
  }, [countDown, memoizedSetCountDown]);

  return (
    <Grid justify="center" alignItems="center" direction="column" xs={4} item container>
      <Grid item>{countDownLabel}</Grid>
      <Grid justify="center" item container>
        <Grid className={classes.timeLabel} item>Countdown</Grid>
      </Grid>
    </Grid>
  );
}

export default CountDown;
