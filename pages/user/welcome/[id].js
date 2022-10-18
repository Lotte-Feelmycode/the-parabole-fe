import { GET, GET_DATA } from '@apis/defaultApi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
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
    GET_DATA(`/user/${userId}`).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, [router.query]);

  return (
    <CommerceLayout>
      <SiteHead title="회원가입 완료" />
      <Div>
        <div className="py-6" />
        <Heading title="회원가입 완료" type="h1" />
        <br />
        <p>THE PARABOLE 회원 가입을 축하합니다 :) </p>
        <p>{userInfo.username} 님의 가입 정보는 아래와 같습니다.</p>
        <br />
        <ul>
          계정 이메일 :
          <HighlightInfo className="email"> {userInfo.email}</HighlightInfo>
          <li className="nickname">닉네임 : {userInfo.nickname}</li>
          <li className="role">역할 : {userInfo.role}</li>
          <li className="phone">번호 : {userInfo.phone}</li>
        </ul>
        <div className="py-5" />
        <P> 🎉🎉🎉 즐거운 쇼핑 하세요 🎉🎉🎉 </P>
        <div className="py-4" />

        <BtnSection>
          <div>
            <btn.LineBlue
              buttonText="홈으로"
              css={{ marginRight: '20px', marginLeft: '30px' }}
              onClickFunc={() => router.push('/')}
            />
          </div>
          <div>
            <btn.Blue
              buttonText="로그인하기"
              css={{ marginRight: '20px' }}
              onClickFunc={() => router.push('/user/signin')}
            />
          </div>
        </BtnSection>
      </Div>
    </CommerceLayout>
  );
}

const HighlightInfo = styled.span`
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 30%;
  justify-content: center;
  align-items: center;
  background-color: #a7cdfc;
  border-radius: 5%;
`;

const BtnSection = styled.div`
  margin-bottom: 40px;
  display: inline-flex;
`;

const P = styled.p`
  font-size: large;
  font-weight: bold;
`;
