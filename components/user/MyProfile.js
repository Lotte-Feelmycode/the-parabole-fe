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
      <Div>
        <Heading title="사용자 이름" type="h1"></Heading>
        <p>{userInfo.username}</p>
        <Heading title="닉네임" type="h1"></Heading>
        <p>{userInfo.nickname}</p>
        <Heading title="이메일" type="h1"></Heading>
        <p>{userInfo.email}</p>
        <Heading title="계정 역할" type="h1"></Heading>
        <p>{userInfo.role}</p>
        <Heading title="연락처" type="h1"></Heading>
        <p>{userInfo.phone}</p>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 35%;
`;
