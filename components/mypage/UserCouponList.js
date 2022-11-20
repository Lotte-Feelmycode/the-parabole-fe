import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { GET_DATA } from '@apis/defaultApi';
import { LINKS } from '@utils/constants/links';
import { ThemeGray5 } from '@utils/constants/themeColor';
import UserCoupon from '@components/mypage/UserCoupon';

export default function UserCouponList({ headers }) {
  const [userCouponList, setUserCouponList] = useState([]);
  const [totalElementCnt, setTotalElementCnt] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GET_DATA(`/coupon/user/list`, '', headers)
      .then((res) => {
        if (res) {
          if (res.numberOfElements === 0) {
            alert('보유한 쿠폰이 없습니다.');
          } else if (res.content) {
            setUserCouponList(res.content);
            setTotalElementCnt(res.numberOfElements);
          }
        }
      })
      .catch((error) => {
        alert('권한이 없어 접근할 수 없습니다. 로그인 해주세요.');
        router.push(LINKS.MAIN);
      });
  }, [headers]);

  if (userCouponList && userCouponList.length > 0) {
    return (
      <div>
        <UserCouponListSection>
          {userCouponList.map((userCoupon) => (
            <UserCoupon key={userCoupon.serialNo} userCoupon={userCoupon} />
          ))}
        </UserCouponListSection>
        <br />
        <TotalCouponCountSection>
          <strong>
            <p>총 쿠폰 수량 : {totalElementCnt}</p>
          </strong>
        </TotalCouponCountSection>
      </div>
    );
  } else {
    return (
      <EmptyCouponList>
        <EmptyImageContainer>
          <EmptyImage src="/parabole.svg" />
        </EmptyImageContainer>
        <span>{'쿠폰이 없습니다.'}</span>
      </EmptyCouponList>
    );
  }
}

const UserCouponListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EmptyCouponList = styled.div`
  padding: 50px;
  text-align: center;
  background-color: ${ThemeGray5};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const EmptyImageContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;
const EmptyImage = styled.img`
  max-height: 350px;
  border-radius: 10px;
  margin: 10px;
`;

const TotalCouponCountSection = styled.div`
  text-align: right;
  margin-right: 10px;
`;
