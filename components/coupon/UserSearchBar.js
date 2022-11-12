import { GET_DATA } from '@apis/defaultApi';
import { useState } from 'react';
import useInput from '@hooks/useInput';
import Input from '@components/input/Input';
import React from 'react';
import { SmallPink } from '@components/input/Button';
import styled from '@emotion/styled';
import { ThemeGray5 } from '@utils/constants/themeColor';

export default function UserSearchBar({ changeUserParentList }) {
  const [userList, setUserList] = useState([]);
  const [userName, onChangeUserName] = useInput('');

  function onSearchUserHandler(e) {
    e.preventDefault();

    if (!userName) {
      alert('검색할 사용자명을 입력하세요.');
      return;
    }

    GET_DATA(`/user/list`, { userName }).then((res) => {
      if (!res) {
        alert('조회되는 사용자가 존재하지 않습니다.');
      }
      setUserList(res);
    });
  }

  function handleChkChange(user) {
    changeUserParentList({
      userId: user.userId,
      email: user.email,
      phone: user.phone,
      username: user.username,
      flag: true,
    });
  }

  function ShowUser() {
    if (userList.length > 0) {
      return (
        userList &&
        userList.map((user) => (
          <tr
            key={user.userId}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6"
          >
            <td className="py-4 px-6">{user.username}</td>
            <td className="py-4 px-6">{user.email}</td>
            <td className="py-4 px-6">{user.phone}</td>
            <td className="py-4 px-6">
              <SmallPink
                buttonText={'추가'}
                onClickFunc={() => {
                  handleChkChange(user);
                }}
              />
            </td>
          </tr>
        ))
      );
    } else {
      return (
        <tr>
          <EmptyTd colSpan={4}>
            <span>{'사용자를 검색해주세요'}</span>
          </EmptyTd>
        </tr>
      );
    }
  }

  return (
    <div>
      <UserInputSection>
        <Input
          type="text"
          attr={{ placeholder: '사용자명을 입력하세요' }}
          onChange={onChangeUserName}
          css={{ width: '49%', marginRight: '1.5%' }}
        />
        <SmallPink buttonText="검색" onClickFunc={onSearchUserHandler} />
      </UserInputSection>
      <UserTableSection>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">사용자명</th>
              <th className="py-3 px-6">이메일</th>
              <th className="py-3 px-6">전화번호</th>
              <th className="py-3 px-6">추가</th>
            </tr>
          </thead>
          <tbody>
            <ShowUser />
          </tbody>
        </table>
      </UserTableSection>
    </div>
  );
}

const UserInputSection = styled.div`
  text-align: right;
  margin-left: auto;
  padding: 20px;
`;

const UserTableSection = styled.div`
  max-height: 400px;
  overflow: auto;
`;

const EmptyTd = styled.td`
  text-align: center;
  font-size: larger;
  font-style: bold;
  padding: 30px;
  background-color: ${ThemeGray5};
  color: black;
`;
