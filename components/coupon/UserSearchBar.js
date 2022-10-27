import { GET_DATA } from '@apis/defaultApi';
import { useState } from 'react';
import * as btn from '@components/input/Button';
import useInput from '@hooks/useInput';
import Input from '@components/input/Input';
import Heading from '@components/input/Heading';
import React from 'react';

function UserSearchBar({ setUserParentList }) {
  const [userName, onChangeUserName] = useInput('');
  const [userList, setUserList] = useState([]);

  var checkedUsers = [];

  function onSearchUserHandler(e) {
    e.preventDefault();

    if (!userName) {
      alert('검색할 사용자명을 입력하세요.');
      return;
    }

    GET_DATA(`/user/list`, { userName }).then((res) => {
      console.log(res);
      if (!res) {
        alert('조회되는 사용자가 존재하지 않습니다.');
      }
      setUserList(res);
    });
  }

  function arrayRemove(arr, value) {
    return arr.filter(function (element) {
      return element != value;
    });
  }

  function handleChkChange(e) {
    if (e.target.checked) {
      checkedUsers.push(e.target.value);
    } else if (!e.target.checked) {
      checkedUsers = arrayRemove(checkedUsers, e.target.value);
    }
    setUserParentList(checkedUsers);
  }

  return (
    <div>
      <Heading title="쿠폰 배정할 사용자 검색창" type="h2" />
      <Input
        type="text"
        attr={{ placeholder: '사용자명을 입력하세요' }}
        onChange={onChangeUserName}
        css={{ width: '49%', marginRight: '1.5%' }}
      ></Input>
      <btn.SmallPink buttonText="검색" onClickFunc={onSearchUserHandler} />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th className="py-3 px-6">사용자명</th>
          <th className="py-3 px-6">이메일</th>
          <th className="py-3 px-6">전화번호</th>
        </thead>
        <tbody>
          {userList &&
            userList.map((user) => (
              // <UserSearchResult key={user.userId} user={user} />
              <tr
                key={user.userId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">
                  <input
                    id="user-checkbox"
                    type="checkbox"
                    value={user.userId}
                    name="list-checkbox"
                    onClick={handleChkChange}
                    className="mr-3"
                  />
                  {user.username}
                </td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserSearchBar;
