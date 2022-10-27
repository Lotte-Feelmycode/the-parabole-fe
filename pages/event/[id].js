import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/EventPrize';
import CommerceLayout from '@components/common/CommerceLayout';

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
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div
            className="event-detail-startAt"
            style={{ fontSize: 'xx-large', padding: '10px' }}
          >
            {eventInfo && eventInfo.title}
          </div>
          <div
            className="event-detail-startAt"
            style={{ fontSize: 'large', padding: '10px' }}
          >
            {'응모 기간 : '}
            {getDateTime(eventInfo.startAt)}
            {' ~ '}
            {getDateTime(eventInfo.endAt)}
          </div>
          <div className="event-detail-img" style={{ marginBottom: '100px' }}>
            <img src={eventImage.eventDetailImg} style={{ width: '100%' }} />
          </div>

          <EventPrizeListSection className="prize-list">
            {eventPrizes &&
              eventPrizes.map((prize) => {
                return (
                  <EventPrize
                    prize={prize}
                    eventId={eventId}
                    applyStatus={applyStatus}
                    key={prize.eventPrizeId}
                  />
                );
              })}
          </EventPrizeListSection>
        </div>
      </section>
    </CommerceLayout>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
