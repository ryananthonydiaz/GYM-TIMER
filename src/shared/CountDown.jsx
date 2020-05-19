import React, { useEffect, useState } from 'react';

function StandardRunningClock({ countDown, setCountDown }) {
  const [countDownLabel, setCountDownLabel] = useState('')

  useEffect(() => {
    const tenSecondCountDown = () => setCountDown(cntDown => cntDown - 1);
    
    let countDownInterval = setInterval(tenSecondCountDown, 1000);
    setCountDownLabel(`${countDown.toString().padStart(2, '0')}`);
    if (countDown === 0) {
      clearInterval(countDownInterval);
      setCountDownLabel('');
    }

    return () => clearInterval(countDownInterval);
  }, [countDown]);
  return (
  <div>{countDownLabel}</div>
  );
}

export default StandardRunningClock;
