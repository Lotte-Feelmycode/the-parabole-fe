import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Coupon from '@components/event/Coupon';
import * as btn from '@components/input/Button';
import { POST_DATA, POST } from '@apis/defaultApi';
import { useRouter } from 'next/router';
export default function EventPrize({ event, eventId }) {
  const [couponInfo, setCouponInfo] = useState([event]);
  const [state, setState] = useState();
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

    return;
  }
  useEffect(() => {
    POST_DATA('/event/participant/check', {
      userId,
      eventId,
    }).then((res) => {
      if (!res) {
        setState('disabled');
      }
    });
  });

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
            attr={{ disabled: state }}
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
          <br />
          <br />
          <div>{event.couponDiscountRate}% 할인 쿠폰</div>
        </div>
        <div className="prize-stock">총 수량 : {event.stock} 개</div>

        <btn.Blue
          buttonText={'이벤트 응모'}
          onClickFunc={() => applyEvent(eventId, event.eventPrizeId)}
          attr={{ disabled: state }}
        />
      </div>
    );
  }
}

const EventPrizeImg = styled.img`
  object-fit: fill;
`;
