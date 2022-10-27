import styled from '@emotion/styled';
import { Blue } from '@components/input/Button';
import { POST } from '@apis/defaultApi';
import { ICON_COUPON } from '@utils/constants/icons';
import { ThemeGray4, ThemeGray5 } from '@utils/constants/themeColor';

export default function EventPrize({ prize, eventId, applyStatus }) {
  //TODO userId 객체 받아오기
  const userId = 3;

  function PrizeDetail() {
    if (prize && prize.prizeType === 'PRODUCT') {
      return (
        <div className="prize-detail prize-product-detail">
          <ImgSection>
            <EventPrizeProductImg
              className="prize-img"
              src={prize.productImg}
            />
          </ImgSection>
          <EventBodySection className="prize-body">
            <PrizeNameSection className="prize-name">
              <p className="text-lg lg:text-xl font-bold p-2">
                {prize.productName}
              </p>{' '}
              <p>{prize.stock}개</p>
            </PrizeNameSection>
          </EventBodySection>
        </div>
      );
    } else if (prize && prize.prizeType === 'COUPON') {
      return (
        <div className="prize-detail prize-coupon-detail">
          <ImgSection>
            <EventPrizeCouponImg className="prize-img" src={ICON_COUPON} />
          </ImgSection>
          <EventBodySection className="prize-body">
            <PrizeNameSection className="prize-name prize-name-coupon">
              <p className="text-lg lg:text-xl font-bold p-2">
                {prize.couponDetail}
              </p>
              <CouponDiscountValue />
              <p>
                {prize.stock}
                {'개'}
              </p>
            </PrizeNameSection>
          </EventBodySection>
        </div>
      );
    }
  }

  function CouponDiscountValue() {
    if (prize.type === 'AMOUNT') {
      return <p>{prize.couponDiscountValue}원 할인 쿠폰</p>;
    } else if (prize.type === 'RATE') {
      return <p>{prize.couponDiscountValue}% 할인 쿠폰</p>;
    } else {
      return <p>{prize.couponDiscountValue} 할인 쿠폰</p>;
    }
  }

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
    <PrizeBackGround className="prize-back-ground">
      <PrizeDetail />
      <BtnSection />
    </PrizeBackGround>
  );
}

const PrizeBackGround = styled.div`
  border: 1px solid ${ThemeGray4};
  border-radius: 2rem;
  background-color: ${ThemeGray5};
  margin: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    width: 31%;
  }

  @media (max-width: 1024px) {
    width: 47%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

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
