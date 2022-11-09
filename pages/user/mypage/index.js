import CommerceLayout from '@components/common/CommerceLayout';
import { useEffect, useState } from 'react';
import UserOrderList from '@components/mypage/UserOrderList';
import EventApplyList from '@components/mypage/EventApplyList';
import MyProfile from '@components/mypage/MyProfile';
import SiteHead from '@components/common/SiteHead.js';
import styled from '@emotion/styled';
import { ThemeBlueWhite, MainBlue } from '@utils/constants/themeColor';
import UserCouponList from '@components/coupon/UserCouponList';
import { useRouter } from 'next/router';
import { useGetToken } from '@hooks/useGetToken';

export default function Mypage() {
  const router = useRouter();

  const [headers, setHeaders] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window !== undefined) {
      if (localStorage.getItem('userId') === null) {
        alert('로그인 해주세요.');
        router.push('/signin');
      }
    }
    setHeaders(useGetToken());
  }, []);

  const [nowState, setNowState] = useState(0);
  const mypageStateList = [
    '나의 주문',
    '나의 이벤트',
    '나의 쿠폰',
    '나의 프로필',
  ];

  function showMypageMainComp(input) {
    if (input === 0) {
      return <UserOrderList headers={headers} />;
    } else if (input === 1) {
      return <EventApplyList headers={headers} />;
    } else if (input === 2) {
      return <UserCouponList headers={headers} />;
    } else if (input === 3) {
      return <MyProfile headers={headers} />;
    }
  }

  return (
    <CommerceLayout>
      <SiteHead title="My page" />
      <NavSection
        color={ThemeBlueWhite}
        className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center border-b"
      >
        <ul className="contents list-none text-center whitespace-nowrap">
          {mypageStateList.map((state, index) => (
            <li className="float-left" key={index}>
              {nowState === index && (
                <SelectedNav
                  key={index}
                  onClick={() => {
                    setNowState(index);
                  }}
                  className="flex title-font text-lg font-semibold items-center p-5 text-gray-900  cursor-pointer"
                >
                  <span className="ml-3 text-l text-blue-500">{state}</span>
                </SelectedNav>
              )}
              {nowState !== index && (
                <a
                  key={index}
                  onClick={() => {
                    setNowState(index);
                  }}
                  className="flex title-font text-lg font-semibold items-center p-5 text-gray-900  cursor-pointer"
                >
                  <span className="ml-3 text-l hover:text-blue-500">
                    {state}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </NavSection>
      <div>{showMypageMainComp(nowState)}</div>
    </CommerceLayout>
  );
}

const NavSection = styled.nav`
  background-color: ${(props) => props.color};
`;

const SelectedNav = styled.a`
  color: ${MainBlue};
  border-bottom: 1px solid ${MainBlue};
`;
