import { useState, useEffect, useMemo } from 'react';
import { Blue } from '@components/input/Button';
import { POST } from '@apis/defaultApi';
import { ICON_COUPON } from '@utils/constants/icons';
import styled from '@emotion/styled';
import Heading from '@components/input/Heading';
export default function EventPrizeContainer({ eventPrizes, eventInfo, applyStatus }) {
  function BtnSection() {
    return (
      <Blue
        buttonText={'이벤트 응모'}
        onClickFunc={() => applyEvent(eventId, prize.eventPrizeId)}
        attr={{ disabled: applyStatus }}
        css={{ marginTop: 'auto', marginBottom: '10px' }}
      />
    );
  }

  function applyEvent(eventId, eventPrizeId) {
    //TODO: userID 나중에 받아와야함
    POST('/event/participant', {
      userId,
      eventId,
      eventPrizeId,
    }).then((res) => {
      if (res) {
        if (res.success) {
          alert('응모 성공');
          location.reload();
        } else {
          alert('이미 응모 하셨습니다.');
        }
      } else {
        alert('잠시후 다시 시도해주세요');
      }
    });
  }

  return (
    <>
      <section className="relative">
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <Heading type={'h1'} title={'경품을 확인해 보세요!'} />
              <p className="text-xl text-gray-600">
                한 가지 경품만 응모할 수 있습니다.
              </p>
              {/* {eventInfo.type === 'FCFS' && (<p>선착순 이벤트는 이벤트 오픈 50분 후 종료됩니다.</p>)} */}
            </div>

            {/* Items */}
            <div className="max-w-sm mx-auto justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
              {eventPrizes &&
                eventPrizes.map((prize) => {
                  return (
                    <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
                      <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                        {prize && prize.prizeType === 'PRODUCT' ? (
                          <>
                            <ImgSection>
                              <EventPrizeProductImg
                                className="prize-img"
                                src={prize.productImg}
                              />
                            </ImgSection>
                            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                              {prize.productName}
                            </h4>
                          </>
                        ) : (
                          <div>
                            <ImgSection>
                              <EventPrizeCouponImg
                                className="prize-img"
                                src={ICON_COUPON}
                              />
                            </ImgSection>
                            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                              {prize.couponName}
                            </h4>
                          </div>
                        )}
                        <BtnSection />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const ImgSection = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const EventBodySection = styled.div`
  margin-bottom: 10px;
`;

const EventPrizeProductImg = styled.img`
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  min-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
`;

const EventPrizeCouponImg = styled.img`
  padding: 23px 0;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  min-width: 200px;
  border-radius: 20px;
`;

const PrizeNameSection = styled.div`
  text-align: center;
`;
