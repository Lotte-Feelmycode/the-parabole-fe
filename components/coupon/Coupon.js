import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';

export default function Coupon({ coupon }) {
  console.log('USER COUPON props : ' + JSON.stringify(coupon));

  return (
    <div className="coupon">
      <div className="coupon-body">
        <div className="couponInfoUnit">
          <HighlightInfo>{coupon.name}</HighlightInfo>
          <div>{coupon.type}</div>
          <div> {coupon.discountRate}</div>
          <div> {coupon.discountAmount}</div>
          <div> {coupon.createdAt}</div>
          <div> {coupon.validAt}</div>
          <strong>
            <div> {coupon.expiresAt}</div>
          </strong>
          <div> {coupon.maxDiscountAmount}</div>
          <div> {coupon.minPaymentAmount}</div>
          <div> {coupon.detail}</div>
          <div> {coupon.cnt}</div>
        </div>
      </div>
    </div>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
