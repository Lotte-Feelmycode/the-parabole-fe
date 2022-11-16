import { useState, useEffect } from 'react';
import { isEmpty } from '@utils/functions';
import styled from '@emotion/styled';

export default function Timer({ endAt }) {
  let endDate = new Date(endAt);
  let now = new Date();

  if (isEmpty(endAt) || endDate.getTime() < now.getTime()) {
    return (
      <TimerContainer className="text-gray-600 font-bold text-3xl md:text-5xl mt-10">
        00:00
      </TimerContainer>
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
      <TimerContainer className="mt-10">
        <div className="text-6xl text-blue-600 ">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </TimerContainer>
    );
  }
}

const TimerContainer = styled.div`
  font-family: 'GmarketSans';
`;
