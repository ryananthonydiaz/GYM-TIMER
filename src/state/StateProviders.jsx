import React from 'react';
import { Provider as TimerProvider } from './TimerContext';

const StateProviders = ({ children }) => {
  return (
    <TimerProvider>
      {children}
    </TimerProvider>
  );
}

export default StateProviders;
