import { useState, useEffect } from "react";
import { getNewDate } from "@utils/functions";
const Timer = ({ endAt }) => {
  var endAt = new Date(endAt);
  var now = new Date();

  var diffTMins = (endAt.getTime() - now.getTime()) / (1000*60);

  const [minutes, setMinutes] = useState(parseInt(diffTMins));
  const [seconds, setSeconds] = useState(parseInt(0));

  console.log(parseInt(diffTMins));
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
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;