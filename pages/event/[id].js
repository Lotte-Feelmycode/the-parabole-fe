import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA, POST_DATA } from '@apis/defaultApi';
import { getDateTime } from '@utils/functions';
import EventPrize from '@components/event/EventPrize';
import CommerceLayout from '@components/common/CommerceLayout';
import * as btn from '@components/input/Button';
import { motion } from "framer-motion";
import ScrollAnimation from '@components/ui/ScrollAnimation';
import ScrollAnimationWrapper from '@components/ui/ScrollAnimationWrapper';

export default function EventDetail() {
  const scrollAnimation = useMemo(() => ScrollAnimation(100, 0, 2), []);
  const eventImgAnimation = useMemo(() => ScrollAnimation(50, 0, 4), []);
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
      <section className="flex min-h-screen flex-col">
        <ScrollAnimationWrapper className="flex w-full justify-end">
            <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
                <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
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
            </motion.div>
          </ScrollAnimationWrapper>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <H1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                {eventInfo.descript}
                <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">{eventInfo.title}</span>
              </H1>
              <div className="max-w-3xl mx-auto">
                <p className="text-2xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">{eventInfo.storeName}에서 {getDateTime(eventInfo.startAt)} ~ {getDateTime(eventInfo.endAt)}동안 진행하는 이벤트!</p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <div>
                    <btn.Blue buttonText={"상품 더 보러가기"}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          <ScrollAnimationWrapper className="flex w-full justify-end">
            <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
              <img
                src={eventImage.eventDetailImg}
                layout="responsive"
              />
            </motion.div>
            </ScrollAnimationWrapper>

            {/* <img src={eventImage.eventDetailImg}></img> */}
          </div>
        </div>
        {/* <div className="container px-5 py-24 mx-auto">
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
        </div> */}
      </section>
    </CommerceLayout>
  );
}

const EventPrizeListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const H1 = styled.h1`
  font-size: 80px;
  margin-bottom: 30px;
  font-family: 'AppleSDGothicNeoB';
`;