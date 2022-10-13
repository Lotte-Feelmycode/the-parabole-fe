import SiteHead from '@components/common/SiteHead.js';
import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import CouponList from '@components/coupon/CouponList';
import styled from '@emotion/styled';
import UserSearchBar from '@components/coupon/UserSearchBar';
import { useRouter } from 'next/router';
import SellerLayout from '@components/seller/SellerLayout';

export default function CouponAssign() {
  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);
  const uidFromStorage = 2;

  const router = useRouter();
  const [userId, setUserId] = useState(uidFromStorage);
  const [sellerId, setSellerId] = useState();

  useEffect(() => {
    GET(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        alert('잘못된 접근입니다.');
        router.push('/');
      } else if (res.message === 'ROLE_SELLER') {
        setSellerId(res.data);
      } else {
        alert('로그인 후에 사용 가능합니다.');
        router.push('/user/signin');
      }
    });
  }, []);

  const sellerProps = {
    sellerId: sellerId,
  };

  return (
    <SellerLayout>
      <SiteHead title="Seller's Coupon List" />
      <PageContainer>
        <CouponSection>
          <CouponList {...sellerProps}></CouponList>
        </CouponSection>
        <SearchbarSection>
          <UserSearchBar></UserSearchBar>
        </SearchbarSection>
      </PageContainer>
    </SellerLayout>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CouponSection = styled.div`
  flex: 1;
  padding: 1rem;
`;

const SearchbarSection = styled.div`
  flex: 1;
  padding: 1rem;
`;
