import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { POST } from '@apis/defaultApi';
import { useGetToken } from '@hooks/useGetToken';
import { LINKS } from '@utils/constants/links';
import { Pink, SmallPink } from '@components/input/Button';
import Heading from '@components/input/Heading';
import SiteHead from '@components/common/SiteHead.js';
import SellerLayout from '@components/seller/SellerLayout';
import CouponListRadio from '@components/coupon/CouponListRadio';
import UserSearchBar from '@components/coupon/UserSearchBar';
import CouponAssignResult from '@components/coupon/CouponAssignResult';
import { ThemeGray4 } from '@utils/constants/themeColor';

export default function CouponAssign() {
  const router = useRouter();
  const [headers, setHeaders] = useState('');
  const [couponParentId, setCouponParentId] = useState(0);
  const [userParentList, setUserParentList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push(LINKS.SIGNIN);
      } else if (localStorage.getItem('role') === 'ROLE_USER') {
        alert('판매자 페이지입니다.');
        router.push(LINKS.MAIN);
      }
    }
    setHeaders(useGetToken());
  }, []);

  function changeUserParentList({ userId, email, phone, username, flag }) {
    let list = [];
    if (flag) {
      list = [...userParentList, { userId, email, phone, username }];
    } else {
      userParentList.forEach((user) => {
        if (user.userId !== userId) {
          list = [
            ...list,
            {
              userId: user.userId,
              email: user.email,
              phone: user.phone,
              username: user.username,
            },
          ];
        }
      });
    }
    setUserParentList(list);
  }

  function changeCouponParentId(coupon) {
    setCouponParentId(coupon);
  }

  function assignCoupon() {
    if (couponParentId === 0) {
      alert('쿠폰을 선택해주세요');
      return;
    }

    if (userParentList.length === 0) {
      alert('사용자를 선택해주세요');
      return;
    }

    let userIdList = [];

    userParentList.forEach((user) => {
      userIdList = [...userIdList, user.userId];
    });

    const reqBody = {
      couponId: couponParentId.couponId,
      userIdList,
    };

    POST(`/coupon/assign`, reqBody)
      .then((res) => {
        if (res.success) {
          alert('선택한 사용자에게 쿠폰이 정상적으로 지급되었습니다.');
          router.reload();
        } else if (res.message) {
          alert('쿠폰을 배정에 실패했습니다. - ' + res.message);
        } else {
          alert('쿠폰 배정에 실패했습니다. - ', res);
        }
      })
      .catch((e) => {
        console.log(e);
        alert('쿠폰 배정에 실패했습니다. 다시 시도해주세요');
      });
  }

  return (
    <>
      <SellerLayout>
        <SiteHead title="Seller's Coupon List" />
        <Heading title="쿠폰 배정" type="h1" />
        <PageContainer>
          <CouponListSection>
            <Heading title="쿠폰 선택" type="h2" />
            <ButtonSection>
              <SmallPink
                onClickFunc={() => router.push('./new')}
                buttonText="새 쿠폰 등록"
                css={{
                  marginLeft: 'auto',
                  marginBottom: '10px',
                }}
              />
            </ButtonSection>
            <CouponListRadio
              changeCouponParentId={changeCouponParentId}
              headers={headers}
            />
          </CouponListSection>
          <UserListSection>
            <Heading title="사용자 선택" type="h2" />
            <UserSearchBar changeUserParentList={changeUserParentList} />
          </UserListSection>
          <ResultSection>
            <Heading title="쿠폰 배정" type="h2" />
            <CouponAssignResult
              selectedCoupon={couponParentId}
              userParentList={userParentList}
              changeUserParentList={changeUserParentList}
            />
          </ResultSection>

          <ButtonSection>
            <Pink buttonText="쿠폰 배정" onClickFunc={assignCoupon} />
          </ButtonSection>
        </PageContainer>
      </SellerLayout>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10px;
`;

const CouponListSection = styled.div`
  border-radius: 5px;
  border: 1px solid ${ThemeGray4};
  padding: 2rem;
  margin-bottom: 20px;
`;

const UserListSection = styled.div`
  border-radius: 5px;
  border: 1px solid ${ThemeGray4};
  padding: 1rem;
`;

const ResultSection = styled.div`
  padding: 1rem;
`;

const ButtonSection = styled.div`
  text-align: right;
`;
