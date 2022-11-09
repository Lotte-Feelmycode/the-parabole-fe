import SiteHead from '@components/common/SiteHead.js';
import { GET, POST, POST_DATA } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import CouponListRadio from '@components/coupon/CouponListRadio';
import styled from '@emotion/styled';
import UserSearchBar from '@components/coupon/UserSearchBar';
import { useRouter } from 'next/router';
import SellerLayout from '@components/seller/SellerLayout';
import * as btn from '@components/input/Button';
import Heading from '@components/input/Heading';
import { useGetToken } from '@hooks/useGetToken';

export default function CouponAssign() {
  const router = useRouter();

  useEffect(() => {
    let sellerId, role;
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      sellerId = localStorage.getItem('sellerId');
      role = localStorage.getItem('role');
    }
    if (
      sellerId === 'undefined' ||
      sellerId === undefined ||
      sellerId === 'null' ||
      role === 'ROLE_USER'
    ) {
      alert('판매자 페이지입니다.');
      router.push('/');
    }
    useGetToken();
  }, []);

  const [sellerId, setSellerId] = useState();

  const [couponParentId, setCouponParentId] = useState(0);

  var userParentList = [];
  function setUserParentList(list) {
    userParentList = list;
  }

  function assignCoupon(e) {
    const reqBody = {
      couponId: couponParentId,
      userIdList: userParentList,
    };

    POST(`/coupon/assign`, reqBody)
      .then((res) => {
        if (res.success) {
          alert('선택한 사용자에게 쿠폰이 정상적으로 지급되었습니다.');
        }
        router.reload();
      })
      .catch(function (error) {
        return {};
      });
  }

  const sellerProps = {
    sellerId: sellerId,
  };

  return (
    <>
      <SellerLayout>
        <SiteHead title="Seller's Coupon List" />
        <Heading title="쿠폰 배정" type="h1" />
        <PageContainer>
          <Split>
            <CouponListRadio
              {...sellerProps}
              setCouponParentId={setCouponParentId}
            ></CouponListRadio>
          </Split>
          <Split>
            <UserSearchBar
              setUserParentList={setUserParentList}
            ></UserSearchBar>
            <btn.SmallPink buttonText="쿠폰 배정" onClickFunc={assignCoupon} />
          </Split>
        </PageContainer>
      </SellerLayout>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Split = styled.div`
  flex: 1;
  padding: 1rem;
`;
