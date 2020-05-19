import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80vw',
    margin: theme.spacing(4, 0)
  },
}));

function AmrapSlider({ amrap, setAMRAP }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center" gutterBottom>
        AMRAP
      </Typography>
      <Slider
        value={amrap}
        aria-labelledby="slider"
        valueLabelDisplay="auto"
        onChange={(_, value) => setAMRAP(value)}
        marks
        step={1}
        min={0}
        max={60}
      />
    </div>
  );
}

export default AmrapSlider;
