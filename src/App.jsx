import React, { useState, useEffect } from 'react';
import StandardRunningClock from './timers/StandardRunningClock';

function App() {
  const [clockType, setClockType] = useState(<StandardRunningClock />);
  return (
    <>
      {clockType}
    </>
  );
}

export default App;
