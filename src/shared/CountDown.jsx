import React, { useEffect } from 'react';

function StandardRunningClock({ countDown, setCountDown }) {
  const tenSecondCountDown = () => setCountDown(cntDown => cntDown - 1);

  useEffect(() => {
    let countDownInterval = setInterval(tenSecondCountDown, 1000);
    if (countDown === 0) {
      clearInterval(countDownInterval);
    }

    return () => clearInterval(countDownInterval);
  }, [countDown]);
  return (
    <div>
      <p>{countDown.toString().padStart(2, '0')}</p>
    </div>
  );
}

export default StandardRunningClock;
