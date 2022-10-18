import { GET_DATA } from '@apis/defaultApi';
import Heading from '@components/input/Heading';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function MyProfile({ userId }) {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    GET_DATA(`/user/${userId}`).then((res) => {
      if (res) {
        setUserInfo(res);
      }
    });
  }, [userId]);

  return (
    <>
      <Heading title="My Profile" type="h1" styled={{ float: 'right' }} />
      <BgDiv>
        <div className="py-7" />
        <Heading title="사용자 이름" type="h2" />
        <P>{userInfo.username}</P>
        <Heading title="닉네임" type="h2" />
        <p>{userInfo.nickname}</p>
        <Heading title="이메일" type="h2" />
        <p>{userInfo.email}</p>
        <Heading title="계정 역할" type="h2" />
        <p>{userInfo.role}</p>
        <Heading title="연락처" type="h2" />
        <p>{userInfo.phone}</p>
        <div className="py-5" />
      </BgDiv>
    </>
  );
}

const BgDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4% 30%;
  align-items: center;
  background-color: #a7cdfc;
  border-radius: 7%;

  p {
    margin-bottom: 10px;
    padding: 8px;
  }
`;

const P = styled.p`
  margin-bottom: 20px;
  font-size: large;
`;
