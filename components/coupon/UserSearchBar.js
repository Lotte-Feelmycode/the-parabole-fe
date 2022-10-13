import { GET_DATA } from '@apis/defaultApi';
import { useEffect, useState, forceUpdate, Component } from 'react';
import * as btn from '@components/input/Button';
import useInput from '@hooks/useInput';
import Input from '@components/input/Input';
import Heading from '@components/input/Heading';
import UserSearchResult from './UserSearchResult';
import React from 'react';
import { useRouter } from 'next/router';

function UserSearchBar() {
  const router = useRouter();
  const [name, onChangeName] = useInput('');
  const [userList, setUserList] = useState([]);
  // var par = null;
  // useEffect(() => {par = userList}, [userList]);

  function submitFormHandler(e) {
    e.preventDefault();

    GET_DATA(`/user/listbyname`, { name })
      .then((res) => {
        console.log(res);
        setUserList(res);
        // router.push(router.asPath);
      })
      .catch(function (error) {
        console.log(error);
        return {};
      });
  }

  return (
    <div>
      <Heading title="쿠폰 배정할 유저 검색창" type="h2" />
      <Input
        type="text"
        placeHolder="사용자명을 입력하세요"
        onChange={onChangeName}
      ></Input>
      <btn.SmallBlue buttonText="검색" onClickFunc={submitFormHandler} />

      {/* TODO:(수정필요) 자식 컴포넌트로 userList가 refresh 되지 않아서 원하는 대로 목록을 불러오지 못합니다. */}
      <UserSearchResult userList={userList}></UserSearchResult>
    </div>
  );
}

export default UserSearchBar;
