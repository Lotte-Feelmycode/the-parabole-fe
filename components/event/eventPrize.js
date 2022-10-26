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
        <div style={{ width: '300px', height: '300px', marginLeft: '35px' }}>
          <EventPrizeImg className="prize-img" src={event.productImg} />
        </div>
        <div
          className="prize-body"
          style={{ float: 'right', paddingRight: '110px' }}
        >
          <br />
          <div>
            <div
              className="prize-name"
              style={{ textAlign: 'center', fontSize: 'large' }}
            >
              <strong>{event.productName}</strong> {event.stock}개
            </div>
          </div>

          <div style={{ width: '153px', padding: '8px' }}>
            <div>
              <btn.Blue
                buttonText={'이벤트 응모'}
                onClickFunc={() => applyEvent(eventId, event.eventPrizeId)}
                attr={{ disabled: state }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (event.prizeType === 'COUPON') {
    return (
      <div style={{ marginLeft: '35px' }}>
        <div style={{ width: '300px', height: '249px' }}>
          <div>
            <Coupon couponInfo={couponInfo} />
          </div>
        </div>

        <div
          style={{ float: 'right', paddingRight: '106px', fontSize: 'large' }}
        >
          {event.type === 'AMOUNT' ? (
            <strong>{event.couponDiscountValue}원 할인 쿠폰</strong>
          ) : (
            <strong>{event.couponDiscountValue}% 할인 쿠폰</strong>
          )}
          {event.stock}개
        </div>
        <br />
        <br />
        <div style={{ marginLeft: '82px' }}>
          <btn.Blue
            buttonText={'이벤트 응모'}
            onClickFunc={() => applyEvent(eventId, event.eventPrizeId)}
            attr={{ disabled: state }}
          />
        </div>
      </div>
    );
  }
}

const EventPrizeImg = styled.img`
  object-fit: fill;
  border-radius: 9rem;
`;
