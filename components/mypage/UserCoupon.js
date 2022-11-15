import styled from '@emotion/styled';
import { getDate, numberToMonetary } from '@utils/functions';
import { MainBlue, ThemeGray4 } from '@utils/constants/themeColor';
import { SmallWhite } from '@components/input/Button';
import { useRouter } from 'next/router';
import { LINKS } from '@utils/constants/links';

export default function UserCoupon({ userCoupon }) {
  const router = useRouter();
  var benefitType = '';
  var benefitAmount = '';

  if (userCoupon.type === 'RATE') {
    benefitType = '할인율';
    benefitAmount = userCoupon.discountValue + '%';
  } else {
    benefitType = '할인금액';
    benefitAmount = numberToMonetary(userCoupon.discountValue) + '원';
  }
  var couponState = '';
  if (userCoupon.useState === 'NOT_USED') {
    couponState = '사용가능';
  } else {
    couponState = '사용불가능';
  }

  // return (
  //   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  //     <th
  //       scope="row"
  //       className="px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //     >
  //       {userCoupon.name}
  //     </th>
  //     <td className="px-1">{userCoupon.serialNo}</td>
  //     <td className="px-1">{userCoupon.sellerName}</td>
  //     <td className="py-1 px-1">
  //       <BenefitSection>
  //         <span>{benefitType}</span>
  //         <span>{benefitAmount}</span>
  //       </BenefitSection>
  //     </td>
  //     <td className="px-1">{getDate(userCoupon.validAt)}</td>
  //   </tr>
  // );

  return (
    <UserCouponSection className="user-coupon-section">
      <TopSection className="top-section">
        <SellerSection>{userCoupon.storeName}</SellerSection>
        <SellerBtnSection>
          <SmallWhite
            buttonText={'사용하기'}
            onClickFunc={() => {
              // TODO: 스토어로 가기
              router.push(LINKS.STORE + '/' + userCoupon.sellerId);
            }}
          />
        </SellerBtnSection>
      </TopSection>
      <DetailSection className="detail-section">
        <CouponNameSection>{'[' + userCoupon.name + ']'}</CouponNameSection>
        <CouponExpiredAtSection>
          {getDate(userCoupon.expiresAt) + '까지'}
        </CouponExpiredAtSection>
        <BenefitSection>
          <span>{benefitAmount + ' 할인쿠폰'}</span>
        </BenefitSection>
      </DetailSection>
    </UserCouponSection>
  );
}

const UserCouponSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${ThemeGray4};
  border-radius: 10px;

  @media (min-width: 767px) {
    margin: 1%;
    width: 48%;
  }
  @media (max-width: 767px) {
    margin: 1%;
    width: 99%;
  }
`;

const TopSection = styled.div`
  padding: 5px;
  background-color: ${ThemeGray4};
  display: flex;
`;

const SellerSection = styled.div`
  padding: 0 5px;
`;

const SellerBtnSection = styled.div`
  margin-left: auto;
`;

const DetailSection = styled.div`
  padding: 10px;
`;

const CouponNameSection = styled.div`
  color: black;
  font-weight: 800;
  @media (min-width: 767px) {
    font-size: medium;
  }
  @media (max-width: 767px) {
    font-size: small;
  }
`;

const CouponExpiredAtSection = styled.div`
  @media (min-width: 767px) {
    font-size: small;
  }
  @media (max-width: 767px) {
    font-size: smaller;
  }
`;

const BenefitSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-weight: 700;
  color: ${MainBlue};
  @media (min-width: 767px) {
    font-size: large;
  }
  @media (max-width: 767px) {
    font-size: medium;
  }
`;
