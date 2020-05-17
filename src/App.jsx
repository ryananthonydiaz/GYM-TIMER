import React, { useState } from 'react';
import StandardRunningClock from './timers/StandardRunningClock';
import Menu from './menu/Menu';

function App() {
  const [clockType, setClockType] = useState(<StandardRunningClock />);
  return (
    <>
      {clockType}
      <Menu />
    </>
  );
}

export default App;
