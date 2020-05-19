import React, { useContext } from 'react';
import { Context as TimerContext } from './state/TimerContext';
import Timer from './timers/Timer';
import Menu from './menu/Menu';
import Interval from './timers/Interval';
import EveryMinuteOnTheMinute from './timers/EveryMinuteOnTheMinute';
import AsManyRoundsAsPossible from './timers/AsManyRoundsAsPossible';

function App() {
  const { state: { timer } } = useContext(TimerContext);
  let timerToDisplay = <Timer />;

  if (timer === 'STOP_WATCH') {
    timerToDisplay = <Timer />;
  } else if (timer === 'EMOM') {
    timerToDisplay = <EveryMinuteOnTheMinute />;
  } else if (timer === 'AMRAP') {
    timerToDisplay = <AsManyRoundsAsPossible />;
  } else if (timer === 'INTERVAL') {
    timerToDisplay = <Interval />;
  }

  return (
    <>
      <Interval />
      <Menu />
    </>
  );
}

export default App;
