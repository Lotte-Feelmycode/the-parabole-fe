import { useState, useEffect } from 'react';
const Timer = ({ endAt }) => {
  let endDate = new Date(endAt);
  let now = new Date();

  if (endDate.getTime() - now.getTime() < 0) {
    return (
      <div className="text-rose-600 font-bold text-3xl md:text-5xl">
        이벤트 종료
      </div>
    );
  } else {
    let diffTMins = (endDate.getTime() - now.getTime()) / (1000 * 60);

    const [minutes, setMinutes] = useState(parseInt(diffTMins));
    const [seconds, setSeconds] = useState(parseInt(0));

    useEffect(() => {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds} 남음
      </div>
    );
  }
};

export default Timer;
