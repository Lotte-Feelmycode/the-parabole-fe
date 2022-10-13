import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Coupon from '@components/event/Coupon';
import * as btn from '@components/input/Button';
import { POST, GET } from '@apis/defaultApi';
import { useRouter } from 'next/router';
export default function EventPrize({
  // couponDetail,
  // couponDiscountRate,
  // couponId,
  // eventPrizeId,
  // prizeType,
  // productId,
  // productImg,
  // productName,
  // stock,
  // expiresAt,
  event,
  eventId,
}) {
  const [couponInfo, setCouponInfo] = useState([event]);
  //TODO 나중에 userId 제대로
  const userId = 3;
  const router = useRouter();
  useEffect(() => {
    setCouponInfo(event);
  }, [event]);
  function applyEvent(eventId, eventPrizeId) {
    //TODO: userID 나중에 받아와야함
    POST('/event/participant', {
      userId,
      eventId,
      eventPrizeId,
    }).then((res) => {
      console.log(res);
      if (res) {
        alert('응모 성공');
      }
    });

    return;
  }
  if (event.prizeType === 'PRODUCT') {
    return (
      <div>
        <div style={{ width: '300px', height: '300px' }}>
          <EventPrizeImg className="prize-img" src={event.productImg} />
        </div>
        <div className="prize-body">
          <div>
            <div className="prize-name">{event.productName}</div>
          </div>
          <div>
            <div className="prize-stock">총 수량 : {event.stock} 개</div>
          </div>
          <btn.Blue
            buttonText={'이벤트 응모'}
            onClickFunc={() => applyEvent(eventId, event.eventPrizeId)}
          />
        </div>
      </div>
    );
  } else if (event.prizeType === 'COUPON') {
    return (
      <div>
        <div style={{ width: '300px', height: '300px' }}>
          <div>
            <Coupon couponInfo={couponInfo} />
          </div>
          <div>{event.couponDiscountRate}% 할인 쿠폰</div>
        </div>
        <div className="prize-stock">총 수량 : {event.stock} 개</div>

        <btn.Blue
          buttonText={'이벤트 응모'}
          onClickFunc={() => applyEvent(eventId, event.eventPrizeId)}
        />
        <btn.LineBlue buttonText={'응모 완료'} />
      </div>
    );
  }
}

const EventPrizeImg = styled.img`
  object-fit: fill;
`;
