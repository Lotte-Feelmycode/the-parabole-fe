import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import * as Color from '@utils/constants/themeColor';
import { POST } from '@apis/defaultApi';
import { numberToMonetary, getTodayDateShort } from '@utils/functions';

export default function CouponListModal({
  setModalState,
  couponList,
  storeName,
}) {
  const [selectCoupon, setSelectCoupon] = useState();

  const setCoupon = (e, couponId) => {
    e.preventDefault();
    setSelectCoupon(couponId);
  };

  const getCoupon = (e) => {
    e.preventDefault();

    let userId = localStorage.getItem('userId');
    const userIds = [userId];
    POST('/coupon/assign', {
      couponId: selectCoupon,
      userIdList: userIds,
    }).then((res) => {
      console.log(res);
      if (res && res.success) {
        alert(storeName + '의 상품 주문시 사용가능한 쿠폰을 다운받았습니다');
        setModalState(false);
      }
    });
  };

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
            {couponList &&
              couponList.map((coupon) => {
                return (
                  <div className="text-left border-2 rounded-md mx-2 my-2 hover:bg-slate-50">
                    <button onClick={(e) => setCoupon(e, coupon.couponId)}>
                      <div className="flex flex-col p-4 text-left">
                        <div className="font-bold text-xl text-black-600">
                          {coupon.name}
                        </div>
                        <div>{coupon.detail}</div>
                        <div>
                          {numberToMonetary(coupon.minPaymentAmount)}원 이상
                          사용가능
                        </div>
                        <div>( ~ {getTodayDateShort(coupon.expiresAt)})</div>
                      </div>
                    </button>
                  </div>
                );
              })}
          </ModalTableSection>
        </DetailSection>
        <ButtonWrapper>
          <ButtonSection>
            <div className="text-white font-bold text-center">
              <button onClick={getCoupon}>쿠폰 발급받기</button>
            </div>
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
  height: 410px;
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
