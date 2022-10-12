import { GET } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { MainColor1 } from '@utils/constants/themeColor';
import SiteHead from '@components/common/SiteHead';
import CommerceLayout from '@components/common/CommerceLayout';
import Heading from '@components/input/Heading';
import * as btn from '@components/input/Button';

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
    <CommerceLayout>
      <SiteHead title="회원가입 완료" />
      <Divider />
      <Heading title="회원가입 완료 페이지" type="h1"></Heading>
      <br />
      <Div>
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
        <BtnSection className="redirection-btn">
          <btn.Blue
            buttonText="홈으로"
            styled
            onClickFunc={() => router.push('/')}
          />
          <text>&nbsp;&nbsp;&nbsp;&nbsp;</text>
          <btn.Blue
            buttonText="로그인하기"
            onClickFunc={() => router.push('/user/signin')}
          />
        </BtnSection>
      </Div>
    </CommerceLayout>
  );
}

const HighlightInfo = styled.span`
  color: ${MainColor1};
  font-weight: bold;
`;

const BtnSection = styled.div`
  display: inline-block;
`;

const Div = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;
