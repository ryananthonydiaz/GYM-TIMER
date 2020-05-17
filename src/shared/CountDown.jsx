import React, { useEffect, useState } from 'react';

function StandardRunningClock({ countDown, setCountDown }) {
  const tenSecondCountDown = () => setCountDown(cntDown => cntDown - 1);
  const [countDownLabel, setCountDownLabel] = useState('')

  useEffect(() => {
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
