import { useRouter } from 'next/router';
import * as btn from '@components/input/Button';
import { getDateTime } from '@utils/functions';
import styled from '@emotion/styled';
import Timer from '@components/common/Timer';
import { useState, useEffect } from 'react';
import { GET_DATA } from '@apis/defaultApi';

export default function EventInfo({ eventInfo, eventImage }) {
  const router = useRouter();
  const [storeInfo, setStoreInfo] = useState();

  useEffect(() => {
    if (eventInfo) {
      GET_DATA(`/seller`, { sellerId: eventInfo.sellerId }).then((res) => {
        if (res) {
          setStoreInfo(res);
        }
      });
    }
  }, [router.query]);
  function goToStore() {
    if (storeInfo && storeInfo.sellerId) {
      router.push({ pathname: `/store/${storeInfo.sellerId}` });
    }
  }

  return (
    <>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="flex flex-col text-center pb-12 md:pb-16">
              <H1
                className="break-all text-2xl md:text-5xl lg:text-6xl leading-tighter tracking-tighter"
                data-aos="zoom-y-out"
              >
                {eventInfo.descript}
              </H1>
              <H1
                className="break-all text-4xl md:text-7xl lg:text-8xl font-bold leading-tighter tracking-tighter
                  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 whitespace-pre-line"
                data-aos="zoom-y-out"
              >
                {eventInfo.title}
              </H1>
              <div className="max-w-3xl mx-auto mt-5">
                <div>
                  <div className="flex justify-center item-center flex-row">
                    <p className="text-3xl md:text-4xl font-bold text-blue-600 mr-2">
                      "{storeInfo && storeInfo.storeName}"
                    </p>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                      에서
                    </p>
                  </div>
                  <div className="flex justify-center item-center flex-col">
                    <p className="text-xl md:text-2xl text-gray-600">
                      {getDateTime(eventInfo.startAt)}부터
                    </p>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                      {getDateTime(eventInfo.endAt)}까지 진행하는 이벤트!
                    </p>
                  </div>
                </div>
                <p
                  className="text-3xl md:text-4xl text-gray-600 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  {/* TODO : 이벤트 종료일시 - 현재 */}
                  <Timer endAt={eventInfo.endAt} />
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div className="animate-pulse">
                    <btn.Blue
                      buttonText={'상품 더 보러가기'}
                      onClickFunc={goToStore}
                    />
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

const H1 = styled.div`
  font-family: 'AppleSDGothicNeoB';
`;
