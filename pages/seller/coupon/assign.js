import CommerceLayout from '@components/common/CommerceLayout';
import SiteHead from '@components/common/SiteHead.js';
import styles from '@styles/Home.module.scss';
import UserCouponList from '@components/coupon/UserCouponList';
import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import CouponList from '@components/coupon/CouponList';
import styled from '@emotion/styled';
import UserSearchBar from '@components/coupon/UserSearchBar';

export default function CouponAssign() {
  const uid = 4;

  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(uid);
  const [sellerId, setSellerId] = useState();

  // TODO:
  // setUserId(현재로그인되어있는userId-세션,쿠키 등에서 얻어올 것임);

  useEffect(() => {
    GET(`/user/role`, { userId }).then((res) => {
      if (res.message === 'ROLE_USER') {
        setRole('USER');
      }
      if (res.message === 'ROLE_SELLER') {
        setRole('SELLER');
        setSellerId(res.data);
      }
    });
  }, []);
  const userProps = {
    userId: userId,
  };
  const sellerProps = {
    sellerId: sellerId,
  };
  if (role === 'USER') {
    return (
      <CommerceLayout>
        <SiteHead title="User's Coupon List" />
        <p>사용자는 쿠폰을 생성할 수 없습니다.</p>
      </CommerceLayout>
    );
  }
  if (role === 'SELLER') {
    return (
      <CommerceLayout>
        <SiteHead title="Seller's Coupon List" />
        <MainSection>
          <CouponList {...sellerProps}></CouponList>
          <UserSearchBar></UserSearchBar>
        </MainSection>
      </CommerceLayout>
    );
  }
}

const MainSection = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;
