import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import EventPrize from '@components/event/EventPrize';
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
        <main className="flex-grow">
          <EventInfo eventInfo={eventInfo} eventImage={eventImage}/>
          <EventPrizeContainer eventPrizes={eventPrizes}></EventPrizeContainer>
        </main>
    </CommerceLayout>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
