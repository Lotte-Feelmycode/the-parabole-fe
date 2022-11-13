import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/eventPrize';
import CommerceLayout from '@components/common/CommerceLayout';

import EventInfo from '@components/event/EvenInfo';
import EventPrizeContainer from '@components/event/EventPrizeContainer';

export default function EventDetail() {
  //TODO userId 객체 받아오기
  const userId = 3;

  const [eventInfo, setEventInfo] = useState({});
  const [eventImage, setEventImage] = useState({});
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [eventPrizes, setEventPrizes] = useState([]);
  const [applyStatus, setApplyStatus] = useState('');

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) setEventId(eventId);

    GET_DATA(`/event/${eventId}`).then((res) => {
      if (res) {
        setEventInfo(res);
        setEventImage(res.eventImage);
        setEventPrizes(res.eventPrizes);

        if (res.status !== 1) {
          setApplyStatus('disabled');
        }
      }
    });
  }, [router.query]);

  useEffect(() => {
    POST_DATA('/event/participant/check', {
      userId,
      eventId,
    }).then((res) => {
      if (!res) {
        setApplyStatus('disabled');
      }
    });
  }, []);

  return (
    <CommerceLayout>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
          <svg className="w-screen" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
        </svg>
      </div>
      <main className="flex-grow">
        <EventInfo eventInfo={eventInfo} eventImage={eventImage} />
        <EventPrizeContainer
          eventPrizes={eventPrizes}
          eventType={eventInfo.type}
        ></EventPrizeContainer>
      </main>
    </CommerceLayout>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
