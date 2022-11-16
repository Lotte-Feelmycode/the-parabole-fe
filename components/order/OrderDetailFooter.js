import styled from '@emotion/styled';
import { useState, useEffect, useContext } from 'react';
import { numberToMonetary } from '@utils/functions';
import { SmallBlue } from '@components/input/Button';
import OrderCouponModal from '@components/order/OrderCouponModal';
import { CouponContext, CouponDispatchContext } from '@pages/user/order/index';
import { GET_DATA } from '@apis/defaultApi';

export default function OrderDetailFooter({
  contentTotalPrice,
  storeName,
  sellerId,
  headers,
}) {
  const [couponArray, setCouponArray] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [couponState, setCouponState] = useState(-1);
  const couponSelectStates = useContext(CouponContext);
  const dispatch = useContext(CouponDispatchContext);

  useEffect(() => {
    GET_DATA(
      `/coupon`,
      { sellerId, totalFee: contentTotalPrice },
      headers,
    ).then((res) => {
      console.log('getCoupon', res);
      if (res) {
        setCouponArray(res);
      }
    });
  }, [headers]);

  const showModal = () => {
    setModalState(true);
  };

  function changeCouponState({ index }) {
    console.log('changeCouponState', index);
    let discountPrice = 0;

    setCouponState(index);
    if (couponArray[index]) {
      const coupon = couponArray[index];
      if (contentTotalPrice >= coupon.totalFee) {
        discountPrice = coupon.totalFee;
      } else {
        discountPrice = contentTotalPrice;
      }
      const parameter = {
        key: sellerId,
        couponName: coupon.couponName,
        description: coupon.description,
        discountPrice: discountPrice,
        serialNo: coupon.serialNo,
      };
      dispatch({ type: 'SET', data: parameter });
    }
  }

  function ShowSelectedCoupon() {
    const map = couponSelectStates;
    let coupon = null;
    map.forEach((state) => {
      if (state.key === sellerId) {
        coupon = state;
      }
    });

    if (coupon && coupon.couponName !== '') {
      return (
        <div>
          <span className="text-sm">{coupon.couponName}</span>
          <span className="text-base">{' | '}</span>
          <span className="text-lg font-bold">
            {numberToMonetary(coupon.discountPrice) || 0}원 할인 적용
          </span>
        </div>
      );
    } else {
      return <span className="text-sm">{'쿠폰없음'}</span>;
    }
  }

  return (
    <OrderDetailFooterSection className="order-detail-footer-section">
      <CouponSection className="coupon-section">
        <CouponSelected>
          <ShowSelectedCoupon />
        </CouponSelected>
        <CouponBtnSection>
          <SmallBlue buttonText={'쿠폰선택'} onClickFunc={showModal} />
        </CouponBtnSection>
      </CouponSection>
      <TotalPriceSection className="total-price-section"></TotalPriceSection>
      {modalState && (
        <OrderCouponModal
          setModalState={setModalState}
          contentTotalPrice={contentTotalPrice}
          storeName={storeName}
          couponArray={couponArray}
          couponState={couponState}
          changeCouponState={changeCouponState}
        />
      )}
    </OrderDetailFooterSection>
  );
}

const OrderDetailFooterSection = styled.div``;

const CouponSection = styled.div`
  display: flex;
  padding-top: 10px;
`;

const CouponSelected = styled.div`
  padding-left: 10px;
`;

const CouponBtnSection = styled.div`
  margin-left: auto;
`;

const TotalPriceSection = styled.div``;
