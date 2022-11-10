import styled from '@emotion/styled';
import { useState, useEffect, useContext } from 'react';
import { numberToMonetary } from '@utils/functions';
import { SmallBlue } from '@components/input/Button';
import OrderCouponModal from '@components/order/OrderCouponModal';
import { CouponContext, CouponDispatchContext } from '@pages/user/order/index';

export default function OrderDetailFooter({
  contentTotalPrice,
  couponDto,
  storeName,
  sellerId,
}) {
  const [couponArray, setCouponArray] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [couponState, setCouponState] = useState(-1);
  const couponSelectStates = useContext(CouponContext);
  const dispatch = useContext(CouponDispatchContext);

  const addCouponArray = (parameter) => {
    setCouponArray((couponArray) => [
      ...couponArray,
      {
        couponName: parameter.couponName,
        description: parameter.description,
        discountPrice: parameter.discountPrice,
        serialNo: parameter.serialNo,
      },
    ]);
  };

  useEffect(() => {
    if (
      couponDto &&
      couponDto.rateCoupon &&
      couponDto.amountCoupon &&
      couponDto.amountCoupon.length + couponDto.rateCoupon.length > 0
    ) {
      const rateCouponList = couponDto.rateCoupon;
      const amountCouponList = couponDto.amountCoupon;

      var rateIndex = 0;
      var amountIndex = 0;

      for (
        null;
        rateIndex + amountIndex <
        rateCouponList.length + amountCouponList.length;
        null
      ) {
        var parameter = null;

        if (rateCouponList.length > rateIndex) {
          const nowCoupon = rateCouponList[rateIndex];
          const nowPrice = (contentTotalPrice * nowCoupon.discountValue) / 100;
          parameter = {
            couponName: nowCoupon.couponName,
            description: nowCoupon.discountValue + '%',
            discountPrice: nowPrice,
            serialNo: nowCoupon.serialNo,
          };
        }

        if (amountCouponList.length > amountIndex) {
          const nowCoupon = amountCouponList[amountIndex];
          var nowPrice =
            contentTotalPrice - nowCoupon.discountValue < 0
              ? 0
              : nowCoupon.discountValue;

          if (parameter == null || parameter.discountPrice < nowPrice) {
            parameter = {
              couponName: nowCoupon.couponName,
              description: nowCoupon.discountValue + '₩',
              discountPrice: nowPrice,
              serialNo: nowCoupon.serialNo,
            };
            amountIndex = amountIndex + 1;
          } else {
            rateIndex = rateIndex + 1;
          }
        }

        if (parameter) {
          addCouponArray(parameter);
        }
      }
    }
  }, []);

  const showModal = () => {
    setModalState(true);
  };

  function changeCouponState({ index }) {
    setCouponState(index);
    if (couponArray[index]) {
      const coupon = couponArray[index];
      const parameter = {
        key: sellerId,
        couponName: coupon.couponName,
        description: coupon.description,
        discountPrice: coupon.discountPrice,
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
