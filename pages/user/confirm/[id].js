import { GET } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';
import PostButton from '@components/input/Button';

export default function SignupConfirm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const userId = router.query.id;
    GET(`/user/${userId}`, { userId }).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, [router.query]);

  return (
    <div>
      <div className="signup-info">
        <p>THE PARABOLE 회원 가입을 축하합니다 :) </p>
        <p>{userInfo.username} 님의 가입 정보는 아래와 같습니다.</p>
        <br></br>

        <ul>
          계정 이메일:{' '}
          <HighlightInfo className="email">{userInfo.email}</HighlightInfo>
          <li className="nickname">닉네임: {userInfo.nickname}</li>
          <li className="role">역할은 {userInfo.role}</li>
        </ul>
      </div>
      <p> ~~~ 즐거운 쇼핑 하세요 ~~~ </p>
      <br></br>
      <br></br>
      <div>
        <PostButton
          className="HomeBtn"
          buttonText="홈으로"
          styled
          onClickFunc={() => router.push('/')}
        ></PostButton>
      </div>
    </div>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;
