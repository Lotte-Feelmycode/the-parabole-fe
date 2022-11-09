import { useState, useEffect, useMemo } from 'react';
import * as btn from '@components/input/Button';
import { getDateTime } from '@utils/functions';
import styled from '@emotion/styled';

export default function EventInfo({ eventInfo, eventImage }) {
  return (
    <>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
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
            <circle cx="422" cy="443" r="12" />
          </g>
        </svg>
      </div>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <H1
                className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                {eventInfo.descript}
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  {eventInfo.title}
                </span>
              </H1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-2xl text-gray-600 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  {eventInfo.storeName}에서 {getDateTime(eventInfo.startAt)} ~{' '}
                  {getDateTime(eventInfo.endAt)}동안 진행하는 이벤트!
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div className="animate-pulse">
                    <btn.Blue buttonText={'상품 더 보러가기'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={eventImage.eventDetailImg} layout="responsive" />
          </div>
        </div>
      </section>
    </>
  );
}

const H1 = styled.h1`
  font-size: 80px;
  margin-bottom: 30px;
  font-family: 'AppleSDGothicNeoB';
`;
