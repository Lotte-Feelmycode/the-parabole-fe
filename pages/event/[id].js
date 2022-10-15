import { GET_DATA } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventPrize from '@components/event/EventPrize';
import CommerceLayout from '@components/common/CommerceLayout';
import { getTime } from '@utils/functions';

export default function EventDetail() {
  const [eventInfo, setEventInfo] = useState([]);
  const [eventImage, setEventImage] = useState([]);
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [eventDetail, setEventDetail] = useState([]);

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) {
      GET_DATA(`/event/${eventId}`).then((res) => {
        if (res) {
          setEventInfo(res);
          setEventImage(res.eventImage);
          setEventDetail(res.eventPrizes);
          setEventId(eventId);
        }
      });
    }
  }, [router.query]);

  return (
    <CommerceLayout>
      <section className="flex min-h-screen flex-col text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="event-detail-startAt">
            {getTime(eventInfo.startAt)} ~ {getTime(eventInfo.endAt)}
          </div>
          <div className="event-detail-img">
            <img src={eventImage.eventDetailImg} style={{ width: '100%' }} />
          </div>
          <div className="event-detail-descript">{eventInfo.descript}</div>

          <div className="flex flex-wrap">
            {eventDetail &&
              eventDetail.map((event) => (
                <div key={event.eventPrizeId} className="xl:w-1/3 md:w-1/2 p-4">
                  <EventPrize event={event} eventId={eventId} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </CommerceLayout>
  );
}
