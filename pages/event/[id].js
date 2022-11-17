import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import CommerceLayout from '@components/common/CommerceLayout';
import EventInfo from '@components/event/EvenInfo';
import EventPrizeContainer from '@components/event/EventPrizeContainer';
import SiteHead from '@components/common/SiteHead';
import { useGetToken } from '@hooks/useGetToken';

export default function EventDetail() {
  const [eventInfo, setEventInfo] = useState({});
  const [eventImage, setEventImage] = useState({});
  const router = useRouter();
  const [eventId, setEventId] = useState(router.query.id);
  const [storeInfo, setStoreInfo] = useState();

  const [eventPrizes, setEventPrizes] = useState([]);

  const [headers, setHeaders] = useState();
  useEffect(() => {
    let getHeaders = useGetToken();
    setHeaders(getHeaders);
  }, []);

  useEffect(() => {
    const eventId = router.query.id;
    if (eventId) setEventId(eventId);

    GET_DATA(`/event/${eventId}`).then((res) => {
      if (res) {
        setEventInfo(res);
        setEventImage(res.eventImage);
        setEventPrizes(res.eventPrizes);

        GET_DATA('/seller', { sellerId: res.sellerId }).then((res) => {
          if (res) {
            setStoreInfo(res);
          }
        });
      }
    });
  }, [router.query]);
  return (
    <CommerceLayout>
      <SiteHead
        title={eventInfo.title}
        description={eventInfo.descript}
        url={`https://theparabole.shop/${eventId}`}
      />
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-screen"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
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
        <EventInfo
          eventInfo={eventInfo}
          eventImage={eventImage}
          storeInfo={storeInfo}
        />
        <EventPrizeContainer
          eventId={eventId}
          eventPrizes={eventPrizes}
          eventType={eventInfo.type}
          eventStatus={eventInfo.status}
          headers={headers}
        />
      </main>
    </CommerceLayout>
  );
}
