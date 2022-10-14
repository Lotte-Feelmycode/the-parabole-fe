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
    console.log(router.query.id);
    GET(`/user/${userId}`).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title="회원가입 완료" />
      <Divider />
      <Div>
        <TextDiv>
          <TitleSection>
            <Heading title="회원가입 완료 페이지" type="h1"></Heading>
          </TitleSection>
          <br />
          <div className="signup-info">
            <p>THE PARABOLE 회원 가입을 축하합니다 :) </p>
            <p>{userInfo.username} 님의 가입 정보는 아래와 같습니다.</p>
            <br></br>

            <ul>
              계정 이메일 :
              <HighlightInfo className="email">{userInfo.email}</HighlightInfo>
              <li className="nickname">닉네임 : {userInfo.nickname}</li>
              <li className="role">역할 : {userInfo.role}</li>
              <li className="phone">번호 : {userInfo.phone}</li>
            </ul>
          </div>
          <div className="py-5" />
          <P> ~~~ 즐거운 쇼핑 하세요 ~~~ </P>
          <div className="py-4" />

          <BtnSection className="redirection-btn">
            <btn.LineBlue
              buttonText="홈으로"
              css={{ marginRight: '10px', width: '40%' }}
              onClickFunc={() => router.push('/')}
            />
            <btn.Blue
              buttonText="로그인하기"
              css={{ marginRight: '10px', width: '40%' }}
              onClickFunc={() => router.push('/user/signin')}
            />
          </BtnSection>
        </TextDiv>
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
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  margin: 10% 30%;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #a7cdfc;
  border-radius: 5%;
`;

const TextDiv = styled.div`
  display: flex;
  margin-left: 70px;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 5%;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const P = styled.p`
  margin-bottom: 20px;
  margin-left: 60px;
`;
