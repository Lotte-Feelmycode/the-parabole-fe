import { POST, GET } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventPrize from '@components/event/eventPrize';

export default function EventDetail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [eventDetail, setEventDetail] = useState([]);

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) setEventId(eventId);
    GET('/event', { eventId: eventId }).then((res) => {
      //console.log(res[0].eventPrizes);
      if (res[0].eventPrizes) {
        setEventDetail(res[0].eventPrizes);
        console.log(res);
        console.log(eventDetail);
        const productId = eventDetail.filter((product) => product.id);
        console.log(productId);
        POST('/eventprize', productId).then((result) => {
          if (result) {
            console.log(result);
          }
        });
      }
    });
  }, []);

  return (
    <ul>
      {/* {eventDetail && <EventPrize eventprize={eventPrizes} />}</ul> */}
    </ul>
  );
}
