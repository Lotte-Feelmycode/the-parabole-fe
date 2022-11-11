import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { LinePink } from '@components/input/Button';
import * as Color from '@utils/constants/themeColor';
import { POST } from '@apis/defaultApi';

export default function CouponListModal({
  setModalState,
  couponList,
  storeName,
}) {
  const [coupons, setCoupons] = useState(couponList);
  const getCoupon = (e) => {
    e.preventDefault();

    const userIdList = [2];
    POST('/assign', { couponId: 1, userIdList }).then((res) => {
      if (res && res.success) {
        setModalState(false);
      }
    });

    setModalState(false);
  };
  const couponsDummy = [
    {
      id: 1,
      name: '두벚냊 쿠폰',
      discountValue: 10,
      detail: '10%쿠포을 받으세요',
    },
    {
      id: 2,
      name: '첫번째 쿠폰',
      discountValue: 10,
      detail: '10%쿠포을 받으세요',
    },
  ];

  const modalRef = useRef();

  return (
    <BackgroundDIM>
      <ModalContainer ref={modalRef} className="modal-container">
        <TopSection>
          <div className="text-center mt-8 font-bold text-7xl text-black-600">
            💌
          </div>
          <div className="text-center px-2 mt-8 font-bold text-2xl text-black-600">
            {storeName}에서 도착한 쿠폰을 확인해보세요!
          </div>
          <div className="text-center text-gray-500 px-2 my-2">
            주문시 혜택을 적용해보세요. <br />
          </div>
        </TopSection>
        <DetailSection>
          <ModalTableSection>
            {couponsDummy &&
              couponsDummy.map((coupons) => {
                return (
                  <div className="px-2 text-left border-2 rounded-md mx-2 my-2 h-16">
                    <div className="t">졸려죽겟다... {coupons.name}</div>
                    <div>{coupons.detail}</div>
                  </div>
                  // <CouponDetail coupon={coupon}></CouponDetail>
                );
              })}
          </ModalTableSection>
        </DetailSection>
        <ButtonWrapper>
          <ButtonSection>
            <div className="text-white font-bold text-center">
              <button onClickFunc={getCoupon}>쿠폰 발급받기</button>
            </div>
            {/* <LinePink buttonText="확인" onClickFunc={closeModal} /> */}
          </ButtonSection>
        </ButtonWrapper>
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

  background-color: #ffffff;
  border: 0px;
  border-radius: 20px;

  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  width: 400px;
  height: 724px;
`;

const TopSection = styled.div`
  padding: 5px 15px;
`;

const DetailSection = styled.div`
  text-align: center;
`;

const ModalTableSection = styled.div`
  margin-top: 0;
  height: 60%;
`;

const ButtonWrapper = styled.div`
  padding: 0;
  bottom: 0;
  z-index: 1;
`;

const ButtonSection = styled.div`
  background-color: ${Color.MainBlue};
  border-radius: 0 0 20px 20px;
  padding: 20px 0;
`;
