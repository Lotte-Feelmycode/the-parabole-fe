import styled from '@emotion/styled';
import { ThemeGray4 } from '@utils/constants/themeColor';
import { numberToMonetary } from '@utils/functions';
import { Blue } from '@components/input/Button';
import { useContext } from 'react';
import { CouponContext } from '@pages/user/order/index';

export default function OrderSidebar({ productTotalPrice, goToPayment }) {
  const couponSelectStates = useContext(CouponContext);
  let discountCouponPrice = 0;

  console.log('OrderSidebar', couponSelectStates);
  couponSelectStates.forEach((coupon) => {
    if (coupon && coupon.discountPrice && coupon.discountPrice > 0) {
      discountCouponPrice = discountCouponPrice + coupon.discountPrice;
    }
    console.log('OrderSidebar-forEach', coupon, discountCouponPrice);
  });

  function ShowDiscountPrice({ discountCouponPrice }) {
    if (discountCouponPrice > 0) {
      return (
        <span>
          {'-'}
          {numberToMonetary(discountCouponPrice)}
          {'원'}
        </span>
      );
    } else {
      return <span>{'0원'}</span>;
    }
  }

  return (
    <SideBarSection className="sidebar-section">
      <StickyContainer>
        <PayResultSection className="pay-result-section">
          <h3>결제금액</h3>
          <TotalProductPriceSection>
            <PayIndex>
              <PayLable>총 상품금액</PayLable>
              <PayPrice marginLeft="auto">
                {numberToMonetary(productTotalPrice) || 0}원
              </PayPrice>
            </PayIndex>
            <PayIndex>
              <PayLable>할인금액</PayLable>
              <PayPrice marginLeft="auto">
                <ShowDiscountPrice discountCouponPrice={discountCouponPrice} />
              </PayPrice>
            </PayIndex>
            <PayIndex>
              <PayLable>배송비</PayLable>
              <PayPrice marginLeft="auto">{0}원</PayPrice>
            </PayIndex>
            <PayLargeIndex>
              <PayLargeLable>최종 결제 금액</PayLargeLable>
              <PayLargePrice>
                {numberToMonetary(productTotalPrice - discountCouponPrice) || 0}
                원
              </PayLargePrice>
            </PayLargeIndex>
          </TotalProductPriceSection>
        </PayResultSection>
        <Blue
          buttonText={
            numberToMonetary(productTotalPrice - discountCouponPrice) +
            '원 결제하기'
          }
          onClickFunc={goToPayment}
          css={{ width: '100%' }}
        />
      </StickyContainer>
    </SideBarSection>
  );
}

const SideBarSection = styled.div`
  padding-top: 60px;

  @media (min-width: 1024px) {
    margin-left: 40px;
    width: 300px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 81px;
  padding-top: 40px;
`;

const PayResultSection = styled.div`
  border: solid 1px ${ThemeGray4};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
`;

const PayIndex = styled.div`
  display: inline-flex;
  margin-top: 5px;
`;

const PayLable = styled.h4`
  font-size: 1rem;
`;

const PayPrice = styled.span`
  margin-left: auto;
  font-size: 1rem;
`;

const PayLargeIndex = styled.div`
  border-top: solid 1px ${ThemeGray4};
  display: inline-flex;
  margin-top: 20px;
  padding-top: 19px;
`;

const PayLargeLable = styled.h4`
  font-size: 1.2rem;
`;

const PayLargePrice = styled.span`
  margin-left: auto;
  font-size: 1.2rem;
`;

const TotalProductPriceSection = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;
