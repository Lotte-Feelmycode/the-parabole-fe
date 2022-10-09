import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';

export default function UserCoupon({ userCoupon }) {
  console.log('USER COUPON props : ' + JSON.stringify(userCoupon));

  return (
    <div className="usercoupon">
      <div className="usercoupon-body">
        <div className="usercouponInfoUnit">
          {userCoupon.name}
          <HighlightInfo>
            <div>{userCoupon.serialNo}</div>
          </HighlightInfo>
          <div>{userCoupon.sellerName}</div>
          <div>{userCoupon.type}</div>
          <div>{userCoupon.RateOrAmount}</div>
          <div>{userCoupon.useState}</div>
          <div>{userCoupon.useDate}</div>
          <div>{userCoupon.acquiredDate}</div>
          <div>{userCoupon.validAt}</div>
          <strong>
            <div> {userCoupon.expiresAt}</div>
          </strong>
          <div>{userCoupon.maxDiscountAmount}</div>
          <div>{userCoupon.minPaymentAmount}</div>
        </div>
      </div>
    </div>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
