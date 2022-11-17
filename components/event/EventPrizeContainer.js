import { useState } from 'react';
import { Blue } from '@components/input/Button';
import { POST } from '@apis/defaultApi';
import { ICON_COUPON } from '@utils/constants/icons';
import styled from '@emotion/styled';
import Heading from '@components/input/Heading';
import { getDate } from '@utils/functions';
import { NO_IMAGE } from '@utils/constants/images';

export default function EventPrizeContainer({
  eventId,
  eventPrizes,
  eventType,
  eventStatus,
  applyStatus,
  headers,
}) {
  const [applySts, setApplySts] = useState(applyStatus);
  const [status, setStatus] = useState(eventStatus || 0);

  function applyEvent(eventId, eventPrizeId, prizeName) {
    if (confirm('경품' + prizeName + '에 응모하시겠습니까?')) {
      POST(
        '/event/participant',
        {
          eventId,
          eventPrizeId,
        },
        headers,
      ).then((res) => {
        if (res) {
          if (res.success) {
            alert('응모 성공');
            setApplySts('disabled');
          } else {
            alert('이미 응모 하셨습니다.');
          }
        } else {
          alert('잠시후 다시 시도해주세요');
        }
      });
    }
  }

  function ProductCard({ prize }) {
    return (
      <div className="flex flex-col max-h-96 place-items-center">
          <img
            className="justify-self-center prize-img w-48 max-h-48 content-center mb-4"
            src={prize.productImg || NO_IMAGE}
          />
        <div className="w-60">
          <h4 className="text-black text-2xl text-center font-bold leading-snug tracking-tight mb-3">
            {prize.productName || '상품명'}
          </h4>
        </div>
        {eventStatus === 1 && (
          <div className="flex justify-center">
            <Blue
              buttonText={'이벤트 응모'}
              onClickFunc={() =>
                applyEvent(eventId, prize.eventPrizeId, prize.productName)
              }
              attr={{ disabled: applySts }}
              css={{
                marginTop: 'auto',
                marginBottom: '10px',
              }}
            />
          </div>
        )}
      </div>
    );
  }

  function CouponCard({ prize }) {
    return (
      <div className="flex flex-col max-h-96 place-items-center">
        <div className="justify-self-center prize-img w-48 max-h-48 content-center mb-4">
          <EventPrizeCouponImg className="prize-img" src={ICON_COUPON} />
        </div>
        <h4 className="text-black text-2xl text-center font-bold leading-snug tracking-tight mb-3">
          {prize.couponName || '쿠폰명'}
        </h4>
        <div className="text-center mb-4">
          {getDate(prize.expiresAt) || 'YYYY-MM-DD'}까지 사용가능
        </div>
        {eventStatus === 1 && (
          <div className="flex justify-center">
            <Blue
              buttonText={'이벤트 응모'}
              onClickFunc={() =>
                applyEvent(eventId, prize.eventPrizeId, prize.couponName)
              }
              attr={{ disabled: applySts }}
              css={{
                marginTop: 'auto',
                marginBottom: '10px',
              }}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <section className="relative">
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <Heading type={'h1'} title={'경품을 확인해 보세요!'} />
              <p className="text-xl text-gray-600">
                한 가지 경품만 응모할 수 있습니다.
              </p>
            </div>

            {eventPrizes &&
            Array.isArray(eventPrizes) &&
            eventPrizes.length === 1 ? (
              <div className="flex flex-row items-center w-96 mx-auto justify-center items-start md:max-w-2xl lg:max-w-none">
                {eventPrizes &&
                  eventPrizes.map((prize) => {
                    return (
                      <div
                        key={prize.id}
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
                      >
                        <div className="relative flex flex-col items-center content-center place-content-center p-6 bg-white rounded shadow-xl">
                          {prize && prize.prizeType === 'PRODUCT' ? (
                            <ProductCard prize={prize} />
                          ) : (
                            <CouponCard prize={prize} />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="max-w-sm mx-auto justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                {eventPrizes &&
                  eventPrizes.map((prize) => {
                    return (
                      <div
                        key={prize.id}
                        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
                      >
                        <div className="h-100 relative flex flex-col items-center content-center place-content-center p-6 bg-white rounded shadow-xl">
                          {prize && prize.prizeType === 'PRODUCT' ? (
                            <ProductCard prize={prize} />
                          ) : (
                            <CouponCard prize={prize} />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
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
  justify-self: center;

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
