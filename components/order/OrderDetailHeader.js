import styled from '@emotion/styled';
import { ThemeGray4 } from '@utils/constants/themeColor';
import { SmallLineWhite } from '@components/input/Button';
import { useRouter } from 'next/router';

export default function OrderDetailHeader({ storeName, sellerId }) {
  const router = useRouter();

  function goToStore() {
    if (sellerId) {
      router.push({ pathname: `/store/${sellerId}` });
    }
  }

  return (
    <OrderDetailHeaderSection>
      <StoreNameSection>{storeName}</StoreNameSection>
      <StoreBtnSection>
        <SmallLineWhite buttonText="브랜드홈 ▶" onClickFunc={goToStore} />
      </StoreBtnSection>
    </OrderDetailHeaderSection>
  );
}

const OrderDetailHeaderSection = styled.div`
  display: inline-flex;
  width: 100%;
  border-bottom: 1px solid ${ThemeGray4};
  padding-bottom: 10px;
`;

const StoreNameSection = styled.div`
  text-align: left;
  font-weight: bolder;
  font-size: 19px;
`;

const StoreBtnSection = styled.div`
  margin-left: auto;
`;
