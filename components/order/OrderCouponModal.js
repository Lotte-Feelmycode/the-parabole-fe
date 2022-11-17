import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import {
  MainBlue,
  ThemeGray1,
  ThemeGray2,
  ThemeGray4,
  ThemeWhite,
  ThemeGray5,
} from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';
import { SmallBlue } from '@components/input/Button';

export default function OrderCouponModal({
  setModalState,
  contentTotalPrice,
  storeName,
  couponArray,
  couponState,
  changeCouponState,
}) {
  const closeModal = () => {
    setModalState(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef();

  useEffect(() => {
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalState(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  function ShowCouponList({ closeModal }) {
    if (couponArray.length > 0) {
      return (
        <CouponListSection className="coupon-list-section">
          {couponArray &&
            couponArray.map((coupon, index) => {
              let description = '';
              if (coupon.type === 'RATE') {
                description = coupon.discountValue + '%';
              } else if (coupon.type === 'AMOUNT') {
                description =
                  (numberToMonetary(coupon.discountValue) || 0) + '원';
              } else {
                description = coupon.discountValue;
              }

              description = description + ' 할인쿠폰';
              return (
                <ShowCoupon
                  key={coupon.couponName + '' + index}
                  couponName={coupon.couponName}
                  description={description}
                  discountPrice={coupon.totalFee}
                  changeCouponState={changeCouponState}
                  index={index}
                  closeModal={closeModal}
                />
              );
            })}
        </CouponListSection>
      );
    } else {
      return <div>쿠폰이 없습니다.</div>;
    }
  }

  function ShowCoupon({
    couponName,
    description,
    discountPrice,
    changeCouponState,
    index,
    closeModal,
  }) {
    function useCoupon({ input }) {
      changeCouponState({ index: input });
      closeModal();
    }

    return (
      <CouponSection>
        <CouponTopSection>
          <CouponNameSection className="truncate font-bold text-xl text-black-600">
            <span>{couponName}</span>
          </CouponNameSection>
          <CouponButtonSection>
            <SmallBlue
              buttonText={'사용'}
              onClickFunc={() => {
                useCoupon({ input: index });
              }}
              attr={index === couponState ? { disabled: true } : {}}
            />
          </CouponButtonSection>
        </CouponTopSection>
        <CouponDescriptionSection>
          <span>{description}</span>
        </CouponDescriptionSection>
        <CouponAmountSection>
          <CouponDiscountValue>
            {'할인금액 : ' + (numberToMonetary(discountPrice) || 0) + '원'}
          </CouponDiscountValue>
          <p>
            {'적용금액 : ' +
              (numberToMonetary(contentTotalPrice - discountPrice) || 0) +
              '원'}
          </p>
        </CouponAmountSection>
      </CouponSection>
    );
  }

  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <TopSection>
          <button onClick={closeModal}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={ThemeGray1}
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fillRule="nonzero"
                d="M6 4.6L10.3.3l1.4 1.4L7.4 6l4.3 4.3-1.4 1.4L6 7.4l-4.3 4.3-1.4-1.4L4.6 6 .3 1.7 1.7.3 6 4.6z"
              />
            </svg>
          </button>
        </TopSection>
        <DetailSection>
          <ModalTitleSection>{storeName}에서 사용가능한 쿠폰</ModalTitleSection>
          <ModalTableSection>
            <ShowCouponList
              changeCouponState={changeCouponState}
              closeModal={closeModal}
            />
          </ModalTableSection>
        </DetailSection>
      </ModalContainer>
    </BackgroundDIM>
  );
}

const BackgroundDIM = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  z-index: 999;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${ThemeGray5};
  border: 1px solid black;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  @media (min-width: 767px) {
    max-width: 500px;
    width: 100%;
  }
  @media (max-width: 767px) {
    max-width: 400px;
    width: 100%;
    height: 500px;
  }
`;

const TopSection = styled.div`
  text-align: right;
  padding: 5px 10px;
`;

const DetailSection = styled.div`
  text-align: center;
`;

const ModalTitleSection = styled.div`
  width: 80%;
  padding: 10px;
  margin: 0 auto;
  background-color: ${ThemeWhite};
  font-size: 1.5rem;
  font-weight: bolder;
  border: 1px solid ${ThemeGray2};
  border-radius: 1rem;
`;

const ModalTableSection = styled.div`
  margin: 30px 0;
`;

const CouponListSection = styled.div`
  margin: auto;
  width: 90%;

  text-align: center;
  border-radius: 10px;
  border: 1px solid ${ThemeGray2};
  overflow: auto;

  background-color: ${ThemeWhite};

  @media (min-width: 767px) {
    height: 400px;
  }
  @media (max-width: 767px) {
    height: 300px;
  }
`;

const CouponTopSection = styled.div`
  display: flex;
`;

const CouponSection = styled.div`
  text-align: left;
  margin: 10px;
  padding: 10px 30px;
  border: 1px solid ${ThemeGray4};
  border-radius: 20px;
  background-color: white;
`;

const CouponButtonSection = styled.div`
  margin-left: auto;
`;

const CouponNameSection = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  font-weight: 900;
  font-size: larger;
  color: ${MainBlue};

  @media (min-width: 1024px) {
    width: 200px;
  }
  @media (max-width: 1024px) {
    width: 100px;
  }
`;

const CouponDescriptionSection = styled.div`
  word-break: break-all;
  font-weight: 700;
  font-size: medium;
`;

const CouponAmountSection = styled.div`
  font-size: small;
  color: ${ThemeGray1};
  @media (min-width: 1024px) {
    display: flex;
    margin-top: 5px;
    justify-content: center;
  }
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const CouponDiscountValue = styled.p`
  @media (min-width: 1024px) {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid ${ThemeGray2};
  }
`;
