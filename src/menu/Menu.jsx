import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RepeatIcon from '@material-ui/icons/Repeat';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <RepeatIcon />, name: 'EMOM', timerType: 'EMOM' },
  { icon: <FitnessCenterIcon />, name: 'AMRAP', timerType: 'AMRAP' },
  { icon: <DirectionsRunIcon />, name: 'Interval', timerType: 'INTERVAL' },
  { icon: <TimerIcon />, name: 'Timer', timerType: 'TIMER' },
];

export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectTimer = (type) => {
    // set global state to specific timer component to be mounted
    handleClose()
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="Set timer type"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => selectTimer(action.timerType)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}